import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface OptimizedHeroSectionProps {
  backgrounds: string[];
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    onClick: () => void;
  };
  interval?: number;
  className?: string;
}

export function OptimizedHeroSection({
  backgrounds,
  title,
  subtitle,
  cta,
  interval = 5000,
  className,
}: OptimizedHeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setShouldReduceMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  const safeBackgrounds = useMemo(
    () => backgrounds.filter((src) => Boolean(src)),
    [backgrounds],
  );

  const shouldRotate = safeBackgrounds.length > 1 && !shouldReduceMotion;

  useEffect(() => {
    setCurrentIndex(0);
    setLoadedImages(new Set());
  }, [safeBackgrounds]);

  useEffect(() => {
    if (safeBackgrounds.length === 0) return;

    const indicesToPreload = new Set<number>();
    indicesToPreload.add(currentIndex);
    indicesToPreload.add((currentIndex + 1) % safeBackgrounds.length);

    indicesToPreload.forEach((index) => {
      const src = safeBackgrounds[index];
      if (!src) return;

      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => {
          if (prev.has(index)) return prev;
          const next = new Set(prev);
          next.add(index);
          return next;
        });
      };
    });
  }, [safeBackgrounds, currentIndex]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = null;
      }
    };
  }, []);

  // Auto-rotate backgrounds
  useEffect(() => {
    if (!shouldRotate) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % safeBackgrounds.length);
        setIsTransitioning(false);
      }, 300);
    }, Math.max(1000, interval));

    return () => clearInterval(timer);
  }, [shouldRotate, safeBackgrounds.length, interval]);

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [],
  );

  return (
    <section className={cn('relative min-h-screen overflow-hidden', className)}>
      {/* Background Images */}
      <div className="absolute inset-0">
        {safeBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 bg-cover bg-center bg-no-repeat',
              shouldReduceMotion ? 'transition-none' : 'transition-opacity duration-1000',
              index === currentIndex && loadedImages.has(index)
                ? 'opacity-100'
                : 'opacity-0'
            )}
            style={{ backgroundImage: `url(${bg})` } as CSSProperties}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className={cn(
            'text-center text-white',
            shouldReduceMotion ? '' : 'transition-all duration-500',
            shouldReduceMotion
              ? 'opacity-100'
              : isTransitioning
                ? 'translate-y-2 opacity-80'
                : 'translate-y-0 opacity-100'
          )}
        >
          <h1 className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-8 text-lg md:text-xl lg:text-2xl">
              {subtitle}
            </p>
          )}
          {cta && (
            <Button
              size="lg"
              onClick={cta.onClick}
              className="bg-white text-black hover:bg-gray-100"
            >
              {cta.text}
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicators */}
      {safeBackgrounds.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {safeBackgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default OptimizedHeroSection;
