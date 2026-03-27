import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

// Pre-built skeleton components for common use cases
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 rounded-lg border p-4", className)}>
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

function ListSkeleton({ items = 3, className }: { items?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="container mx-auto space-y-8 p-4">
      <Skeleton className="h-12 w-1/3" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  );
}

function SectionLoader() {
  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground text-sm">Loading section...</p>
      </div>
    </div>
  );
}

export { Skeleton, CardSkeleton, ListSkeleton, PageSkeleton, TextSkeleton, SectionLoader };
