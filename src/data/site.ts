// Única fuente de verdad del sitio — cambiar dominio = editar SITE_URL
export const SITE_URL = 'https://mkcodev.com';

// Rutas excluidas del sitemap (noindex). Mantener sincronizado con las
// páginas que pasan noIndex a Base.astro.
export const NOINDEX_PATHS = ['/en/blog'];

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
  email: 'info@mkcodev.com',
  phone: '+34644801966',
  phoneDisplay: '644 801 966',
  addressLocality: 'Basauri',
  addressRegion: 'Bizkaia',
  areaServed: ['Bilbao', 'Gran Bilbao', 'Basauri', 'Zamora'],
  github: 'https://github.com/mkcodev',
  linkedin: 'https://www.linkedin.com/in/mkcodev',
  cvPath: '/cv-mikel-salvador.pdf',
  themeColor: '#0A0F0F',
  ogImage: '/og/home.png',
} as const;

export type Lang = 'es' | 'en';
