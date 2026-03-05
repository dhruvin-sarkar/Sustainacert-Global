import { Link } from 'react-router-dom';
import { SocialLinks } from '@/components/ui/social-links';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Particles } from '@/components/ui/highlighter';
import { socialLinksData } from '@/data/social-links';
import { teamMembers } from '@/data/team-members';
import { CONTACT_DETAILS } from '@/constants/contact';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1E1E] text-white overflow-hidden">
      <Particles
        className="absolute inset-0 pointer-events-none opacity-15"
        quantity={60}
        color="#10b981"
        staticity={40}
        ease={60}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-12 border-b border-emerald-500/10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1 max-w-2xl">
              <p className="text-slate-300 leading-relaxed text-sm">
                An independent global certification, inspection, and verification body focused on sustainability, ethical sourcing, and quality assurance across international supply chains.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end mt-16">
              <SocialLinks socials={socialLinksData} />
            </div>
          </div>
        </div>

        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 rounded-2xl h-full transition-all duration-300 backdrop-blur-xl bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40 shadow-lg hover:shadow-emerald-500/20">
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-400 rounded-full"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
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
                      className="text-sm text-slate-300 hover:text-emerald-300 transition-all duration-200 flex items-center group/link hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mr-3 group-hover/link:bg-emerald-400 group-hover/link:scale-125 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative p-6 rounded-2xl h-full transition-all duration-300 backdrop-blur-xl bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40 shadow-lg hover:shadow-emerald-500/20">
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-400 rounded-full"></div>
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'News & Blogs', path: '/news-blogs' },
                  { name: 'Quality Policy', path: '/quality-policy' },
                  { name: 'Apply for Certification', path: '/apply' },
                  { name: 'Verify Certification', path: '/verify' }
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-300 hover:text-emerald-300 transition-all duration-200 flex items-center group/link hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mr-3 group-hover/link:bg-emerald-400 group-hover/link:scale-125 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative p-6 rounded-2xl h-full transition-all duration-300 backdrop-blur-xl bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40 shadow-lg hover:shadow-emerald-500/20">
              <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-400 rounded-full"></div>
                Contact Us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <a href={`mailto:${CONTACT_DETAILS.operationsEmail}`} className="block font-medium hover:text-emerald-300 transition-colors">
                      {CONTACT_DETAILS.operationsEmail}
                    </a>
                    <a href={`mailto:${CONTACT_DETAILS.infoEmail}`} className="block text-xs text-slate-400 hover:text-emerald-300 transition-colors">
                      {CONTACT_DETAILS.infoEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <a href={CONTACT_DETAILS.primaryPhoneHref} className="block font-medium hover:text-emerald-300 transition-colors">
                      {CONTACT_DETAILS.primaryPhone}
                    </a>
                    <a href={CONTACT_DETAILS.secondaryPhoneHref} className="block hover:text-emerald-300 transition-colors">
                      {CONTACT_DETAILS.secondaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">{CONTACT_DETAILS.addressLine1}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{CONTACT_DETAILS.addressLine2}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-emerald-500/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="text-sm text-slate-400 text-center lg:text-left order-2 lg:order-1">
              (c) 2026 SUSTAINACERT International. All rights reserved.
            </div>

            <div className="flex flex-col items-center gap-3 order-1 lg:order-2">
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Our Expert Team</span>
              <AnimatedTooltip items={teamMembers} />
            </div>

            <div className="text-sm text-slate-400 text-center lg:text-right order-3">
              Global Standards, Trusted Certification
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
