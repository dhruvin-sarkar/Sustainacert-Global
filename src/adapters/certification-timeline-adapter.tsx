import React from 'react';
import type { CertificationStep } from '@/data/certification-steps';
import type { TimelineEntry } from '@/components/ui/timeline';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

export function adaptCertificationStepsToTimeline(
  steps: CertificationStep[]
): TimelineEntry[] {
  return steps.map((step) => ({
    title: step.number,
    content: (
      <div className="mb-8">
        {/* Card Container */}
        <div className="relative group">
          {/* Background Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          {/* Main Card */}
          <div className="relative bg-slate-900/90 backdrop-blur-sm border-2 border-emerald-700/30 rounded-2xl p-8 shadow-2xl hover:border-emerald-500/50 transition-all duration-300">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Step Number Badge */}
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/20 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20">
                  <span className="text-2xl font-bold text-emerald-400">
                    {step.number}
                  </span>
                </div>
                
                {/* Title & Icon */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {step.icon && (
                      <span className="text-2xl" role="img" aria-label={step.title}>
                        {step.icon}
                      </span>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                  {step.estimatedTime && (
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <Clock size={14} />
                      <span>{step.estimatedTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
              {step.description}
            </p>

            {/* Details List */}
            {step.details && step.details.length > 0 && (
              <div className="space-y-3 mb-6">
                {step.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-slate-300 group/item"
                  >
                    <CheckCircle2 
                      size={20} 
                      className="text-emerald-400 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" 
                    />
                    <span className="text-sm md:text-base leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer CTA */}
            <div className="flex items-center gap-2 text-emerald-400 font-semibold group/cta cursor-pointer">
              <span className="text-sm md:text-base">Learn More</span>
              <ArrowRight 
                size={18} 
                className="group-hover/cta:translate-x-1 transition-transform" 
              />
            </div>
          </div>
        </div>
      </div>
    ),
  }));
}
