"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  readonly id: number;
  readonly question: string;
  readonly answer: string;
  readonly icon?: string;
  readonly iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  readonly data: FAQItem[];
  readonly className?: string;
  readonly timestamp?: string;
  readonly questionClassName?: string;
  readonly answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp,
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {timestamp && (
        <div className="mb-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          {timestamp}
        </div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => (
          <Accordion.Item 
            value={item.id.toString()} 
            key={item.id} 
            className="mb-3"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-x-4 text-left">
                <div
                  className={cn(
                    "relative flex-1 rounded-full border p-4 transition-all duration-300 flex items-center justify-center",
                    openItem === item.id.toString() 
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 shadow-lg shadow-emerald-500/10" 
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-300",
                    questionClassName
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute -top-3 text-2xl",
                        item.iconPosition === "right" ? "-right-2" : "-left-2"
                      )}
                      style={{
                        transform: item.iconPosition === "right" 
                          ? "rotate(7deg)" 
                          : "rotate(-4deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-semibold text-base pr-2 text-center">{item.question}</span>
                </div>

                <span 
                  className={cn(
                    "flex-shrink-0 transition-all duration-300",
                    openItem === item.id.toString() 
                      ? "text-emerald-500 rotate-180" 
                      : "text-slate-400 dark:text-slate-500 group-hover:text-emerald-500"
                  )}
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            
            <Accordion.Content asChild forceMount>
              <motion.div
                initial="collapsed"
                animate={openItem === item.id.toString() ? "open" : "collapsed"}
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="ml-0 mt-3 md:ml-4">
                  <div
                    className={cn(
                      "relative max-w-3xl rounded-full bg-emerald-600 dark:bg-emerald-700 px-8 py-4 text-white shadow-lg text-sm leading-relaxed flex items-center justify-center",
                      answerClassName
                    )}
                  >
                    <span className="text-center">{item.answer}</span>
                    {/* Chat bubble tail */}
                    <div className="absolute -top-2 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-emerald-600 dark:border-b-emerald-700" />
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
