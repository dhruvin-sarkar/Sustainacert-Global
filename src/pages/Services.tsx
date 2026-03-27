import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BaseCard } from '@/components/ui/base-card';
import OptimizedImage from '@/components/ui/OptimizedImage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Layout from '@/layouts/Layout';
import Newsletter from '@/components/sections/Newsletter';
import { serviceCategories, featuredServices } from '@/data/services';

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/interior-view-steel-factory.jpg.jpeg"
            alt="Modern steel factory interior showing industrial certification environment"
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
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Core <span className="text-emerald-400">Services</span>
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              Comprehensive certification, inspection, and verification services 
              tailored to your industry and sustainability goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
            <p className="text-muted-foreground text-lg">
              Explore our specialized certification solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group block h-full">
                  <BaseCard className="p-0 h-full flex flex-col overflow-hidden border-white/35 dark:border-emerald-300/20 bg-white/35 dark:bg-white/5 backdrop-blur-xl shadow-[0_12px_32px_rgba(16,185,129,0.12)] transition-all duration-300 hover:border-emerald-300/45">
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      {(() => {
                        const imageMap = {
                          0: "/two-researches-man-woman-examine-greenery-with-tablet-all-white-greenhouse.jpg.jpeg",
                          1: "/interior-view-steel-factory.jpg.jpeg",
                          2: "/technologist-food-processing-factory-controlling-process-apple-fruit-selection-production.jpg.jpeg"
                        };
                        return (
                          <OptimizedImage
                            src={imageMap[index as keyof typeof imageMap]}
                            alt={`${service.title} - Professional certification environment`}
                            className="h-48 w-full"
                            aspectRatio="4/3"
                          />
                        );
                      })()}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    
                    {/* Service Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
                        <service.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-xl mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed flex-1">
                        {service.description}
                      </p>
                    </div>
                  </BaseCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Complete Service Catalog</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our full range of certification and assurance services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={category.id}
                    className="bg-card rounded-xl border border-border/50 shadow-soft px-6"
                  >
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                      {category.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="space-y-6">
                        {category.services.map((service) => (
                          <div key={service.id}>
                            <h4 className="font-medium mb-3">{service.title}</h4>
                            <p className="text-muted-foreground text-sm mb-4">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.items.map((item) => (
                                <span
                                  key={item}
                                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gable-green to-casal rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-tiara mb-4">
              Ready to Get Certified?
            </h2>
            <p className="text-gothic text-lg mb-8 max-w-2xl mx-auto">
              Start your certification journey today. Our team is ready to guide you 
              through the process and find the right solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-mountain-meadow hover:bg-jungle-green text-gable-green">
                <Link to="/apply">
                  Apply for Certification
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-tiara/30 text-tiara hover:bg-tiara/10">
                <Link to="/contact-us">Contact Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </Layout>
  );
}
