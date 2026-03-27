import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Globe as GlobeIcon } from 'lucide-react';
import { WorldMap } from '@/components/ui/map';

const networkRoutes = [
  {
    start: { lat: 25.2048, lng: 55.2708, label: 'Dubai', labelOffset: { x: -34, y: -2 } },
    end: { lat: 51.5072, lng: -0.1276, label: 'London', labelOffset: { x: -4, y: -8 } },
  },
  {
    start: { lat: 25.2048, lng: 55.2708, label: 'Dubai' },
    end: { lat: 1.3521, lng: 103.8198, label: 'Singapore', labelOffset: { x: 18, y: -2 } },
  },
  {
    start: { lat: 25.2048, lng: 55.2708, label: 'Dubai' },
    end: { lat: 28.6139, lng: 77.209, label: 'New Delhi', labelOffset: { x: 18, y: -22 } },
  },
];

export default function GeographicalPresence() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GlobeIcon size={16} />
              Global Coverage
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Geographical Presence</h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Headquartered in Dubai with a network of qualified auditors, inspectors, and field offices, 
              SUSTAINACERT operates across South & Southeast Asia, Europe, the Middle East, and Africa. 
              Our multilingual team delivers culturally relevant service with broad scope expertise.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <WorldMap dots={networkRoutes} lineColor="#10b981" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
