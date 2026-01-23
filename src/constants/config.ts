export const APP_CONFIG = {
  name: 'SUSTAINACERT',
  email: 'info@sustainacert.com',
  phone: '+971 4 XXX XXXX',
  address: 'Dubai, UAE',
  description: 'Global Standards. Trusted Certification.',
  social: {
    linkedin: 'https://linkedin.com/company/sustainacert',
    twitter: 'https://twitter.com/sustainacert',
    instagram: 'https://instagram.com/sustainacert',
  },
} as const;

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
