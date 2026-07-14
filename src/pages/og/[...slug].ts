import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { SITE } from '../../data/site';
import { flagships } from '../../data/projects';
import { services } from '../../data/services';

interface OGPage {
  title: string;
  description: string;
}

const blogPosts = await getCollection('blog', ({ data }) => !data.draft && data.lang === 'es');

const pages: Record<string, OGPage> = {
  home: { title: SITE.author, description: SITE.tagline.es },
  'home-en': { title: SITE.author, description: SITE.tagline.en },
  uses: { title: '~/uses', description: `Setup y herramientas de ${SITE.author}` },
  'uses-en': { title: '~/uses', description: `${SITE.author}'s setup and tools` },
  ...Object.fromEntries(
    flagships.flatMap((p) => [
      [p.slug, { title: `${p.title} — case study`, description: p.description.es }],
      [`${p.slugEn}-en`, { title: `${p.title} — case study`, description: p.description.en }],
    ]),
  ),
  servicios: {
    title: '~/servicios',
    description:
      'Diseño web, tiendas online, SEO, mantenimiento, IA y marca personal. Precios claros y presupuesto cerrado.',
  },
  ...Object.fromEntries(
    services.map((s) => [`servicios-${s.slug}`, { title: s.title, description: s.cardDesc }]),
  ),
  'diseno-web-bilbao': {
    title: 'Diseño web en Bilbao',
    description:
      'Desarrollador web freelance en el Gran Bilbao. Webs a medida con SEO local y reuniones presenciales.',
  },
  'diseno-web-zamora': {
    title: 'Diseño web en Zamora',
    description:
      'Páginas web para negocios de Zamora. SEO local, Kit Digital y atención cercana, de un zamorano.',
  },
  blog: {
    title: '~/blog',
    description: 'Notas sobre desarrollo web, rendimiento, SEO técnico y animación.',
  },
  ...Object.fromEntries(
    blogPosts.map((p) => [
      `blog-${p.id}`,
      { title: p.data.title, description: p.data.description },
    ]),
  ),
  'aviso-legal': {
    title: 'Aviso legal',
    description: 'Datos identificativos del titular y condiciones de uso de mkcodev.com.',
  },
  privacidad: {
    title: 'Política de privacidad',
    description:
      'Qué datos se recogen en mkcodev.com, con qué finalidad y cómo ejercer tus derechos.',
  },
  cookies: {
    title: 'Política de cookies',
    description: 'Qué cookies usa mkcodev.com y cómo cambiar tu decisión de consentimiento.',
  },
};

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getSlug: (path) => `${path}.png`,
  getImageOptions: (_path, page: OGPage) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [10, 15, 15],
      [7, 11, 11],
    ],
    border: { color: [0, 219, 213], width: 10, side: 'block-end' },
    padding: 72,
    logo: { path: './src/assets/logo-mkcodev.png', size: [96] },
    font: {
      title: {
        families: ['Space Grotesk'],
        weight: 'Bold',
        size: 72,
        color: [230, 241, 240],
      },
      description: {
        families: ['JetBrains Mono'],
        size: 32,
        lineHeight: 1.5,
        color: [138, 160, 158],
      },
    },
    fonts: [
      'https://api.fontsource.org/v1/fonts/space-grotesk/latin-700-normal.ttf',
      'https://api.fontsource.org/v1/fonts/jetbrains-mono/latin-400-normal.ttf',
    ],
  }),
});
