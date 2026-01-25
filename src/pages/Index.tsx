import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import Layout from '@/layouts/Layout';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import ServicesPreview from '@/components/sections/ServicesPreview';
import CertificationProcess from '@/components/sections/CertificationProcess';
import LatestInsights from '@/components/sections/LatestInsights';
import GeographicalPresence from '@/components/sections/GeographicalPresence';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';
import FAQSection from '@/components/sections/FAQSection';

export default function Index() {
  const [expansionComplete, setExpansionComplete] = useState(false);

  useEffect(() => {
    // Reset on mount
    setExpansionComplete(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* PHASE 1: Full-Screen Scroll Expansion (NO header, NO layout) */}
      {!expansionComplete && (
        <div className="fixed inset-0 z-[9999]">
          <ScrollExpandMedia
            mediaType="video"
            mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
            posterSrc="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
            bgImageSrc="/landscape-shot-green-hills-val-d-orcia-tuscany-italy-gloomy-sky.jpg.jpeg"
            title="GLOBAL STANDARDS TRUSTED CERTIFICATION"
            date="Independent Global Certification Body"
            scrollToExpand="Scroll to Explore Our Services"
            textBlend={false}
            onExpansionComplete={() => setExpansionComplete(true)}
          >
            {/* Content shown during expansion (optional) */}
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-6">Welcome to SUSTAINACERT</h2>
              <p className="text-lg mb-8">
                Independent certification, inspection, and verification services.
              </p>
            </div>
          </ScrollExpandMedia>
        </div>
      )}

      {/* PHASE 2: Main Homepage (WITH header, WITH layout) */}
      {expansionComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Layout>
            {/* Hero Section with video background */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              {/* Background Video (same as expansion video) */}
              <div className="absolute inset-0 z-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
                >
                  <source src="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              {/* Background Pattern Overlay */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
              </div>

              {/* Hero Content */}
              <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
                      <Shield size={16} />
                      Independent Global Certification Body
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                  >
                    <span className="block">GLOBAL STANDARDS</span>
                    <span className="block text-gradient">TRUSTED CERTIFICATION</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
                  >
                    Independent certification, inspection, and verification services enabling sustainable, 
                    ethical, and compliant global supply chains. Building trust across industries worldwide.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
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
            <section className="py-12 bg-slate-900 border-y border-slate-800">
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
                  <div className="flex items-center justify-center h-16 px-8">
                    <img
                      src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop&crop=center"
                      alt="ISO Certification"
                      className="h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center h-16 px-8">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=80&fit=crop&crop=center"
                      alt="Global Standards"
                      className="h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center h-16 px-8">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=80&fit=crop&crop=center"
                      alt="Quality Assurance"
                      className="h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center h-16 px-8">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=80&fit=crop&crop=center"
                      alt="Sustainability"
                      className="h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center h-16 px-8">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop&crop=center"
                      alt="Environmental Standards"
                      className="h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-center h-16 px-8">
                    <img
                      src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=80&fit=crop&crop=center"
                      alt="Compliance"
                      className="h-12 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </InfiniteSlider>
              </div>
            </section>

            {/* About Section */}
            <section className="py-20">
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
                      Our approach is built on transparency, credibility, and excellence—helping businesses 
                      earn trust, meet international expectations, and support a more sustainable world.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {['Independent & Impartial', 'Globally Recognized', 'Sustainability Driven', 'Technology Enabled'].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
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
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-primary rounded-2xl opacity-20 blur-2xl" />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Services Preview */}
            <ServicesPreview />

            {/* Certification Process */}
            <CertificationProcess />

            {/* Latest Insights */}
            <LatestInsights />

            {/* Geographical Presence */}
            <GeographicalPresence />

            {/* Testimonials */}
            <Testimonials />

            {/* Newsletter */}
            <Newsletter />

            {/* FAQ Section */}
            <FAQSection />
          </Layout>
        </motion.div>
      )}
    </>
  );
}
