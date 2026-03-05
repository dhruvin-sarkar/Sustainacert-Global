import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfettiButton } from '@/components/ui/confetti';
import Layout from '@/layouts/Layout';
import confetti from 'canvas-confetti';

type VerificationStatus = 'idle' | 'loading' | 'valid' | 'not-found';

interface CertificateData {
  company: string;
  standard: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Suspended';
  certificateId: string;
}

const demoData: Record<string, CertificateData> = {
  'SC-2024-001': {
    company: 'ABC Industries LLC',
    standard: 'ISO 9001:2015',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-14',
    status: 'Active',
    certificateId: 'SC-2024-001',
  },
  'SC-2024-002': {
    company: 'GreenWave Trading',
    standard: 'ISO 14001:2015',
    issueDate: '2024-03-20',
    expiryDate: '2027-03-19',
    status: 'Active',
    certificateId: 'SC-2024-002',
  },
};

export default function Verify() {
  const [certificateId, setCertificateId] = useState('');
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [result, setResult] = useState<CertificateData | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const verifyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 360,
        colors: ['#1e3a8a', '#0f172a', '#334155', '#475569', '#64748b'],
        origin: { y: 0.6 }
      });
    }
  }, [showConfetti]);

  useEffect(() => {
    return () => {
      if (verifyTimeoutRef.current !== null) {
        window.clearTimeout(verifyTimeoutRef.current);
      }
    };
  }, []);

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    const normalizedCertificateId = certificateId.trim().toUpperCase();

    if (verifyTimeoutRef.current !== null) {
      window.clearTimeout(verifyTimeoutRef.current);
    }

    setResult(null);
    setStatus('loading');
    setShowConfetti(false);
    
    // Simulate API call
    verifyTimeoutRef.current = window.setTimeout(() => {
      const data = demoData[normalizedCertificateId];
      if (data) {
        setResult(data);
        setStatus('valid');
        setShowConfetti(true);
      } else {
        setResult(null);
        setStatus('not-found');
      }
      verifyTimeoutRef.current = null;
    }, 1500);
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
              <Shield size={16} />
              Verification Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Verify Your <span className="text-gradient">Certification</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Confirm the validity of a SUSTAINACERT certificate by entering 
              the certificate ID or reference number below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-card"
            >
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <Label htmlFor="certificateId">Certificate ID / Reference Number</Label>
                  <div className="relative mt-2">
                    <Input
                      id="certificateId"
                      value={certificateId}
                      onChange={(e) => {
                        if (verifyTimeoutRef.current !== null) {
                          window.clearTimeout(verifyTimeoutRef.current);
                          verifyTimeoutRef.current = null;
                        }
                        setCertificateId(e.target.value);
                        setStatus('idle');
                        setResult(null);
                        setShowConfetti(false);
                      }}
                      placeholder="e.g., SC-2024-001"
                      className="pr-12"
                      required
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                </div>
                <ConfettiButton 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Verifying...' : 'Verify Certificate'}
                </ConfettiButton>
              </form>

              {/* Demo hint */}
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Demo IDs: SC-2024-001, SC-2024-002
              </p>
            </motion.div>

            {/* Result */}
            {status === 'valid' && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-card rounded-2xl p-8 border-2 border-primary shadow-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">Certificate Valid</h3>
                    <p className="text-sm text-muted-foreground">This certificate is verified and active</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium">{result.company}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Standard</span>
                    <span className="font-medium">{result.standard}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Issue Date</span>
                    <span className="font-medium">{result.issueDate}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">Expiry Date</span>
                    <span className="font-medium">{result.expiryDate}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Status</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {result.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'not-found' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-card rounded-2xl p-8 border-2 border-destructive/50 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-destructive">Certificate Not Found</h3>
                    <p className="text-sm text-muted-foreground">
                      No certificate found with this ID. Please check and try again.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex items-start gap-3 p-4 bg-secondary/50 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This verification portal will be connected to a secure 
                database in Phase 1. Currently showing demonstration data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
