import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TimelineItem {
  title: string;
  description: string;
  icon?: ReactNode;
  date?: string;
}

interface EnhancedTimelineProps {
  items: TimelineItem[];
  variant?: 'default' | 'compact';
  animate?: boolean;
  className?: string;
}

export function EnhancedTimeline({
  items,
  variant = 'default',
  animate = true,
  className,
}: EnhancedTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || prefersReducedMotion) {
      setVisibleItems(new Set(items.map((_, i) => i)));
      return;
    }

    setVisibleItems(new Set());

    const elementToIndex = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = elementToIndex.get(entry.target);
          if (index === undefined) return;

          setVisibleItems((prev) => {
            if (prev.has(index)) return prev;
            const next = new Set(prev);
            next.add(index);
            return next;
          });

          observer.unobserve(entry.target);
          elementToIndex.delete(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      elementToIndex.set(ref, index);
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      elementToIndex.clear();
    };
  }, [items, animate]);

  return (
    <div className={cn('relative', className)}>
      {/* Timeline line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 md:left-1/2" />

      {/* Timeline items */}
      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => {
          const isVisible = visibleItems.has(index);
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={cn(
                'relative flex items-center gap-4 md:gap-8',
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              )}
            >
              {/* Content */}
              <div
                className={cn(
                  'flex-1 transition-all duration-700',
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : isEven
                    ? '-translate-x-8 opacity-0'
                    : 'translate-x-8 opacity-0',
                  isEven ? 'md:text-right' : 'md:text-left'
                )}
              >
                <div
                  className={cn(
                    'group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md md:p-6',
                    variant === 'compact' && 'p-3 md:p-4'
                  )}
                >
                  {item.date && (
                    <div className="mb-2 text-sm text-muted-foreground">
                      {item.date}
                    </div>
                  )}
                  <h3
                    className={cn(
                      'mb-2 font-semibold',
                      variant === 'compact' ? 'text-base' : 'text-lg md:text-xl'
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'text-muted-foreground',
                      variant === 'compact' ? 'text-sm' : 'text-sm md:text-base'
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Icon/Dot */}
              <div
                className={cn(
                  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary transition-all duration-700 md:h-12 md:w-12',
                  isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                )}
              >
                {item.icon ? (
                  <div className="text-primary-foreground">{item.icon}</div>
                ) : (
                  <div className="h-2 w-2 rounded-full bg-primary-foreground md:h-3 md:w-3" />
                )}
              </div>

              {/* Spacer for alignment */}
              <div className="hidden flex-1 md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EnhancedTimeline;
