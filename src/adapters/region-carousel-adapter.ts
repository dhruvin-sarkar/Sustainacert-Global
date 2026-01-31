import type { RegionData } from '@/types/region';

// Match the carousel's ImageSet interface
export interface CarouselImageSet {
  step1img1: string;
  step1img2: string;
  step2img1: string;
  step2img2: string;
  step3img: string;
  step4img: string;
  alt: string;
}

// Curated image sets per region (placeholder strategy)
const DEFAULT_REGION_KEY = 'default';
const REGION_IMAGE_SETS: Record<string, CarouselImageSet> = {
  'middle-east': {
    step1img1: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', // Dubai skyline
    step1img2: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80', // Middle East architecture
    step2img1: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80', // Office/certification
    step2img2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', // Business meeting
    step3img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // Modern office
    step4img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // Team collaboration
    alt: 'Middle East Regional Operations',
  },
  'africa': {
    step1img1: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=800&q=80',
    step1img2: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
    step2img1: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    step2img2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    step3img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    step4img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    alt: 'Africa Regional Operations',
  },
  'europe': {
    step1img1: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80',
    step1img2: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&q=80',
    step2img1: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    step2img2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    step3img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    step4img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    alt: 'Europe Regional Operations',
  },
  'south-asia': {
    step1img1: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
    step1img2: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80',
    step2img1: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    step2img2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    step3img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    step4img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    alt: 'South Asia Regional Operations',
  },
  'southeast-asia': {
    step1img1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    step1img2: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
    step2img1: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    step2img2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    step3img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    step4img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    alt: 'Southeast Asia Regional Operations',
  },
  'default': {
    step1img1: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80',
    step1img2: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=800&q=80',
    step2img1: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80',
    step2img2: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    step3img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
    step4img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    alt: 'Regional Operations',
  },
};

export function getRegionImages(regionId: string): CarouselImageSet {
  const normalizedRegionId = regionId.toLowerCase();
  return REGION_IMAGE_SETS[normalizedRegionId] || REGION_IMAGE_SETS[DEFAULT_REGION_KEY];
}

// Adapt RegionData to carousel step content
export interface CarouselStepContent {
  id: string;
  name: string;
  title: string;
  description: string;
}

export function adaptRegionToCarouselSteps(region: RegionData): readonly CarouselStepContent[] {
  return [
    {
      id: '1',
      name: 'Regional Overview',
      title: `${region.name} Operations`,
      description: region.detailedInfo.description,
    },
    {
      id: '2',
      name: 'Office Network',
      title: `${region.detailedInfo.offices.length} Strategic Locations`,
      description: `Our ${region.name} operations span across ${region.detailedInfo.offices.join(', ')}, ensuring local expertise with global standards.`,
    },
    {
      id: '3',
      name: 'Certification Services',
      title: 'Comprehensive Standards',
      description: `We offer ${region.detailedInfo.services.length} certification services including ${region.detailedInfo.services.slice(0, 3).join(', ')}, and more to meet your compliance needs.`,
    },
    {
      id: '4',
      name: 'Get Started',
      title: 'Contact Our Team',
      description: `Ready to begin your certification journey in ${region.name}? Reach out to ${region.detailedInfo.contact.email} or call ${region.detailedInfo.contact.phone} to speak with our experts.`,
    },
  ] as const;
}
