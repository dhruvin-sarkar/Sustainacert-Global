"use client";

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DottedMap from 'dotted-map';
import { useTheme } from '@/contexts/ThemeContext';

interface MapLocation {
  lat: number;
  lng: number;
  label?: string;
  labelOffset?: {
    x?: number;
    y?: number;
  };
}

interface MapRoute {
  start: MapLocation;
  end: MapLocation;
}

interface WorldMapProps {
  dots?: MapRoute[];
  lineColor?: string;
  showLabels?: boolean;
  animationDuration?: number;
  loop?: boolean;
}

// Ray-casting point-in-polygon test
function pointInPolygon(px: number, py: number, polygon: { x: number; y: number }[]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// ────────────────────────────────────────────────────────
// Country outline polygons — lat/lng vertices, simplified
// ────────────────────────────────────────────────────────
const COUNTRY_POLYGONS: { lat: number; lng: number }[][] = [
  // ═══ UK & Ireland ═══
  [
    { lat: 50, lng: -6 },
    { lat: 50, lng: 2 },
    { lat: 52, lng: 2 },
    { lat: 54, lng: 0 },
    { lat: 56, lng: -1 },
    { lat: 59, lng: -2 },
    { lat: 59, lng: -8 },
    { lat: 56, lng: -7 },
    { lat: 54, lng: -6 },
    { lat: 52, lng: -10 },
    { lat: 50, lng: -10 },
  ],

  // ═══ Middle East / Arabian Peninsula ═══
  [
    { lat: 12.5, lng: 43 },
    { lat: 15, lng: 42 },
    { lat: 18, lng: 40 },
    { lat: 21, lng: 38 },
    { lat: 25, lng: 36 },
    { lat: 28, lng: 34 },
    { lat: 30, lng: 34 },
    { lat: 33, lng: 35 },
    { lat: 37, lng: 36 },
    { lat: 37, lng: 44 },
    { lat: 36, lng: 46 },
    { lat: 34, lng: 48 },
    { lat: 32, lng: 48 },
    { lat: 30, lng: 50 },
    { lat: 27, lng: 50 },
    { lat: 26, lng: 51 },
    { lat: 24, lng: 55 },
    { lat: 23, lng: 59 },
    { lat: 21, lng: 59 },
    { lat: 17, lng: 55 },
    { lat: 14, lng: 50 },
    { lat: 12.5, lng: 45 },
  ],

  // ═══ India ═══
  [
    { lat: 8, lng: 77 },
    { lat: 10, lng: 76 },
    { lat: 12, lng: 75 },
    { lat: 14, lng: 74 },
    { lat: 17, lng: 73 },
    { lat: 20, lng: 72 },
    { lat: 22, lng: 69 },
    { lat: 24, lng: 68 },
    { lat: 27, lng: 70 },
    { lat: 30, lng: 74 },
    { lat: 33, lng: 74 },
    { lat: 35, lng: 77 },
    { lat: 33, lng: 79 },
    { lat: 30, lng: 81 },
    { lat: 28, lng: 84 },
    { lat: 27, lng: 88 },
    { lat: 24, lng: 89 },
    { lat: 22, lng: 89 },
    { lat: 21, lng: 87 },
    { lat: 19, lng: 85 },
    { lat: 16, lng: 82 },
    { lat: 13, lng: 80 },
    { lat: 10, lng: 80 },
  ],

  // ═══ Australia — generous rectangle; island continent so no bleed ═══
  [
    { lat: -8, lng: 110 },
    { lat: -8, lng: 156 },
    { lat: -46, lng: 156 },
    { lat: -46, lng: 110 },
  ],
];

export function WorldMap({
  dots = [],
  lineColor = '#10b981',
  showLabels = true,
  animationDuration = 2.2,
  loop = true,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const { isDark } = useTheme();

  const {
    svgMap,
    mapWidth,
    mapHeight,
    projectedCities,
    highlightDots,
  } = useMemo(() => {
    const map = new DottedMap({ height: 140, grid: 'diagonal' });

    // Collect unique locations
    const locationMap = new Map<string, MapLocation>();
    dots.forEach((route) => {
      [route.start, route.end].forEach((loc) => {
        const key = `${loc.label ?? ''}:${loc.lat}:${loc.lng}`;
        if (!locationMap.has(key)) locationMap.set(key, loc);
      });
    });

    // Project city markers via addPin
    const cities = Array.from(locationMap.values()).map((loc) => {
      const pin = map.addPin({ lat: loc.lat, lng: loc.lng, svgOptions: { color: 'transparent', radius: 0 } });
      return { ...loc, px: pin.x, py: pin.y };
    });

    // ── Country highlighting via polygon test ──
    // 1. Project polygon vertices to map x/y space using addPin (accurate for all latitudes)
    const projectedPolygons = COUNTRY_POLYGONS.map((poly) =>
      poly.map((v) => {
        const pin = map.addPin({ lat: v.lat, lng: v.lng, svgOptions: { color: 'transparent', radius: 0 } });
        return { x: pin.x, y: pin.y };
      }),
    );

    // 2. Get land-only dots
    const allLandPoints = map.getPoints();

    // 3. Test each land dot against all polygons
    const highlightCoords: { x: number; y: number }[] = [];
    const highlightSet = new Set<string>();

    allLandPoints.forEach((pt) => {
      for (const poly of projectedPolygons) {
        if (pointInPolygon(pt.x, pt.y, poly)) {
          const key = `${pt.x}:${pt.y}`;
          if (!highlightSet.has(key)) {
            highlightSet.add(key);
            highlightCoords.push({ x: pt.x, y: pt.y });
          }
          break;
        }
      }
    });

    // Get base SVG
    const svg = map.getSVG({
      radius: 0.28,
      color: isDark ? '#FFFFFF40' : '#00000040',
      shape: 'circle',
      backgroundColor: 'transparent',
    });

    return {
      svgMap: svg,
      mapWidth: 277,
      mapHeight: 140,
      projectedCities: cities,
      highlightDots: highlightCoords,
    };
  }, [isDark, dots]);

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 25;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const findProjected = (loc: MapLocation) => {
    const city = projectedCities.find(
      (c) => c.lat === loc.lat && c.lng === loc.lng,
    );
    return city ? { x: city.px, y: city.py } : { x: 0, y: 0 };
  };

  const staggerDelay = 0.32;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 1.6;
  const fullCycleDuration = totalAnimationTime + pauseTime;

  const mobileTooltipClasses = isDark
    ? 'bg-black/90 text-white border-white/10'
    : 'bg-white/92 text-slate-900 border-emerald-200/80';

  return (
    <div className="relative w-full aspect-[1.55/1] overflow-hidden rounded-lg bg-white font-sans dark:bg-black md:aspect-[1.9/1] lg:aspect-[2/1]">
      <div className="relative h-full w-full">
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="pointer-events-none h-full w-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
          alt="world map"
          draggable={false}
          style={{ objectFit: 'fill' }}
        />

        <svg
          ref={svgRef}
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="absolute inset-0 h-full w-full select-none pointer-events-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="world-map-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <filter id="world-map-glow">
              <feMorphology operator="dilate" radius="0.3" />
              <feGaussianBlur stdDeviation="0.6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Country highlight dots — follows actual country shapes */}
          {highlightDots.map((dot, i) => (
            <circle
              key={`hl-${i}`}
              cx={dot.x}
              cy={dot.y}
              r="0.42"
              fill={lineColor}
              opacity="0.4"
            />
          ))}

          {/* Animated route paths */}
          {dots.map((dot, index) => {
            const startPoint = findProjected(dot.start);
            const endPoint = findProjected(dot.end);
            const path = createCurvedPath(startPoint, endPoint);
            const startTime = (index * staggerDelay) / fullCycleDuration;
            const endTime = (index * staggerDelay + animationDuration) / fullCycleDuration;
            const resetTime = totalAnimationTime / fullCycleDuration;

            return (
              <g key={`route-${dot.start.label}-${dot.end.label}-${index}`}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#world-map-path-gradient)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={
                    loop
                      ? { pathLength: [0, 0, 1, 1, 0] }
                      : { pathLength: 1 }
                  }
                  transition={
                    loop
                      ? {
                          duration: fullCycleDuration,
                          times: [0, startTime, endTime, resetTime, 1],
                          ease: 'easeInOut',
                          repeat: Infinity,
                          repeatDelay: 0,
                        }
                      : {
                          duration: animationDuration,
                          delay: index * staggerDelay,
                          ease: 'easeInOut',
                        }
                  }
                />

                {loop && (
                  <motion.circle
                    r="2"
                    fill={lineColor}
                    initial={{ offsetDistance: '0%', opacity: 0 }}
                    animate={{
                      offsetDistance: [null, '0%', '100%', '100%', '100%'],
                      opacity: [0, 0, 1, 0, 0],
                    }}
                    transition={{
                      duration: fullCycleDuration,
                      times: [0, startTime, endTime, resetTime, 1],
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 0,
                    }}
                    style={{
                      offsetPath: `path('${path}')`,
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* City marker dots + labels */}
          {projectedCities.map((city, index) => (
            <g key={`city-${city.label}-${index}`}>
              <motion.g
                onHoverStart={() => setHoveredLocation(city.label ?? null)}
                onHoverEnd={() => setHoveredLocation(null)}
                className="cursor-pointer"
                whileHover={{ scale: 1.18 }}
                transition={{ type: 'spring', stiffness: 420, damping: 12 }}
              >
                <circle
                  cx={city.px}
                  cy={city.py}
                  r="1.5"
                  fill={lineColor}
                  filter="url(#world-map-glow)"
                />
                <circle
                  cx={city.px}
                  cy={city.py}
                  r="1.5"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate attributeName="r" from="1.5" to="6" dur="2s" begin={`${index * 0.18}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${index * 0.18}s`} repeatCount="indefinite" />
                </circle>
              </motion.g>

              {showLabels && city.label && (
                <motion.g
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 * index + 0.2, duration: 0.45 }}
                  className="pointer-events-none hidden sm:block"
                >
                  <foreignObject
                    x={Math.max(2, Math.min(city.px - 25 + (city.labelOffset?.x ?? 0) * 0.5, mapWidth - 55))}
                    y={Math.max(2, Math.min(city.py - 18 + (city.labelOffset?.y ?? 0) * 0.5, mapHeight - 18))}
                    width="50"
                    height="14"
                  >
                    <div className="flex h-full items-center justify-center">
                      <span className="text-[5px] rounded-[2px] border border-gray-200 bg-white/95 px-1 py-[1px] font-medium text-black shadow-sm dark:border-gray-700 dark:bg-black/95 dark:text-white whitespace-nowrap">
                        {city.label}
                      </span>
                    </div>
                  </foreignObject>
                </motion.g>
              )}
            </g>
          ))}
        </svg>
      </div>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute bottom-4 left-4 rounded-lg border px-3 py-2 text-sm font-medium backdrop-blur-sm sm:hidden ${mobileTooltipClasses}`}
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
