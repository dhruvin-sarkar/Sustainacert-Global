"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface TooltipItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  items,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    const target = event.currentTarget;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
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
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-lg bg-slate-900 border border-emerald-500/30 z-50 shadow-xl px-3 py-2"
              >
                <div className="absolute inset-x-4 z-30 w-[30%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                <div className="font-semibold text-white relative z-30 text-xs">
                  {item.name}
                </div>
                <div className="text-slate-400 text-[10px]">
                  {item.designation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <img
            onMouseMove={handleMouseMove}
            src={item.image}
            alt={item.name}
            className="object-cover object-top rounded-full h-10 w-10 border-2 border-emerald-900/50 group-hover:border-emerald-500 group-hover:scale-110 group-hover:z-30 relative transition-all duration-300 cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};
