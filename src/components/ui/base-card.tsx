import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { GlowCard } from '@/components/ui/spotlight-card';

export const BaseCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <GlowCard
        ref={ref}
        glowColor="green"
        className={cn('rounded-2xl bg-card border border-border/50', className)}
        {...props}
      />
    );
  },
);

BaseCard.displayName = 'BaseCard';
