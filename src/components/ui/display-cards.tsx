"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  children?: React.ReactNode;
  index?: number;
  isActive?: boolean;
  onClick?: () => void;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-5 text-emerald-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-emerald-500",
  titleClassName = "text-emerald-500",
  children,
  index = 0,
  isActive = false,
  onClick,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-auto min-h-[280px] w-full max-w-[30rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-slate-900/95 backdrop-blur-md px-7 py-6 shadow-2xl transition-all duration-500 cursor-pointer",
        isActive 
          ? "border-emerald-400 bg-slate-800/95 shadow-emerald-500/40 scale-105" 
          : "border-emerald-700/40 hover:border-emerald-500/60 hover:scale-102",
        className
      )}
      onClick={onClick}
    >
      {children || (
        <>
          <div className="flex items-center gap-3">
            <span className="relative inline-block rounded-full bg-emerald-900/60 p-2.5">
              {icon}
            </span>
            <p className={cn("text-xl font-bold", titleClassName)}>{title}</p>
          </div>
          <p className="text-base text-slate-200 leading-relaxed">{description}</p>
          <p className="text-sm text-slate-400 font-medium">{date}</p>
        </>
      )}
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  // STATE: Track which card is currently active (brought to front)
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const defaultCards = [
    {
      className: "",
    },
    {
      className: "",
    },
    {
      className: "",
    },
  ];

  const displayCards = cards || defaultCards;

  // FUNCTION: Get dynamic position/z-index based on active card
  const getCardPosition = (cardIndex: number) => {
    const isActive = cardIndex === activeCardIndex;
    
    // Card positions when each card is active:
    if (activeCardIndex === 0) {
      // Card 1 is active (default state)
      if (cardIndex === 0) return "[grid-area:stack] z-30 translate-x-0 translate-y-0";
      if (cardIndex === 1) return "[grid-area:stack] z-20 translate-x-24 translate-y-14";
      if (cardIndex === 2) return "[grid-area:stack] z-10 translate-x-48 translate-y-28";
    }
    
    if (activeCardIndex === 1) {
      // Card 2 is active - bring to front
      if (cardIndex === 0) return "[grid-area:stack] z-20 -translate-x-24 -translate-y-14";
      if (cardIndex === 1) return "[grid-area:stack] z-30 translate-x-0 translate-y-0"; // FRONT
      if (cardIndex === 2) return "[grid-area:stack] z-10 translate-x-24 translate-y-14";
    }
    
    if (activeCardIndex === 2) {
      // Card 3 is active - bring to front
      if (cardIndex === 0) return "[grid-area:stack] z-10 -translate-x-48 -translate-y-28";
      if (cardIndex === 1) return "[grid-area:stack] z-20 -translate-x-24 -translate-y-14";
      if (cardIndex === 2) return "[grid-area:stack] z-30 translate-x-0 translate-y-0"; // FRONT
    }
    
    return "[grid-area:stack]";
  };

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 min-h-[450px]">
      {displayCards.map((cardProps, index) => (
        <DisplayCard
          key={`display-card-${index}`}
          {...cardProps}
          index={index}
          isActive={index === activeCardIndex}
          className={cn(
            getCardPosition(index),
            "transition-all duration-700 ease-out",
            cardProps.className
          )}
          onClick={() => setActiveCardIndex(index)}
        />
      ))}
    </div>
  );
}

export { DisplayCard };
