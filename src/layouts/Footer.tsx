import React from 'react';
import { Link } from 'react-router-dom';
import { SocialLinks } from '@/components/ui/social-links';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { HighlightGroup, HighlighterItem, Particles } from '@/components/ui/highlighter';
import { socialLinksData } from '@/data/social-links';
import { teamMembers } from '@/data/team-members';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1E1E] text-white overflow-hidden">
      {/* Subtle Particle Background - FIXED Z-INDEX */}
      <Particles 
        className="absolute inset-0 pointer-events-none opacity-20" 
        quantity={40}
        color="#10b981"
        staticity={50}
        ease={50}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Section: Company Info + Social Links */}
        <div className="py-12 border-b border-emerald-900/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Company Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/favicon.svg" 
                  alt="SUSTAINACERT" 
                  className="h-10 w-10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h3 className="text-xl font-bold text-white">SUSTAINACERT</h3>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-2xl text-sm">
                An independent global certification, inspection, and verification body focused on sustainability, ethical sourcing, and quality assurance across international supply chains.
              </p>
            </div>

            {/* SECTION 1: Reactive Social Links */}
            <div className="flex flex-col items-start lg:items-end">
              <h4 className="text-sm font-semibold text-emerald-400 mb-3">Follow Us</h4>
              <SocialLinks socials={socialLinksData} className="gap-2" />
            </div>
          </div>
        </div>

        {/* SECTION 2: Main Links with Highlighter Effect */}
        <HighlightGroup className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Quick Links */}
            <HighlighterItem>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-emerald-950/30 border border-emerald-900/20 h-full">
                <h3 className="text-base font-bold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2.5">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'About Us', path: '/about-us' },
                    { name: 'Services', path: '/services' },
                    { name: 'News & Blogs', path: '/news-blogs' },
                    { name: 'Contact', path: '/contact-us' }
                  ].map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path}
                        className="text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-1 h-1 rounded-full bg-emerald-500 mr-2 group-hover:w-2 transition-all"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </HighlighterItem>

            {/* Resources */}
            <HighlighterItem>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-emerald-950/30 border border-emerald-900/20 h-full">
                <h3 className="text-base font-bold text-white mb-4">Resources</h3>
                <ul className="space-y-2.5">
                  {[
                    { name: 'News', path: '/news-blogs' },
                    { name: 'Blogs', path: '/news-blogs' },
                    { name: 'Quality Policy', path: '/quality-policy' },
                    { name: 'Apply for Certification', path: '/apply' },
                    { name: 'Verify Certification', path: '/verify' }
                  ].map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path}
                        className="text-sm text-slate-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-1 h-1 rounded-full bg-emerald-500 mr-2 group-hover:w-2 transition-all"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </HighlighterItem>

            {/* Contact Us */}
            <HighlighterItem>
              <div className="p-6 rounded-xl backdrop-blur-sm bg-emerald-950/30 border border-emerald-900/20 h-full">
                <h3 className="text-base font-bold text-white mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:compliance@sustanacert.com"
                    className="flex items-start gap-3 text-sm text-slate-300 hover:text-emerald-400 transition-colors group"
                  >
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="font-medium">compliance@sustanacert.com</div>
                      <div className="text-xs text-slate-400">info@sustanacert.com</div>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+971569397516"
                    className="flex items-start gap-3 text-sm text-slate-300 hover:text-emerald-400 transition-colors group"
                  >
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <div className="font-medium">+971 56 939 7516</div>
                    </div>
                  </a>
                  
                  <div className="flex items-start gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="font-medium">2501, Iris Bay, Business Bay,</div>
                      <div className="text-slate-400">Dubai, UAE</div>
                    </div>
                  </div>
                </div>
              </div>
            </HighlighterItem>
          </div>
        </HighlightGroup>

        {/* Bottom Bar with Team Tooltips */}
        <div className="py-6 border-t border-emerald-900/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-sm text-slate-400 text-center lg:text-left">
              © 2026 SUSTAINACERT International. All rights reserved.
            </div>

            {/* SECTION 3: Team Members with Animated Tooltips */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs text-slate-500 font-medium tracking-wide">OUR EXPERT TEAM</span>
              <AnimatedTooltip items={teamMembers} />
            </div>

            {/* Tagline */}
            <div className="text-sm text-slate-400 text-center lg:text-right">
              Global Standards, Trusted Certification
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
