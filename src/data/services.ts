import { Award, Shield, Leaf, Search, GraduationCap, Factory, Recycle, Footprints } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: typeof Award;
  items: string[];
  link?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

export const featuredServices = [
  {
    id: 'iso-management',
    title: 'ISO & Management System Certification',
    description: 'Comprehensive certification services for ISO 9001, 14001, 45001, 22000, 27001, and more. Structured audits, gap analysis, and ongoing surveillance.',
    icon: Award,
    link: '/services/iso-management-systems',
  },
  {
    id: 'product-inspection',
    title: 'Product Inspection & Quality Assurance',
    description: 'On-site inspections aligned with ISO/IEC 17020, pre-production to final random inspection, defect grading, and corrective action follow-up.',
    icon: Search,
    link: '/services/product-inspection-qa',
  },
  {
    id: 'ghg-carbon',
    title: 'GHG & Carbon Footprint Verification',
    description: 'GHG inventory verification, carbon footprint assessment, SBTi readiness support, and evidence-based emissions reporting across all scopes.',
    icon: Footprints,
    link: '/services/ghg-carbon-verification',
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'product-process-certification',
    title: 'Product/Process Certification',
    services: [
      {
        id: 'organic',
        title: 'Organic Certification Schemes',
        shortTitle: 'Organic',
        description: 'Comprehensive organic certification across major global standards',
        icon: Leaf,
        items: ['IFOAM', 'EU Organic Regulation', 'USDA-NOP', 'JAS', 'OCS', 'GOTS'],
      },
      {
        id: 'environmental',
        title: 'Environmental & Sustainability Standards',
        shortTitle: 'Environmental',
        description: 'Environmental management and sustainability certifications',
        icon: Recycle,
        items: [
          'ISO 14001',
          'Carbon Footprint Verification',
          'Water Stewardship Assessment',
          'GRS',
          'Recycled Claim Standard',
          'Responsible Wool/Down/Alpaca/Mohair',
          'PEFC',
          'Better Cotton 3PV CoC',
          'Ocean Bound Plastic Certification',
        ],
      },
      {
        id: 'food-safety',
        title: 'Food Safety Standards',
        shortTitle: 'Food Safety',
        description: 'Food safety management system certifications',
        icon: Shield,
        items: ['ISO 22000', 'HACCP', 'FSSC 22000'],
      },
      {
        id: 'management-systems',
        title: 'Management Systems',
        shortTitle: 'Management',
        description: 'Quality and management system certifications',
        icon: Award,
        items: ['ISO 9001', 'GMP', 'GLP', 'ISO 27001', 'ISO 50001', 'ISO 13485', 'ISO 28000'],
      },
    ],
  },
  {
    id: 'social-compliance',
    title: 'Social Compliance Audits',
    services: [
      {
        id: 'social-audits',
        title: 'Social Compliance Auditing',
        shortTitle: 'Social Audits',
        description: 'Comprehensive social compliance and ethical auditing services',
        icon: Shield,
        items: [
          'SMETA',
          'SA8000',
          'BSCI',
          'Social Security Audit',
          'Sustainacert Genetic Code of Ethics Audit',
        ],
      },
    ],
  },
  {
    id: 'inspection-verification',
    title: 'Inspection & Verification Services',
    services: [
      {
        id: 'inspections',
        title: 'Inspection Services',
        shortTitle: 'Inspections',
        description: 'Comprehensive inspection and verification across supply chains',
        icon: Search,
        items: [
          'Farm inspections',
          'Factory inspections',
          'Supply chain inspections',
          'Pre-shipment inspections',
          'Documentary verification for traceability',
          'Customized audits',
        ],
      },
    ],
  },
  {
    id: 'sustainable-agriculture',
    title: 'Sustainable Agriculture & Supply Chain Programs',
    services: [
      {
        id: 'agriculture-programs',
        title: 'Agriculture & Supply Chain',
        shortTitle: 'Agriculture',
        description: 'Agricultural and supply chain sustainability programs',
        icon: Leaf,
        items: ['GlobalG.A.P', 'GRASP add-on', 'Rainforest Alliance / Fair Trade support', 'C-TPAT', 'SLCP'],
      },
    ],
  },
  {
    id: 'training',
    title: 'Training & Capacity Building',
    services: [
      {
        id: 'training-services',
        title: 'Professional Training',
        shortTitle: 'Training',
        description: 'Capacity building and professional development programs',
        icon: GraduationCap,
        items: [
          'Internal auditors/quality managers training',
          'Organic production & food safety implementation',
          'Traceability & documentation systems',
          'Transition to sustainable models',
          'ISO 17025/17020/17021/17065 competence',
        ],
      },
    ],
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Application',
    description: 'Submit your application with relevant documentation and scope details.',
  },
  {
    number: '02',
    title: 'Document Review',
    description: 'Our team reviews your documentation for completeness and compliance readiness.',
  },
  {
    number: '03',
    title: 'On-site/Remote Audit',
    description: 'Comprehensive audit conducted by qualified assessors at your facilities.',
  },
  {
    number: '04',
    title: 'Compliance Evaluation',
    description: 'Findings are evaluated against the relevant standards and requirements.',
  },
  {
    number: '05',
    title: 'Certification Decision',
    description: 'Independent certification decision based on audit findings and evidence.',
  },
  {
    number: '06',
    title: 'Surveillance & Renewals',
    description: 'Ongoing surveillance audits and periodic recertification to maintain status.',
  },
];
