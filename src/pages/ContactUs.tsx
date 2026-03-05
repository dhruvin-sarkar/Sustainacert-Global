import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Layout from '@/layouts/Layout';
import GeographicalPresence from '@/components/sections/GeographicalPresence';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: 'Message sent successfully!',
      description: 'We will get back to you as soon as possible.',
    });
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/technologist-food-processing-factory-controlling-process-apple-fruit-selection-production.jpg.jpeg"
            alt="Food processing facility showing quality control and certification environment"
            className="w-full h-full object-cover"
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
                    <a href="mailto:compliance@sustainacert.com" className="text-muted-foreground hover:text-primary block">
                      compliance@sustainacert.com
                    </a>
                    <a href="mailto:info@sustainacert.com" className="text-muted-foreground hover:text-primary block">
                      info@sustainacert.com
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
                    <a href="tel:+971569397516" className="text-muted-foreground hover:text-primary block">
                      +971 56 939 7516
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
                      2501, Iris Bay, Business Bay,<br />
                      Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GeographicalPresence />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
}
