import { useState, useEffect } from 'react';
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload all background images
  useEffect(() => {
    backgrounds.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(index));
      };
    });
  }, [backgrounds]);

  // Auto-rotate backgrounds
  useEffect(() => {
    if (backgrounds.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        setIsTransitioning(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [backgrounds.length, interval]);

  return (
    <section className={cn('relative min-h-screen overflow-hidden', className)}>
      {/* Background Images */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, index) => (
          <div
            key={bg}
            className={cn(
              'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000',
              index === currentIndex && loadedImages.has(index)
                ? 'opacity-100'
                : 'opacity-0'
            )}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className={cn(
            'text-center text-white transition-all duration-500',
            isTransitioning ? 'translate-y-2 opacity-80' : 'translate-y-0 opacity-100'
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
      {backgrounds.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {backgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
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
