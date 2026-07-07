// Única fuente de verdad del sitio — cambiar dominio = editar SITE_URL
export const SITE_URL = 'https://mkcodev.vercel.app';

export const SITE = {
  name: 'mkcodev',
  author: 'Mikel Salvador García',
  role: {
    es: 'Full Stack Developer — React · Next.js · Astro',
    en: 'Full Stack Developer — React · Next.js · Astro',
  },
  tagline: {
    es: 'Diseño, código, rendimiento y SEO: el ciclo completo de un producto web.',
    en: 'Design, code, performance and SEO: the full life of a web product.',
  },
  location: 'Bilbao, Spain',
  email: 'maikcode@protonmail.com',
  github: 'https://github.com/mkcodev',
  linkedin: 'https://www.linkedin.com/in/mkcodev',
  cvPath: '/cv-mikel-salvador.pdf',
  themeColor: '#0A0F0F',
  ogImage: '/og/home.png',
} as const;

export type Lang = 'es' | 'en';
