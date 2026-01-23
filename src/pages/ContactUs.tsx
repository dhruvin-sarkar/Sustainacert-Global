import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
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

  const handleSubmit = (e: React.FormEvent) => {
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
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We'd Love to <span className="text-gradient">Hear From You</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our certification services? Get in touch with our team 
              and we'll help you find the right solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
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

            {/* Contact Info */}
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
                    <h3 className="font-semibold mb-2">Email</h3>
                    <a href="mailto:compliance@sustanacert.com" className="text-muted-foreground hover:text-primary block">
                      compliance@sustanacert.com
                    </a>
                    <a href="mailto:info@sustanacert.com" className="text-muted-foreground hover:text-primary block">
                      info@sustanacert.com
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
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <a href="tel:+971569397516" className="text-muted-foreground hover:text-primary">
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
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      2501, Iris Bay, Business Bay,<br />
                      Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-secondary/50 rounded-2xl aspect-[16/9] flex items-center justify-center border border-border/50">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Business Bay, Dubai</p>
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
