import type { Lang } from '../data/site';

/**
 * Mapa explícito de pares de rutas ES ↔ EN.
 * El toggle de idioma SIEMPRE lleva a la página equivalente, nunca al home.
 * Al añadir una página nueva: añadir su par aquí.
 */
const esToEn: Record<string, string> = {
  '/': '/en',
  '/proyectos/geko-marketing': '/en/projects/geko-marketing',
  '/proyectos/total-muscle': '/en/projects/total-muscle',
  '/uses': '/en/uses',
  '/blog': '/en/blog',
};

const enToEs: Record<string, string> = Object.fromEntries(
  Object.entries(esToEn).map(([es, en]) => [en, es]),
);

function normalize(path: string): string {
  const clean = path.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function langFromPath(path: string): Lang {
  const p = normalize(path);
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'es';
}

/** Ruta equivalente en el otro idioma. Fallback: home del idioma destino. */
export function alternatePath(path: string): string {
  const p = normalize(path);
  if (langFromPath(p) === 'es') return esToEn[p] ?? '/en';
  return enToEs[p] ?? '/';
}

/** Par (es, en) para hreflang de la página actual. */
export function hreflangPair(path: string): { es: string; en: string } {
  const p = normalize(path);
  if (langFromPath(p) === 'es') return { es: p, en: esToEn[p] ?? '/en' };
  return { es: enToEs[p] ?? '/', en: p };
}
