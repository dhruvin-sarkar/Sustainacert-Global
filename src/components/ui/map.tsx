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
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;
const MAP_PADDING_X = 28;
const MAP_PADDING_Y = 42;

export function WorldMap({
  dots = [],
  lineColor = '#10b981',
  showLabels = true,
  labelClassName = 'text-sm',
  animationDuration = 2.2,
  loop = true,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const { isDark } = useTheme();

  const map = useMemo(
    () => new DottedMap({ height: 140, grid: 'diagonal' }),
    [],
  );

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.28,
        color: isDark ? '#FFFFFF40' : '#00000040',
        shape: 'circle',
        backgroundColor: 'transparent',
      }),
    [isDark, map],
  );

  const projectPoint = (lat: number, lng: number) => {
    const usableWidth = MAP_WIDTH - MAP_PADDING_X * 2;
    const usableHeight = MAP_HEIGHT - MAP_PADDING_Y * 2;
    const x = MAP_PADDING_X + (lng + 180) * (usableWidth / 360);
    const y = MAP_PADDING_Y + (90 - lat) * (usableHeight / 180);
    return { x, y };
  };

  const uniqueLocations = useMemo(() => {
    const locationMap = new Map<string, MapLocation>();

    dots.forEach((route) => {
      [route.start, route.end].forEach((location) => {
        const key = `${location.label ?? ''}:${location.lat}:${location.lng}`;
        if (!locationMap.has(key)) {
          locationMap.set(key, location);
        }
      });
    });

    return Array.from(locationMap.values());
  }, [dots]);

  const getLabelPosition = (point: { x: number; y: number }, location: MapLocation) => {
    const offsetX = location.labelOffset?.x ?? 0;
    const offsetY = location.labelOffset?.y ?? 0;

    return {
      x: Math.max(8, Math.min(point.x - 50 + offsetX, MAP_WIDTH - 108)),
      y: Math.max(8, Math.min(point.y - 35 + offsetY, MAP_HEIGHT - 38)),
    };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const staggerDelay = 0.32;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime = 1.6;
  const fullCycleDuration = totalAnimationTime + pauseTime;

  const labelClasses = isDark
    ? 'bg-black/85 text-white border-white/10 shadow-[0_12px_28px_rgba(16,185,129,0.14)]'
    : 'bg-white/92 text-slate-900 border-emerald-200/80 shadow-[0_12px_28px_rgba(15,23,42,0.08)]';

  const mobileTooltipClasses = isDark
    ? 'bg-black/90 text-white border-white/10'
    : 'bg-white/92 text-slate-900 border-emerald-200/80';

  return (
    <div className="relative w-full aspect-[1.55/1] overflow-hidden rounded-lg bg-white font-sans dark:bg-black md:aspect-[1.9/1] lg:aspect-[2/1]">
      <div className="relative h-full w-full">
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="pointer-events-none h-full w-full select-none object-cover [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
          alt="world map"
          draggable={false}
        />

        <svg
          ref={svgRef}
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="absolute inset-0 h-full w-full select-none pointer-events-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="world-map-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <filter id="world-map-glow">
              <feMorphology operator="dilate" radius="0.5" />
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {dots.map((dot, index) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);
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
                  strokeWidth="1"
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
                    r="4"
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

          {uniqueLocations.map((location, index) => {
            const point = projectPoint(location.lat, location.lng);
            const labelPosition = getLabelPosition(point, location);

            return (
              <g key={`location-${location.label}-${location.lat}-${location.lng}-${index}`}>
                <motion.g
                  onHoverStart={() => setHoveredLocation(location.label ?? null)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 12 }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#world-map-glow)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill={lineColor}
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="12"
                      dur="2s"
                      begin={`${index * 0.18}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      begin={`${index * 0.18}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>

                {showLabels && location.label && (
                  <motion.g
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 * index + 0.2, duration: 0.45 }}
                    className="pointer-events-none hidden sm:block"
                  >
                    <foreignObject
                      x={labelPosition.x}
                      y={labelPosition.y}
                      width="100"
                      height="30"
                    >
                      <div className="flex h-full items-center justify-center">
                        <span
                          className={`${labelClassName} rounded-md border border-gray-200 bg-white/95 px-2 py-0.5 font-medium text-black shadow-sm dark:border-gray-700 dark:bg-black/95 dark:text-white`}
                        >
                          {location.label}
                        </span>
                      </div>
                    </foreignObject>
                  </motion.g>
                )}
              </g>
            );
          })}
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
