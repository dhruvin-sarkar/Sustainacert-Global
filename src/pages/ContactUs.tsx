import { lazy, Suspense, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CONTACT_DETAILS } from '@/constants/contact';
import { toast } from '@/hooks/use-toast';
import Layout from '@/layouts/Layout';
import { SectionLoader } from '@/components/ui/skeleton';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';

const GeographicalPresence = lazy(() => import('@/components/sections/GeographicalPresence'));

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;

    const timeout = window.setTimeout(() => setSubmitted(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [submitted]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: 'Message sent successfully!',
      description: 'We will get back to you as soon as possible.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/technologist-food-processing-factory-controlling-process-apple-fruit-selection-production.jpg.jpeg"
            alt="Food processing facility showing quality control and certification environment"
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
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We'd Love to <span className="text-emerald-400">Hear From You</span>
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              Have questions about our certification services? Get in touch with our team
              and we'll help you find the right solution.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="mt-2 min-h-[150px]"
                    placeholder="How can we help you?"
                  />
                </div>
                <Button type="submit" size="lg" disabled={submitted} className="w-full sm:w-auto">
                  {submitted ? (
                    <>
                      <CheckCircle size={18} className="mr-2" />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-semibold leading-tight">Email</h3>
                    <a href={`mailto:${CONTACT_DETAILS.operationsEmail}`} className="text-muted-foreground hover:text-primary block">
                      {CONTACT_DETAILS.operationsEmail}
                    </a>
                    <a href={`mailto:${CONTACT_DETAILS.infoEmail}`} className="text-muted-foreground hover:text-primary block">
                      {CONTACT_DETAILS.infoEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-semibold leading-tight">Phone</h3>
                    <a href={CONTACT_DETAILS.primaryPhoneHref} className="text-muted-foreground hover:text-primary block">
                      {CONTACT_DETAILS.primaryPhone}
                    </a>
                    <a href={CONTACT_DETAILS.secondaryPhoneHref} className="text-muted-foreground hover:text-primary block">
                      {CONTACT_DETAILS.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold leading-tight">Address</h3>
                    <p className="text-base leading-7 text-muted-foreground">
                      {CONTACT_DETAILS.addressLine1}<br />
                      {CONTACT_DETAILS.addressLine2}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a href={CONTACT_DETAILS.mapUrl} target="_blank" rel="noreferrer">
                        Open in Google Maps
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft md:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight">Office Map</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                      Live Google Maps view of our Dubai office location.
                    </p>
                  </div>
                  <a
                    href={CONTACT_DETAILS.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Get directions
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                  <iframe
                    title="Sustainacert Dubai Office Map"
                    src={CONTACT_DETAILS.mapEmbedUrl}
                    className="h-[320px] w-full md:h-[360px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
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
