import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Building2, Mail, Globe, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ConfettiButton } from '@/components/ui/confetti';
import Layout from '@/layouts/Layout';

const serviceOptions = [
  'ISO & Management System Certification',
  'Product Inspection & Quality Assurance',
  'GHG & Carbon Footprint Verification',
  'Social Compliance Audits',
  'Organic Certification',
  'Sustainable Agriculture Programs',
  'Training & Capacity Building',
  'Other',
];

export default function Apply() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    country: '',
    service: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      country: '',
      service: '',
      message: '',
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/pharmacy-industry-woman-worker-protective-clothing-operating-production-tablets-sterile-working-conditions.jpg.jpeg"
            alt="Pharmaceutical worker in sterile conditions demonstrating quality certification standards"
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
              <FileCheck size={16} />
              Application Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Apply for <span className="text-emerald-400">Certification</span>
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              Start your certification journey with SUSTAINACERT. Complete the form below 
              and our team will guide you through the process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-card"
            >
              <h2 className="text-2xl font-bold mb-2">Certification Application</h2>
              <p className="text-muted-foreground mb-8">
                Fill in your details and we'll get back to you within 24-48 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 size={16} />
                        Company Name
                      </div>
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      required
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactName">
                      <div className="flex items-center gap-2 mb-2">
                        Contact Name
                      </div>
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail size={16} />
                        Email
                      </div>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe size={16} />
                        Country/Region
                      </div>
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                      placeholder="e.g., UAE, India"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">
                    <div className="flex items-center gap-2 mb-2">
                      Service Interest
                    </div>
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={16} />
                      Message (Optional)
                    </div>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your certification needs..."
                    className="min-h-[120px]"
                  />
                </div>

                <ConfettiButton
                  type="submit"
                  size="lg"
                  className="w-full"
                  confettiOptions={{
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                  }}
                >
                  Submit Application
                </ConfettiButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl">Application Submitted!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for your application. Our team will review your submission 
              and contact you within 24-48 business hours to discuss the next steps.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccess(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
