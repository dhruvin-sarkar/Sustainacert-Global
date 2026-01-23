"use client"

import { X, Building2, Mail, Phone, Globe } from 'lucide-react';
import { getRegionForCountry } from '@/data/regions';
import { LocationMap } from '@/components/ui/expand-map';
import type { RegionData } from '@/types';

interface RegionModalProps {
  region: RegionData;
  onClose: () => void;
}

export default function RegionModal({ region, onClose }: RegionModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))',
          border: `2px solid ${region.color}`,
          boxShadow: `0 0 80px ${region.color}60, 0 25px 80px rgba(0,0,0,0.7)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: `linear-gradient(90deg, ${region.color}, transparent)`,
          }}
        />

        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          <div
            className="sticky top-0 z-10 p-8 pb-6"
            style={{
              background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.9))',
              backdropFilter: 'blur(20px)',
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-6 right-6 p-2.5 rounded-full hover:bg-white/10 transition-all hover:rotate-90 duration-300"
            >
              <X size={22} className="text-slate-300" />
            </button>

            <div className="flex items-center gap-4 mb-3">
              <div
                className="w-5 h-5 rounded-full animate-pulse"
                style={{
                  backgroundColor: region.color,
                  boxShadow: `0 0 25px ${region.color}`,
                }}
              />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {region.name}
              </h2>
            </div>
          </div>

          <div className="px-8 pb-8 space-y-7">
            {/* Location Map Section */}
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-slate-400 text-xs font-medium tracking-widest uppercase mb-4">
                Main Hub Location
              </p>
              <LocationMap 
                location={region.mainHub}
                coordinates={region.hubCoordinates}
              />
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: `1px solid ${region.color}20`,
              }}
            >
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <Globe size={22} style={{ color: region.color }} />
                About Our Operations
              </h3>
              <p className="text-slate-300 leading-relaxed text-base">{region.detailedInfo.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Building2 size={22} style={{ color: region.color }} />
                Office Locations
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {region.detailedInfo.offices.map((office, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                      border: `1.5px solid ${region.color}30`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: region.color, boxShadow: `0 0 10px ${region.color}` }}
                    />
                    <span className="text-slate-200 font-medium">{office}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Services Offered</h3>
              <div className="grid gap-2.5">
                {region.detailedInfo.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all hover:translate-x-1"
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                      border: `1.5px solid ${region.color}20`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: region.color, boxShadow: `0 0 8px ${region.color}` }} />
                    <span className="text-slate-200 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t" style={{ borderColor: `${region.color}30` }}>
              <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${region.detailedInfo.contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                    border: `1.5px solid ${region.color}30`,
                  }}
                >
                  <Mail size={20} className="group-hover:scale-110 transition-transform" style={{ color: region.color }} />
                  <span className="text-slate-200 font-medium">{region.detailedInfo.contact.email}</span>
                </a>
                <a
                  href={`tel:${region.detailedInfo.contact.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-105 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                    border: `1.5px solid ${region.color}30`,
                  }}
                >
                  <Phone size={20} className="group-hover:scale-110 transition-transform" style={{ color: region.color }} />
                  <span className="text-slate-200 font-medium">{region.detailedInfo.contact.phone}</span>
                </a>
              </div>
            </div>

            <button
              className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-98 shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${region.color}, ${region.color}dd)`,
                boxShadow: `0 8px 30px ${region.color}60`,
              }}
              onClick={onClose}
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${region.color};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${region.color}dd;
        }
      `}</style>
    </div>
  );
}
