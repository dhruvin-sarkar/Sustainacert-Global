"use client";
import { useState } from "react";
import type { FC } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface TooltipItem {
  id: number;
  name: string;
  designation: string;
  image: string;
  profileUrl?: string;
}

interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

export const AnimatedTooltip: FC<AnimatedTooltipProps> = ({
  items,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-20, 20]),
    springConfig
  );
  
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-30, 30]),
    springConfig
  );
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const target = event.currentTarget;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("flex items-center -space-x-3", className)}>
      {items.map((item) => (
        <div
          className="relative group"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15, scale: 0.8 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 260,
                          damping: 10,
                        },
                      }
                }
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: 15, scale: 0.8 }}
                style={{
                  translateX: shouldReduceMotion ? 0 : translateX,
                  rotate: shouldReduceMotion ? 0 : rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-xl bg-slate-900 border-2 border-emerald-400/40 z-50 shadow-2xl px-5 py-3"
              >
                <div className="absolute inset-x-6 z-30 w-[40%] -bottom-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent h-[2px]" />
                <div className="font-bold text-white relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-slate-400 text-sm mt-1">
                  {item.designation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <a
            href={item.profileUrl}
            target={item.profileUrl ? "_blank" : undefined}
            rel={item.profileUrl ? "noopener noreferrer" : undefined}
            aria-label={item.profileUrl ? `${item.name} LinkedIn profile` : item.name}
            className="block"
          >
            <img
              onMouseMove={handleMouseMove}
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="object-cover object-top rounded-full h-12 w-12 border-2 border-emerald-900/50 group-hover:border-emerald-400 group-hover:scale-125 group-hover:z-30 relative transition-all duration-300 cursor-pointer shadow-lg"
            />
          </a>
        </div>
      ))}
    </div>
  );
};
