import { useMemo } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationMap } from '@/components/ui/expand-map';
import { FeatureCarousel } from '@/components/ui/animated-feature-carousel';
import { RegionData } from '@/data/regions';
import { 
  getRegionImages, 
  adaptRegionToCarouselSteps 
} from '@/adapters/region-carousel-adapter';

interface RegionCardsModalProps {
  region: RegionData;
  onClose: () => void;
}

export default function RegionCardsModal({ region, onClose }: RegionCardsModalProps) {
  // Adapt region data to carousel format
  const carouselSteps = useMemo(() => adaptRegionToCarouselSteps(region), [region]);
  const carouselImages = useMemo(() => getRegionImages(region.id), [region.id]);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-lg z-[9999] flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`region-modal-${region.id}`}
      >
        <motion.div 
          className="relative max-w-[95rem] w-full my-12"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-800/90 hover:bg-emerald-600 border-2 border-slate-600/50 hover:border-emerald-500 transition-all duration-300 hover:scale-110 hover:rotate-90 z-50 shadow-2xl group"
            aria-label="Close regional information modal"
          >
            <X size={20} className="text-slate-300 group-hover:text-white transition-colors" />
          </button>

          <header className="text-center mb-14">
            <h2 
              id={`region-modal-${region.id}`}
              className="text-6xl font-black text-white tracking-tight mb-6"
            >
              {region.name}
            </h2>
            <p className="text-slate-300 text-xl max-w-4xl mx-auto font-medium leading-relaxed">
              {region.detailedInfo.description}
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-16 items-center">
            
            {/* LEFT: Feature Carousel */}
            <section aria-label="Regional operations showcase">
              <FeatureCarousel
                image={carouselImages}
                steps={carouselSteps}
              />
            </section>

            {/* RIGHT: Main Hub Location */}
            <aside className="flex flex-col items-center justify-center" aria-label="Regional information">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-300 tracking-widest uppercase text-center">
                  Main Hub Location
                </h3>
              </div>
              <div className="scale-175 transform-gpu">
                <LocationMap 
                  location={region.mainHub}
                  coordinates={region.hubCoordinates}
                />
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
