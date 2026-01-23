import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe as GlobeIcon } from 'lucide-react';
import WireframeDottedGlobe from '@/components/ui/wireframe-dotted-globe';

export default function GeographicalPresence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
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

          <div className="max-w-4xl mx-auto">
            <WireframeDottedGlobe />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
