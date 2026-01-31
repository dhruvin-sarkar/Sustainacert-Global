import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  aspectRatio?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  preload?: 'none' | 'metadata' | 'auto';
}

export function OptimizedVideo({
  src,
  poster,
  aspectRatio = '16/9',
  autoplay = false,
  muted = true,
  loop = false,
  controls = false,
  className = '',
  preload = 'none',
}: OptimizedVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setIsInView(false);
  }, [src, poster]);

  useEffect(() => {
    if (isInView) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAutoplay = autoplay && !prefersReducedMotion;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (shouldAutoplay && videoRef.current) {
              videoRef.current.play().catch(() => {
                // Autoplay failed, user interaction required
              });
            }
          } else {
            if (shouldAutoplay && videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.25,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoplay, isInView]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden bg-gray-100', className)}
      style={{ aspectRatio }}
    >
      {/* Poster placeholder */}
      {poster && !isLoaded && (
        <img
          src={poster}
          alt="Video poster"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Loading shimmer */}
      {!isLoaded && !poster && (
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      )}

      {/* Video element */}
      {isInView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          preload={preload}
          playsInline
          onLoadedData={handleLoadedData}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  );
}

export default OptimizedVideo;
