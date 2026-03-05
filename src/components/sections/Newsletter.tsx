import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ConfettiButton } from '@/components/ui/confetti';
import { toast } from '@/hooks/use-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!submitted) return;
    const timeout = window.setTimeout(() => setSubmitted(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [submitted]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast({
        title: 'Successfully subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setEmail('');
    }
  }, [email]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gable-green to-casal text-tiara">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={
            shouldReduceMotion
              ? undefined
              : isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
          }
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-mountain-meadow/20 text-mountain-meadow px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Mail size={16} />
            Stay Informed
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          
          <p className="text-gothic text-lg mb-8">
            Get updates on global certification standards, sustainability insights, 
            and industry best practices - directly to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
              className="flex-1 bg-tiara/10 border-tiara/20 text-tiara placeholder:text-gothic focus:border-mountain-meadow"
            />
            <ConfettiButton
              type="submit"
              disabled={submitted}
              className="bg-mountain-meadow hover:bg-jungle-green text-gable-green font-semibold"
              options={
                shouldReduceMotion
                  ? { particleCount: 0, spread: 0, colors: [], origin: { y: 0.7 } }
                  : {
                      particleCount: 80,
                      spread: 60,
                      colors: ['#22c55e', '#16a34a', '#1e3a8a', '#15803d'],
                      origin: { y: 0.7 },
                    }
              }
            >
              {submitted ? (
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Subscribed
                </>
              ) : (
                'Subscribe'
              )}
            </ConfettiButton>
          </form>

          <p className="text-gothic/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
