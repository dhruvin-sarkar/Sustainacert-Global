import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Award, Shield, Leaf, Search, GraduationCap } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

const services = [
  {
    icon: Award,
    title: 'Product / Process Certification',
    description: 'ISO, food safety, environmental & sustainability standards for compliance and trust in global markets.',
    link: '/services',
    image: '/pharmacy-industry-woman-worker-protective-clothing-operating-production-tablets-sterile-working-conditions.jpg.jpeg',
  },
  {
    icon: Shield,
    title: 'Social Compliance Audits',
    description: 'SMETA, SA8000, BSCI, Social Security Audits, and proprietary code-of-ethics auditing.',
    link: '/services',
    image: '/interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market.jpg.jpeg',
  },
  {
    icon: Leaf,
    title: 'Sustainable Agriculture',
    description: 'GlobalG.A.P, GRASP, Rainforest Alliance/Fair Trade support, C-TPAT, and SLCP programs.',
    link: '/services',
    image: '/agronomist-gardener-holding-organic-healthy-fresh-salad-showing-agricultural-businessman-discussing-vegetables-nutrition-hydroponics-greenhouse-plantation-concept-agriculture.jpg.jpeg',
  },
  {
    icon: Search,
    title: 'Inspection & Verification',
    description: 'Farm, factory, and supply chain inspections with pre-shipment verification to reduce risk.',
    link: '/services',
    image: '/interior-view-steel-factory.jpg.jpeg',
  },
  {
    icon: GraduationCap,
    title: 'Training & Capacity Building',
    description: 'Internal audits, organic systems, food safety implementation, and ISO competence training.',
    link: '/services',
    image: '/two-researches-man-woman-examine-greenery-with-tablet-all-white-greenhouse.jpg.jpeg',
  },
];

export default function ServicesPreview() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={
            shouldReduceMotion
              ? undefined
              : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Certification Solutions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From product certification to social compliance, we provide end-to-end assurance services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: index * 0.1, duration: 0.5 }
              }
            >
              <div className="group block h-full">
                <div className="rounded-2xl overflow-hidden border border-white/35 dark:border-emerald-300/20 bg-white/35 dark:bg-white/5 backdrop-blur-xl shadow-[0_12px_32px_rgba(16,185,129,0.12)] h-full flex flex-col transition-all duration-300 hover:border-emerald-300/45">
                  {/* Service Image */}
                  <div className="relative h-40 overflow-hidden">
                    <OptimizedImage
                      src={service.image}
                      alt={`${service.title} - Professional certification environment`}
                      className="h-40 w-full"
                      aspectRatio="4/3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
