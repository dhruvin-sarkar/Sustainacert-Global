import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, CheckCircle, Users, Globe, Award } from 'lucide-react';
import Layout from '@/layouts/Layout';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { SectionLoader } from '@/components/ui/skeleton';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';

const GeographicalPresence = lazy(() => import('@/components/sections/GeographicalPresence'));

const teamDomains = [
  'Sustainability',
  'Quality Management',
  'HSE (Health, Safety, Environment)',
  'Responsible Jewellery Council (RJC)',
  'Food Safety',
];

const values = [
  {
    icon: CheckCircle,
    title: 'Integrity',
    description: 'Upholding the highest ethical standards in all our assessments and decisions.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Serving organizations across continents with local expertise and cultural understanding.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering superior certification services that exceed expectations.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Building long-term relationships focused on mutual growth and success.',
  },
];

export default function AboutUs() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/landscape-shot-green-hills-val-d-orcia-tuscany-italy-gloomy-sky.jpg.jpeg"
            alt="Sustainable green landscape in Tuscany"
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Global Standards, <span className="text-emerald-400">Trusted Certification</span>
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              An independent global certification, inspection, and verification body focused on 
              sustainability, ethical sourcing, and quality assurance across international supply chains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                SUSTAINACERT International is an independent global certification, inspection, and 
                verification body committed to advancing sustainability, ethical sourcing, and quality 
                assurance across international supply chains.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our team brings expertise across diverse domains including Sustainability, Quality 
                Management, HSE, Responsible Jewellery Council (RJC), and Food Safety. With headquarters 
                in Dubai and offices/coverage in India, Saudi Arabia, Africa, UK, and USA, we serve 
                multiple industries with tailored services.
              </p>

              <h3 className="font-semibold text-lg mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {teamDomains.map((domain) => (
                  <span
                    key={domain}
                    className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="space-y-8">
              {/* Team Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <OptimizedImage
                  src="/two-researches-man-woman-examine-greenery-with-tablet-all-white-greenhouse.jpg.jpeg"
                  alt="Research team examining sustainable agriculture in greenhouse"
                  className="h-64 w-full"
                  aspectRatio="4/3"
                />
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 border border-border/50 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be a globally trusted partner promoting ethical practices, environmental 
                  responsibility, and transparent trade through rigorous, impartial certification 
                  and verification services.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-card rounded-2xl p-8 border border-border/50 shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower companies to achieve verified sustainability performance through 
                  certification, assurance, and advisory support. We help businesses build 
                  trust, comply with requirements, and contribute to a more sustainable world.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide every decision and interaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover-lift text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[360px]"><SectionLoader /></div>}>
        <GeographicalPresence />
      </Suspense>
      <Testimonials />
      <Newsletter />
    </Layout>
  );
}
