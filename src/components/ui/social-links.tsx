"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Social {
  name: string;
  image: string;
  url: string;
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState<number>(0);

  return (
    <div
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative cursor-pointer px-3 py-2 transition-opacity duration-200 rounded-lg hover:bg-emerald-950/50",
            hoveredSocial && hoveredSocial !== social.name
              ? "opacity-40"
              : "opacity-100"
          )}
          onMouseEnter={() => {
            setHoveredSocial(social.name);
            setRotation(Math.random() * 20 - 10);
          }}
          onMouseLeave={() => setHoveredSocial(null)}
        >
          <span className="block text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors relative z-10">
            {social.name}
          </span>
          
          {/* Animated Icon Preview */}
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div className="absolute -top-16 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <motion.img
                  src={social.image}
                  alt={social.name}
                  className="w-12 h-12 rounded-lg shadow-2xl border-2 border-emerald-500/50"
                  initial={{
                    y: 10,
                    rotate: rotation,
                    opacity: 0,
                    scale: 0.8,
                    filter: "blur(4px)",
                  }}
                  animate={{ 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    filter: "blur(0px)" 
                  }}
                  exit={{ 
                    y: 10, 
                    opacity: 0,
                    scale: 0.8,
                    filter: "blur(4px)" 
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      ))}
    </div>
  );
}
