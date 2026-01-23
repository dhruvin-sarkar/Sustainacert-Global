import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import Layout from '@/components/layout/Layout';
import ServicesPreview from '@/components/sections/ServicesPreview';
import CertificationProcess from '@/components/sections/CertificationProcess';
import LatestInsights from '@/components/sections/LatestInsights';
import GeographicalPresence from '@/components/sections/GeographicalPresence';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';

const credibilityStats = [
  { label: 'Certifications Issued', value: '5,000+' },
  { label: 'Countries Served', value: '50+' },
  { label: 'Years of Excellence', value: '10+' },
  { label: 'Expert Auditors', value: '200+' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

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

      {/* Credibility Band */}
      <section className="py-8 bg-gable-green">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {credibilityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-mountain-meadow mb-1">
                  {stat.value}
                </div>
                <div className="text-gothic text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/5 to-accent/10 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {[Globe, Shield, CheckCircle, ArrowRight].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="aspect-square rounded-2xl bg-card shadow-card flex items-center justify-center border border-border/50"
                    >
                      <Icon className="w-10 h-10 text-primary" />
                    </motion.div>
                  ))}
                </div>
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
    </Layout>
  );
}
