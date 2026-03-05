import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, FileCheck, CheckCircle, Award, Leaf, Globe, Monitor, Lock } from 'lucide-react';
import Layout from '@/layouts/Layout';
import CertificationProcess from '@/components/sections/CertificationProcess';
import { SectionLoader } from '@/components/ui/skeleton';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';

const GeographicalPresence = lazy(() => import('@/components/sections/GeographicalPresence'));

const qualityCommitments = [
  'Adherence to international standards and regulations',
  'Continuous improvement in all processes and services',
  'Culture of excellence, objectivity, and ethics',
  'Empower teams with training and innovation',
  'Long-term partnerships for responsible growth',
];

const whySustainacert = [
  {
    icon: Lock,
    title: 'Independent & Impartial',
    description: 'Objective assessments free from conflicts of interest, ensuring credible certification decisions.',
  },
  {
    icon: Leaf,
    title: 'Sustainability Driven',
    description: 'Deep expertise in sustainability standards and frameworks across industries.',
  },
  {
    icon: Globe,
    title: 'Globally Recognized',
    description: 'Accredited services recognized by international bodies and major markets.',
  },
  {
    icon: Scale,
    title: 'Transparent Processes',
    description: 'Clear, documented procedures with full visibility at every stage.',
  },
  {
    icon: Monitor,
    title: 'Technology Enabled',
    description: 'Paperless audits, digital reporting, and secure client portals for efficiency.',
  },
];

export default function QualityPolicy() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              Quality Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Commitment to <span className="text-gradient">Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Rigorous quality standards, impartial assessments, and transparent processes 
              that form the foundation of trusted certification.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Quality Commitment</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                SUSTAINACERT maintains the highest standards of quality in all certification, 
                inspection, and verification activities. Our commitment encompasses:
              </p>
              <ul className="space-y-4">
                {qualityCommitments.map((commitment, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{commitment}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-4">Impartiality Statement</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SUSTAINACERT is committed to independence, objectivity, and neutrality in all 
                certification activities. Our decisions are based solely on objective evidence 
                and assessment findings.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Governance structures to manage conflicts of interest
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Separation from consultancy services
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Ongoing training for all personnel
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Regular reviews for transparency
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appeals & Complaints */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileCheck className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Appeals & Complaints</h2>
              <p className="text-muted-foreground text-lg">
                We maintain an accessible, fair process for addressing concerns
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 border border-border/50"
              >
                <h3 className="font-semibold text-lg mb-3">Appeals Process</h3>
                <p className="text-muted-foreground text-sm">
                  Appeals are reviewed by qualified staff not involved in the original 
                  decision, ensuring objective reconsideration of certification outcomes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl p-6 border border-border/50"
              >
                <h3 className="font-semibold text-lg mb-3">Complaints Handling</h3>
                <p className="text-muted-foreground text-sm">
                  Complaints are handled confidentially with thorough investigation 
                  and appropriate corrective actions to prevent recurrence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sustainacert */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Sustainacert</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The qualities that set our certification services apart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whySustainacert.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CertificationProcess />
      <Suspense fallback={<div className="min-h-[360px]"><SectionLoader /></div>}>
        <GeographicalPresence />
      </Suspense>
      <Testimonials />
      <Newsletter />
    </Layout>
  );
}
