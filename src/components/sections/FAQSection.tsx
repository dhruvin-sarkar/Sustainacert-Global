import React from 'react';
import { FaqAccordion } from '@/components/ui/faq-chat-accordion';
import { sustainacertFAQs } from '@/data/faq-data';
import { Connect } from '@/components/sections/Connect';

export default function FAQSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Got Questions?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about our certification services, processes, and standards.
          </p>
        </div>

        {/* FAQ Accordion - Clean, No Glow Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-6">
              Certification FAQs
            </h3>
            <FaqAccordion 
              data={sustainacertFAQs.slice(0, 3)}
              timestamp=""
              className="p-0"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-6">
              Process & Verification
            </h3>
            <FaqAccordion 
              data={sustainacertFAQs.slice(3, 6)}
              timestamp=""
              className="p-0"
            />
          </div>
        </div>

        {/* Connect Component with Highlighter - Replaces Contact Support */}
        <div className="mt-20">
          <Connect />
        </div>
      </div>
    </section>
  );
}
