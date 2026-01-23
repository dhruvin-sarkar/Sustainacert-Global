import React from 'react';
import { X, Globe, Building2, Briefcase, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DisplayCards from '@/components/ui/display-cards';
import { LocationMap } from '@/components/ui/expand-map';
import { RegionData } from '@/data/regions';

interface RegionCardsModalProps {
  region: RegionData;
  onClose: () => void;
}

export default function RegionCardsModal({ region, onClose }: RegionCardsModalProps) {
  const cards = [
    // CARD 1 - About Operations
    {
      children: (
        <div className="space-y-5 h-full flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <span className="relative inline-block rounded-full bg-emerald-900/60 p-2.5 shadow-lg shadow-emerald-500/20">
              <Globe className="size-6 text-emerald-300" />
            </span>
            <h3 className="text-2xl font-bold text-white">Regional Operations</h3>
          </div>
          <p className="text-slate-100 leading-relaxed text-base flex-1">
            {region.detailedInfo.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold">
            <Award className="size-4" />
            <span>Certified Expert Team</span>
          </div>
        </div>
      )
    },
    
    // CARD 2 - Office Locations
    {
      children: (
        <div className="space-y-5 h-full flex flex-col">
          <div className="flex items-center gap-3">
            <span className="relative inline-block rounded-full bg-emerald-900/60 p-2.5 shadow-lg shadow-emerald-500/20">
              <Building2 className="size-6 text-emerald-300" />
            </span>
            <h3 className="text-2xl font-bold text-white">Office Network</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1">
            {region.detailedInfo.offices.map((office, idx) => (
              <div 
                key={`office-${idx}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-950/40 border-2 border-emerald-700/40 backdrop-blur-sm shadow-lg hover:border-emerald-500/60 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                <span className="text-slate-100 text-sm font-semibold truncate">{office}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-400 font-medium">Local Presence Worldwide</p>
        </div>
      )
    },
    
    // CARD 3 - Services
    {
      children: (
        <div className="space-y-5 h-full flex flex-col">
          <div className="flex items-center gap-3">
            <span className="relative inline-block rounded-full bg-emerald-900/60 p-2.5 shadow-lg shadow-emerald-500/20">
              <Briefcase className="size-6 text-emerald-300" />
            </span>
            <h3 className="text-2xl font-bold text-white">Our Services</h3>
          </div>
          <div className="space-y-3 flex-1">
            {region.detailedInfo.services.slice(0, 4).map((service, idx) => (
              <div 
                key={`service-${idx}`}
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-slate-800/60 border border-emerald-700/30 backdrop-blur-sm hover:bg-slate-700/60 hover:border-emerald-600/50 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                <span className="text-slate-100 text-base font-medium leading-tight">{service}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-emerald-400 font-medium">+ More Certifications</p>
        </div>
      )
    },
  ];

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
          className="relative max-w-7xl w-full my-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-14 right-0 p-3 rounded-full bg-slate-800/90 hover:bg-emerald-600 border border-slate-600/50 hover:border-emerald-500 transition-all hover:scale-110 z-50 shadow-xl"
            aria-label="Close modal"
          >
            <X size={24} className="text-slate-300" />
          </button>

          {/* Header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div
                className="w-5 h-5 rounded-full animate-pulse"
                style={{
                  backgroundColor: region.color,
                  boxShadow: `0 0 30px ${region.color}`,
                }}
              />
              <h2 id={`region-modal-${region.id}`} className="text-5xl font-bold text-white">
                {region.name}
              </h2>
            </div>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto font-medium">
              {region.detailedInfo.description.substring(0, 150)}...
            </p>
          </div>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-start">
            
            {/* Left: Interactive Display Cards */}
            <div className="flex flex-col items-center xl:items-end gap-4">
              <p className="text-slate-400 text-sm font-medium">
                💡 Click any card to bring it to the front
              </p>
              <DisplayCards cards={cards} />
            </div>

            {/* Right: Location Map */}
            <div className="flex flex-col items-center">
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-5">
                Main Hub Location
              </p>
              <LocationMap 
                location={region.mainHub}
                coordinates={region.hubCoordinates}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
