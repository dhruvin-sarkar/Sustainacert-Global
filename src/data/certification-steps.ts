export interface CertificationStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon?: string;
  details?: string[];
  estimatedTime?: string;
}

export const certificationSteps: CertificationStep[] = [
  {
    id: 'application',
    number: '01',
    title: 'Application',
    description: 'Submit your application with relevant documentation and scope details.',
    details: [
      'Complete online application form',
      'Define certification scope and objectives',
      'Submit company documentation and quality manuals',
      'Provide organizational structure and processes',
    ],
    estimatedTime: '1-2 business days',
    icon: '📋',
  },
  {
    id: 'document-review',
    number: '02',
    title: 'Document Review',
    description: 'Our team reviews your documentation for completeness and compliance readiness.',
    details: [
      'Comprehensive document analysis by certified auditors',
      'Gap analysis against applicable standards',
      'Pre-audit recommendations and guidance',
      'Identification of areas requiring attention',
    ],
    estimatedTime: '5-10 business days',
    icon: '🔍',
  },
  {
    id: 'audit',
    number: '03',
    title: 'On-site/Remote Audit',
    description: 'Comprehensive audit conducted by qualified assessors at your facilities.',
    details: [
      'Stage 1: Documentation and readiness review',
      'Stage 2: Full system implementation audit',
      'Conducted by internationally certified auditors',
      'Flexible on-site or remote audit options',
    ],
    estimatedTime: '2-5 days (depends on scope)',
    icon: '✅',
  },
  {
    id: 'evaluation',
    number: '04',
    title: 'Compliance Evaluation',
    description: 'Findings are evaluated against the standards and requirements.',
    details: [
      'Detailed analysis of audit findings',
      'Non-conformity identification and classification',
      'Corrective action review and verification',
      'Evidence validation against standard requirements',
    ],
    estimatedTime: '7-14 business days',
    icon: '📊',
  },
  {
    id: 'decision',
    number: '05',
    title: 'Certification Decision',
    description: 'Independent certification decision based on audit findings and evidence.',
    details: [
      'Independent review by certification committee',
      'Impartial decision-making process',
      'Certificate issuance upon successful approval',
      'Entry into international certification registry',
    ],
    estimatedTime: '3-5 business days',
    icon: '🏆',
  },
  {
    id: 'surveillance',
    number: '06',
    title: 'Surveillance & Renewals',
    description: 'Ongoing surveillance audits and periodic recertification to maintain status.',
    details: [
      'Annual surveillance audits to ensure continued compliance',
      'Periodic recertification every 3 years',
      'Continuous improvement monitoring',
      'Support for maintaining certification status',
    ],
    estimatedTime: 'Ongoing (3-year cycle)',
    icon: '🔄',
  },
];
