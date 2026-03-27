import { useEffect, useMemo, useSyncExternalStore, forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { BRAND_GLOW } from '@/constants/brand-colors';
import { cn } from '@/lib/utils';

type GlowColor = 'green';

type PointerSnapshot = {
  x: number;
  y: number;
  xp: number;
  yp: number;
  reducedMotion: boolean;
  coarsePointer: boolean;
};

const DEFAULT_GLOW_COLOR: GlowColor = 'green';

const DEFAULT_RADIUS_PX = 14;
const DEFAULT_BORDER_PX = 3;
const DEFAULT_SPOTLIGHT_SIZE_PX = 200;

const STYLE_ELEMENT_ID = 'spotlight-card-styles';

let pointerSnapshot: PointerSnapshot = {
  x: 0,
  y: 0,
  xp: 0.5,
  yp: 0.5,
  reducedMotion: false,
  coarsePointer: false,
};

let pointerListeners: Set<() => void> | null = null;
let pointerInitialized = false;
let rafPending = false;
let pendingX = 0;
let pendingY = 0;
let mountedCards = 0;
let pointerMoveHandler: ((e: PointerEvent) => void) | null = null;

const getServerSnapshot = (): PointerSnapshot => pointerSnapshot;

const subscribePointer = (listener: () => void) => {
  if (!pointerListeners) pointerListeners = new Set();
  pointerListeners.add(listener);
  return () => {
    pointerListeners?.delete(listener);
  };
};

const notifyPointer = () => {
  if (!pointerListeners) return;
  pointerListeners.forEach((l) => l());
};

const updatePointer = (x: number, y: number) => {
  const w = globalThis.window?.innerWidth || 1;
  const h = globalThis.window?.innerHeight || 1;

  pointerSnapshot = {
    ...pointerSnapshot,
    x,
    y,
    xp: Math.max(0, Math.min(1, x / w)),
    yp: Math.max(0, Math.min(1, y / h)),
  };

  notifyPointer();
};

const ensurePointerTracking = () => {
  if (pointerInitialized) return;
  pointerInitialized = true;

  if (!globalThis.window) return;

  const reduced = globalThis.window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  const coarse = globalThis.window.matchMedia?.('(pointer: coarse)')?.matches ?? false;

  pointerSnapshot = {
    ...pointerSnapshot,
    reducedMotion: reduced,
    coarsePointer: coarse,
  };

  const setCenter = () => {
    updatePointer((globalThis.window.innerWidth || 1) / 2, (globalThis.window.innerHeight || 1) / 2);
  };

  if (reduced || coarse) {
    setCenter();
    return;
  }

  const onPointerMove = (e: PointerEvent) => {
    pendingX = e.clientX;
    pendingY = e.clientY;

    if (rafPending) return;
    rafPending = true;

    globalThis.window.requestAnimationFrame(() => {
      rafPending = false;
      updatePointer(pendingX, pendingY);
    });
  };

  pointerMoveHandler = onPointerMove;
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  setCenter();
};

const attachPointerTracking = () => {
  mountedCards += 1;
  ensurePointerTracking();
};

const detachPointerTracking = () => {
  mountedCards = Math.max(0, mountedCards - 1);
  if (mountedCards !== 0) return;
  if (!pointerMoveHandler) return;

  document.removeEventListener('pointermove', pointerMoveHandler);
  pointerMoveHandler = null;
  pointerInitialized = false;
};

const ensureStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ELEMENT_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ELEMENT_ID;
  style.textContent = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }

    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }

    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }

    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }

    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  document.head.appendChild(style);
};

export interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  glowColor?: GlowColor;
}

export const GlowCard = forwardRef<HTMLDivElement, GlowCardProps>(
  ({ children, className, glowColor = DEFAULT_GLOW_COLOR, style, ...props }, ref) => {
    const snapshot = useSyncExternalStore(subscribePointer, getServerSnapshot, getServerSnapshot);

    useEffect(() => {
      attachPointerTracking();
      ensureStyles();
      return () => {
        detachPointerTracking();
      };
    }, []);

    const computed = useMemo(() => {
      const { x, y, xp } = snapshot;

      return {
        '--base': BRAND_GLOW.base,
        '--spread': BRAND_GLOW.spread,
        '--radius': `${DEFAULT_RADIUS_PX}`,
        '--border': `${DEFAULT_BORDER_PX}`,
        '--size': `${DEFAULT_SPOTLIGHT_SIZE_PX}`,
        '--outer': '1',
        '--border-size': 'calc(var(--border, 2) * 1px)',
        '--spotlight-size': 'calc(var(--size, 150) * 1px)',
        '--hue': `calc(var(--base) + (${xp.toFixed(4)} * var(--spread, 0)))`,
        '--saturation': `${BRAND_GLOW.saturation}`,
        '--lightness': `${BRAND_GLOW.lightness}`,
        '--x': x.toFixed(2),
        '--y': y.toFixed(2),
      } as React.CSSProperties;
    }, [snapshot]);

    const background = useMemo(() => {
      if (snapshot.reducedMotion || snapshot.coarsePointer) {
        return {
          backgroundImage: `radial-gradient(
            calc(var(--spotlight-size) * 0.85) calc(var(--spotlight-size) * 0.85) at
            50% 50%,
            hsl(${BRAND_GLOW.base} ${BRAND_GLOW.saturation}% ${BRAND_GLOW.lightness}% / 0.10),
            transparent
          )`,
          backgroundAttachment: 'scroll' as const,
        };
      }

      return {
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.10)),
          transparent
        )`,
        backgroundAttachment: 'fixed' as const,
      };
    }, [snapshot.coarsePointer, snapshot.reducedMotion]);

    return (
      <div
        ref={ref}
        data-glow
        className={cn(
          'relative overflow-hidden rounded-2xl',
          snapshot.coarsePointer ? '' : 'will-change-[background-image]',
          className,
        )}
        style={{
          ...computed,
          ...background,
          backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
          backgroundPosition: '50% 50%',
          ...style,
        }}
        {...props}
      >
        <div data-glow />
        {children}
      </div>
    );
  },
);

GlowCard.displayName = 'GlowCard';
