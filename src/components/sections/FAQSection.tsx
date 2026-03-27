import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaqAccordion } from '@/components/ui/faq-chat-accordion';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { sustainacertFAQs } from '@/data/faq-data';
import { Connect } from '@/components/sections/Connect';

export default function FAQSection() {
  const shouldReduceMotion = useReducedMotion();
  const certificationFAQs = useMemo(() => sustainacertFAQs.slice(0, 3), []);
  const processFAQs = useMemo(() => sustainacertFAQs.slice(3, 6), []);

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

        {/* Visual Enhancement Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Certification Process Image */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="relative overflow-hidden rounded-2xl shadow-lg"
          >
            <OptimizedImage
              src="/empty-laboratory-workspace-displays-jars-blood-samples-tools-prepared-analysis-clinical.jpg.jpeg"
              alt="Certification laboratory analysis process"
              className="h-48 w-full"
              aspectRatio="3/2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-white font-semibold">Laboratory Certification</h4>
              <p className="text-white/80 text-sm">Rigorous testing and analysis</p>
            </div>
          </motion.div>

          {/* Industry Standards Image */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1, duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl shadow-lg"
          >
            <OptimizedImage
              src="/interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market.jpg.jpeg"
              alt="Industry standards in logistics and distribution"
              className="h-48 w-full"
              aspectRatio="3/2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-white font-semibold">Industry Standards</h4>
              <p className="text-white/80 text-sm">Global compliance requirements</p>
            </div>
          </motion.div>

          {/* Sustainable Practices Image */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2, duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl shadow-lg"
          >
            <OptimizedImage
              src="/shot-wind-turbines-mountains.jpg.jpeg"
              alt="Sustainable practices and renewable energy"
              className="h-48 w-full"
              aspectRatio="3/2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-white font-semibold">Sustainable Practices</h4>
              <p className="text-white/80 text-sm">Environmental certification</p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Accordion - Clean, No Glow Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-6">
              Certification FAQs
            </h3>
            <FaqAccordion 
              data={certificationFAQs}
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
              data={processFAQs}
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
