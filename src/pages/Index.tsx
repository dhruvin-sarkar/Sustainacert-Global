import { useState, useEffect, useRef, lazy, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import Layout from '@/layouts/Layout';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { SectionLoader } from '@/components/ui/skeleton';

const HERO_VIDEO_URL = '/hero_video.mp4';
const HERO_POSTER_URL = '/landscape-shot-green-hills-val-d-orcia-tuscany-italy-gloomy-sky.jpg.jpeg';
const HERO_EXPANSION_SEEN_KEY = 'sustainacert.heroExpansionSeen';

// Lazy load below-the-fold sections for better initial load performance
const ServicesPreview = lazy(() => import('@/components/sections/ServicesPreview'));
const CertificationProcess = lazy(() => import('@/components/sections/CertificationProcess'));
const LatestInsights = lazy(() => import('@/components/sections/LatestInsights'));
const GeographicalPresence = lazy(() => import('@/components/sections/GeographicalPresence'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const Newsletter = lazy(() => import('@/components/sections/Newsletter'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));

// Memoize trusted partners data to prevent recreation on every render
const trustedPartners = [
  { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop&crop=center", alt: "ISO Certification" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop&crop=center", alt: "Global Standards" },
  { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=80&fit=crop&crop=center", alt: "Quality Assurance" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=80&fit=crop&crop=center", alt: "Sustainability" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop&crop=center", alt: "Environmental Standards" },
  { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=80&fit=crop&crop=center", alt: "Compliance" },
];

const companyValues = ['Independent & Impartial', 'Globally Recognized', 'Sustainability Driven', 'Technology Enabled'];

export default function Index() {
  const [hasSeenHeroExpansion, setHasSeenHeroExpansion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(HERO_EXPANSION_SEEN_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [expansionComplete, setExpansionComplete] = useState<boolean>(hasSeenHeroExpansion);
  const [showHeroContent, setShowHeroContent] = useState<boolean>(hasSeenHeroExpansion);
  const [heroTitle, setHeroTitle] = useState<string>("");
  const [heroDate, setHeroDate] = useState<string>("");
  const heroContentTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const head = document.head;

    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'video';
    preload.href = HERO_VIDEO_URL;

    head.appendChild(preload);

    return () => {
      head.removeChild(preload);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (heroContentTimeoutRef.current !== null) {
        window.clearTimeout(heroContentTimeoutRef.current);
      }
    };
  }, []);

  const handleExpansionComplete = () => {
    setExpansionComplete(true);
    if (!hasSeenHeroExpansion) {
      setHasSeenHeroExpansion(true);
      try {
        window.localStorage.setItem(HERO_EXPANSION_SEEN_KEY, 'true');
      } catch {
        // Ignore storage failures and continue normal UX
      }
    }
    if (heroContentTimeoutRef.current !== null) {
      window.clearTimeout(heroContentTimeoutRef.current);
    }

    heroContentTimeoutRef.current = window.setTimeout(() => {
      setShowHeroContent(true);
      heroContentTimeoutRef.current = null;
    }, 300);
  };

  const handleTextReady = (title: string, date: string) => {
    setHeroTitle(title);
    setHeroDate(date);
  };

  // Memoize partner slides to prevent recreation
  const partnerSlides = useMemo(() => 
    trustedPartners.map((partner, index) => (
      <div key={index} className="flex items-center justify-center h-16 px-8">
        <img
          src={partner.src}
          alt={partner.alt}
          className="h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
          loading="lazy"
        />
      </div>
    )),
    []
  );

  // Memoize value items
  const valueItems = useMemo(() => 
    companyValues.map((item) => (
      <div key={item} className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
        <span className="text-sm font-medium">{item}</span>
      </div>
    )),
    []
  );

  return (
    <>
      {/* PHASE 1: Scroll Expansion Overlay (fades out after completion) */}
      <AnimatePresence>
        {!expansionComplete && (
          <motion.div
            className="fixed inset-0 z-50"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <ScrollExpandMedia
              mediaType="video"
              mediaSrc={HERO_VIDEO_URL}
              posterSrc={HERO_POSTER_URL}
              bgImageSrc="/landscape-shot-green-hills-val-d-orcia-tuscany-italy-gloomy-sky.jpg.jpeg"
              title="GLOBAL STANDARDS TRUSTED CERTIFICATION"
              date="Independent Global Certification Body"
              scrollToExpand="Scroll to Explore Our Services"
              textBlend={false}
              onExpansionComplete={handleExpansionComplete}
              onTextReady={handleTextReady}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: Homepage Content (fades in over video) */}
      <AnimatePresence>
        {showHeroContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="relative z-10"
          >
            <Layout>
              <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                    poster={HERO_POSTER_URL}
                  >
                    <source src={HERO_VIDEO_URL} type="video/mp4" />
                  </video>
                </div>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 z-0 bg-black/40" />
                
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 z-0 opacity-30">
                  <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
                  <div className="max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05, duration: 0.3 }}
                    >
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
                        <Shield size={16} />
                        {heroDate || "Independent Global Certification Body"}
                      </div>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-[0_2px_12px_rgba(6,95,70,0.45)]"
                    >
                      {heroTitle && (
                        <>
                          <span className="block text-emerald-200">{heroTitle.split(' ').slice(0, 2).join(' ')}</span>
                          <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                            {heroTitle.split(' ').slice(2).join(' ')}
                          </span>
                        </>
                      ) || (
                        <>
                          <span className="block text-emerald-200">GLOBAL STANDARDS</span>
                          <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                            TRUSTED CERTIFICATION
                          </span>
                        </>
                      )}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="text-xl text-emerald-100/90 max-w-2xl mb-10 leading-relaxed"
                    >
                      Independent certification, inspection, and verification services enabling sustainable, 
                      ethical, and compliant global supply chains. Building trust across industries worldwide.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <Button size="lg" asChild className="text-base px-8">
                        <Link to="/apply">
                          Apply for Certification
                          <ArrowRight className="ml-2" size={18} />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild className="text-base px-8">
                        <Link to="/verify">
                          Verify Your Certification
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Trusted Partners Slider */}
              <section className="py-12 bg-slate-900 border-y border-slate-800 relative z-20">
                <div className="container mx-auto px-4 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                  >
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">
                      Trusted by Industry Leaders Worldwide
                    </h3>
                  </motion.div>
                  <InfiniteSlider gap={32} duration={30} reverse className="w-full">
                    {partnerSlides}
                  </InfiniteSlider>
                </div>
              </section>

              {/* About Section */}
              <section className="py-20 relative z-20 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        About Us
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Building Trust Through Independent Verification
                      </h2>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        SUSTAINACERT is an independent global certification, inspection, and verification body 
                        advancing sustainability, ethical sourcing, and quality assurance across international 
                        supply chains.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        Our approach is built on transparency, credibility, and excellence-helping businesses 
                        earn trust, meet international expectations, and support a more sustainable world.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {valueItems}
                      </div>

                      <Button asChild>
                        <Link to="/about-us">
                          Learn More About Us
                          <ArrowRight className="ml-2" size={16} />
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <div className="aspect-square rounded-3xl overflow-hidden">
                        <img 
                          src="/two-researches-man-woman-examine-greenery-with-tablet-all-white-greenhouse.jpg.jpeg"
                          alt="Professional research team in modern business environment"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-primary rounded-2xl opacity-20 blur-2xl" />
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* All remaining sections with bg-background to cover video */}
              <div className="relative z-20 bg-background">
                <Suspense fallback={<SectionLoader />}>
                  <ServicesPreview />
                </Suspense>
                
                <Suspense fallback={<SectionLoader />}>
                  <CertificationProcess />
                </Suspense>
                
                <Suspense fallback={<SectionLoader />}>
                  <LatestInsights />
                </Suspense>
                
                <Suspense fallback={<SectionLoader />}>
                  <GeographicalPresence />
                </Suspense>
                
                <Suspense fallback={<SectionLoader />}>
                  <Testimonials />
                </Suspense>
                
                <Suspense fallback={<SectionLoader />}>
                  <Newsletter />
                </Suspense>
                
                <Suspense fallback={<SectionLoader />}>
                  <FAQSection />
                </Suspense>
              </div>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
