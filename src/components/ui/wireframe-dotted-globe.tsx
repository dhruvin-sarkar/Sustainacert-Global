"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import RegionCardsModal from '@/components/RegionCardsModal';
import { getRegionForCountry } from '@/data/regions';
import type { RegionData } from '@/types';

interface DotData {
  lng: number;
  lat: number;
  visible: boolean;
  countryCode?: string;
  regionId?: string;
  region?: RegionData | null;
  color: string;
}

type HitPoint = {
  x: number;
  y: number;
  region: RegionData;
};

type CountryProperties = {
  ISO_A3?: string;
  ADM0_A3?: string;
  [key: string]: unknown;
};

type GeoFeature = {
  type: 'Feature';
  geometry: unknown;
  properties?: CountryProperties;
};

type GeoFeatureCollection = {
  type: 'FeatureCollection';
  features: GeoFeature[];
};

type HighlightedFeature = {
  feature: GeoFeature;
  region: RegionData;
};

export default function WireframeDottedGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  const hoveredRegionRef = useRef<RegionData | null>(null);
  const selectedRegionRef = useRef<RegionData | null>(null);

  const landFeaturesRef = useRef<GeoFeatureCollection | null>(null);
  const highlightedFeaturesRef = useRef<HighlightedFeature[]>([]);
  const allDotsRef = useRef<DotData[]>([]);
  const dotGroupsRef = useRef<Map<string, DotData[]>>(new Map());
  const hitGridRef = useRef<Map<string, HitPoint[]>>(new Map());
  const hitCellSizeRef = useRef(28);

  const autoRotateRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const startAnimationRef = useRef<(() => void) | null>(null);
  const stopAnimationRef = useRef<(() => void) | null>(null);

  const dprRef = useRef(1);
  const sizeRef = useRef({ width: 0, height: 0 });

  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const rotationRef = useRef<[number, number, number]>([-20, -20, 0]);
  const zoomRef = useRef(1);
  const baseScaleRef = useRef(1);

  const hoverRafRef = useRef<number | null>(null);
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);

  const resumeRotateTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    selectedRegionRef.current = selectedRegion;
    autoRotateRef.current = !selectedRegion;
    if (selectedRegion) {
      stopAnimationRef.current?.();
      return;
    }

    if (isVisibleRef.current) {
      startAnimationRef.current?.();
    }
  }, [selectedRegion]);

  const pointInFeature = useMemo(() => {
    return (point: [number, number], feature: GeoFeature) =>
      d3.geoContains(feature as unknown as d3.GeoPermissibleObjects, point);
  }, []);

  const generateDotsInPolygon = useMemo(() => {
    return (feature: GeoFeature, dotSpacing = 16) => {
      const dots: DotData[] = [];
      const bounds = d3.geoBounds(feature as unknown as d3.GeoPermissibleObjects);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      const countryCode: string | undefined = feature.properties?.ISO_A3 || feature.properties?.ADM0_A3;
      const region = countryCode ? getRegionForCountry(countryCode) : null;
      const dotColor = region ? region.color : '#999999';

      const edgeTolerance = 0.12;
      const stepSize = dotSpacing * 0.08 * (region ? 0.75 : 1);

      const jitters: Array<[number, number]> = [
        [edgeTolerance, 0],
        [-edgeTolerance, 0],
        [0, edgeTolerance],
        [0, -edgeTolerance],
        [edgeTolerance, edgeTolerance],
        [edgeTolerance, -edgeTolerance],
        [-edgeTolerance, edgeTolerance],
        [-edgeTolerance, -edgeTolerance],
      ];

      const isNearEdgeInside = (lng: number, lat: number) => {
        for (let i = 0; i < jitters.length; i++) {
          const j = jitters[i];
          const p: [number, number] = [lng + j[0], lat + j[1]];
          if (pointInFeature(p, feature)) return true;
        }
        return false;
      };

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          const inside = pointInFeature(point, feature);
          const include = inside || (region ? isNearEdgeInside(lng, lat) : false);
          if (include) {
            dots.push({
              lng,
              lat,
              visible: true,
              countryCode,
              regionId: region?.id,
              region,
              color: dotColor,
            });
          }
        }
      }

      return dots;
    };
  }, [pointInFeature]);

  const setCanvasSize = useMemo(() => {
    return (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      sizeRef.current = { width, height };

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = 'auto';

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      contextRef.current = ctx;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const baseScale = Math.min(width, height) * 0.38;
      baseScaleRef.current = baseScale;

      const projection = d3
        .geoOrthographic()
        .translate([width / 2, height / 2])
        .scale(baseScale * zoomRef.current)
        .clipAngle(90)
        .precision(0.2);

      projection.rotate(rotationRef.current);

      projectionRef.current = projection;
    };
  }, []);

  const getRegionFromHitGrid = useMemo(() => {
    return (x: number, y: number) => {
      const projection = projectionRef.current;
      const baseScale = baseScaleRef.current;
      const scaleFactor = projection && baseScale > 0 ? projection.scale() / baseScale : 1;
      const hitRadius = Math.max(10, Math.min(26, 14 * scaleFactor));
      const hitRadius2 = hitRadius * hitRadius;

      const cellSize = hitCellSizeRef.current;
      const cx = Math.floor(x / cellSize);
      const cy = Math.floor(y / cellSize);

      const grid = hitGridRef.current;
      let best: { region: RegionData; d2: number } | null = null;

      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          const key = `${cx + ox}:${cy + oy}`;
          const list = grid.get(key);
          if (!list) continue;
          for (let i = 0; i < list.length; i++) {
            const p = list[i];
            const dx = p.x - x;
            const dy = p.y - y;
            const d2 = dx * dx + dy * dy;
            if (d2 > hitRadius2) continue;
            if (!best || d2 < best.d2) best = { region: p.region, d2 };
          }
        }
      }

      return best?.region || null;
    };
  }, []);

  const render = useMemo(() => {
    return () => {
      const canvas = canvasRef.current;
      const ctx = contextRef.current;
      const projection = projectionRef.current;
      const { width, height } = sizeRef.current;
      if (!canvas || !ctx || !projection || width <= 0 || height <= 0) return;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const path = d3.geoPath(projection, ctx);
      const sphere: d3.GeoSphere = { type: 'Sphere' };

      ctx.beginPath();
      path(sphere);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const graticule = d3.geoGraticule10();
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      const currentScale = projection.scale();
      const scaleFactor = baseScaleRef.current > 0 ? currentScale / baseScaleRef.current : 1;

      const radius = 1.5 * scaleFactor;
      const cellSize = hitCellSizeRef.current;
      const hitGrid = hitGridRef.current;
      hitGrid.clear();

      const addHitPoint = (x: number, y: number, region: RegionData) => {
        const cx = Math.floor(x / cellSize);
        const cy = Math.floor(y / cellSize);
        const key = `${cx}:${cy}`;
        const existing = hitGrid.get(key);
        if (existing) {
          if (existing.length < 24) existing.push({ x, y, region });
          return;
        }
        hitGrid.set(key, [{ x, y, region }]);
      };

      const groups = dotGroupsRef.current;
      const entries = Array.from(groups.entries());

      for (let gi = 0; gi < entries.length; gi++) {
        const [color, dots] = entries[gi];
        ctx.beginPath();

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const projected = projection([dot.lng, dot.lat]);
          if (!projected) continue;

          const x = projected[0];
          const y = projected[1];

          if (x < 0 || x > width || y < 0 || y > height) continue;
          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
        }

        ctx.shadowBlur = 0;
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          if (!dot.region) continue;
          const projected = projection([dot.lng, dot.lat]);
          if (!projected) continue;

          const x = projected[0];
          const y = projected[1];
          if (x < 0 || x > width || y < 0 || y > height) continue;

          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          addHitPoint(x, y, dot.region);
        }

        ctx.shadowColor = color;
        ctx.shadowBlur = 3 * scaleFactor;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      path(sphere);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1.25;
      ctx.stroke();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.width;
      setCanvasSize(canvas, width, height);
      render();
    });

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [render, setCanvasSize]);

  useEffect(() => {
    const controller = new AbortController();

    const loadCountries = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/cultural/ne_110m_admin_0_countries.json',
        { signal: controller.signal },
      );

      const json = (await response.json()) as unknown as GeoFeatureCollection;
      landFeaturesRef.current = json;

      const highlighted: HighlightedFeature[] = [];
      for (const f of json.features) {
        const countryCode: string | undefined = f.properties?.ISO_A3 || f.properties?.ADM0_A3;
        const region = countryCode ? getRegionForCountry(countryCode) : null;
        if (region) {
          highlighted.push({ feature: f, region });
        }
      }
      highlightedFeaturesRef.current = highlighted;

      const dots: DotData[] = [];
      for (const f of json.features) {
        dots.push(...generateDotsInPolygon(f, 16));
      }
      allDotsRef.current = dots;

      const groups = new Map<string, DotData[]>();
      for (const d of dots) {
        const list = groups.get(d.color);
        if (list) {
          list.push(d);
        } else {
          groups.set(d.color, [d]);
        }
      }
      dotGroupsRef.current = groups;

      render();
    };

    loadCountries().catch(() => {});

    return () => {
      controller.abort();
    };
  }, [generateDotsInPolygon, render]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      isDraggingRef.current = true;
      autoRotateRef.current = false;

      if (resumeRotateTimeoutRef.current) {
        window.clearTimeout(resumeRotateTimeoutRef.current);
        resumeRotateTimeoutRef.current = null;
      }

      (canvas as unknown as { _lastPointer?: { x: number; y: number } })._lastPointer = { x: event.clientX, y: event.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerPosRef.current = { x: event.clientX, y: event.clientY };

      if (!isDraggingRef.current) return;

      const last = (canvas as unknown as { _lastPointer?: { x: number; y: number } })._lastPointer;
      if (!last) return;

      const dx = event.clientX - last.x;
      const dy = event.clientY - last.y;

      const projection = projectionRef.current;
      const { width } = sizeRef.current;
      if (!projection || width <= 0) return;

      const rotate = projection.rotate() as [number, number, number];
      const sensitivity = 180 / width;

      const next: [number, number, number] = [rotate[0] + dx * sensitivity, rotate[1] - dy * sensitivity, 0];

      rotationRef.current = next;
      projection.rotate(next);

      (canvas as unknown as { _lastPointer?: { x: number; y: number } })._lastPointer = { x: event.clientX, y: event.clientY };
      render();
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      canvas.style.cursor = hoveredRegionRef.current ? 'pointer' : 'grab';

      if (!selectedRegionRef.current) {
        resumeRotateTimeoutRef.current = window.setTimeout(() => {
          autoRotateRef.current = true;
          startAnimationRef.current?.();
        }, 900);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      autoRotateRef.current = false;
      if (resumeRotateTimeoutRef.current) {
        window.clearTimeout(resumeRotateTimeoutRef.current);
        resumeRotateTimeoutRef.current = null;
      }

      const projection = projectionRef.current;
      if (!projection) return;

      const factor = Math.exp(-event.deltaY * 0.001);
      zoomRef.current = Math.max(0.6, Math.min(2.2, zoomRef.current * factor));

      const nextScale = baseScaleRef.current * zoomRef.current;
      projection.scale(nextScale);

      render();

      if (!selectedRegionRef.current) {
        resumeRotateTimeoutRef.current = window.setTimeout(() => {
          autoRotateRef.current = true;
        }, 900);
      }
    };

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const clickedRegion = getRegionFromHitGrid(clickX, clickY);

      if (clickedRegion) {
        autoRotateRef.current = false;
        setSelectedRegion(clickedRegion);
      }
    };

    const handleCanvasMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerPosRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };

      if (hoverRafRef.current) return;

      hoverRafRef.current = window.requestAnimationFrame(() => {
        hoverRafRef.current = null;

        const pos = pointerPosRef.current;
        const nextHovered = pos ? getRegionFromHitGrid(pos.x, pos.y) : null;

        if (!isDraggingRef.current) {
          canvas.style.cursor = nextHovered ? 'pointer' : 'grab';
        }

        const prev = hoveredRegionRef.current;
        if ((prev?.id || null) !== (nextHovered?.id || null)) {
          hoveredRegionRef.current = nextHovered;

          const tooltip = tooltipRef.current;
          if (tooltip) {
            if (nextHovered) {
              tooltip.textContent = `Click to explore ${nextHovered.name}`;
              tooltip.style.opacity = '1';
              tooltip.style.pointerEvents = 'none';
            } else {
              tooltip.style.opacity = '0';
              tooltip.style.pointerEvents = 'none';
            }
          }
        }
      });
    };

    canvas.style.cursor = 'grab';

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      canvas.removeEventListener('wheel', handleWheel as unknown as EventListener);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);

      if (hoverRafRef.current) {
        window.cancelAnimationFrame(hoverRafRef.current);
        hoverRafRef.current = null;
      }

      if (resumeRotateTimeoutRef.current) {
        window.clearTimeout(resumeRotateTimeoutRef.current);
        resumeRotateTimeoutRef.current = null;
      }
    };
  }, [getRegionFromHitGrid, render]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const stop = () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const start = () => {
      if (animationFrameRef.current) return;
      if (!isVisibleRef.current) return;
      if (selectedRegionRef.current) return;
      if (!autoRotateRef.current) return;

      const tick = () => {
        if (!isVisibleRef.current || isDraggingRef.current || selectedRegionRef.current || !autoRotateRef.current) {
          animationFrameRef.current = null;
          return;
        }

        const projection = projectionRef.current;
        if (!projection) {
          animationFrameRef.current = window.requestAnimationFrame(tick);
          return;
        }

        const rotate = projection.rotate() as [number, number, number];
        const next: [number, number, number] = [rotate[0] + 0.15, rotate[1], 0];

        rotationRef.current = next;
        projection.rotate(next);

        render();
        animationFrameRef.current = window.requestAnimationFrame(tick);
      };

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    startAnimationRef.current = start;
    stopAnimationRef.current = stop;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = !!entry?.isIntersecting;
        isVisibleRef.current = visible;

        if (!visible) {
          stop();
          return;
        }

        render();
        start();
      },
      { threshold: 0.15 },
    );

    io.observe(el);

    render();
    start();

    return () => {
      io.disconnect();
      stop();
    };
  }, [render]);

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl select-none touch-none"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      {!selectedRegion && (
        <div
          ref={tooltipRef}
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-semibold text-white backdrop-blur-md"
          style={{
            opacity: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.12))',
            border: '1px solid rgba(16,185,129,0.45)',
            boxShadow: '0 4px 18px rgba(16,185,129,0.22)',
            willChange: 'transform,opacity',
          }}
        />
      )}

      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground px-2 py-1 rounded-md dark bg-neutral-900">
        Drag to rotate • Scroll to zoom • Click regions for details
      </div>

      {selectedRegion && (
        <RegionCardsModal
          region={selectedRegion}
          onClose={() => {
            setSelectedRegion(null);
            autoRotateRef.current = true;
          }}
        />
      )}
    </div>
  );
}
