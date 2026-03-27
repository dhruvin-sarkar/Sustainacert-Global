export interface Certificate {
  id: string;
  company_name: string;
  standard: string;
  issue_date: string;
  expiry_date: string;
  status: 'active' | 'expired' | 'revoked';
  certificate_pdf_url?: string;
  notes?: string;
}

export interface CertificateVerification {
  certificate: Certificate;
  is_valid: boolean;
  verification_date: string;
}

export interface CreateCertificateDto {
  company_name: string;
  standard: string;
  contact_email: string;
  contact_phone: string;
  business_type: string;
  description: string;
}
