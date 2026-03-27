export const ROUTES = {
  HOME: '/',
  ABOUT: '/about-us',
  SERVICES: '/services',
  CONTACT: '/contact-us',
  VERIFY: '/verify',
  APPLY: '/apply',
  NEWS: '/news-blogs',
  QUALITY_POLICY: '/quality-policy',
} as const;

export type RouteKey = keyof typeof ROUTES;
