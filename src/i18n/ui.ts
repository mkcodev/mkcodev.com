import type { Lang } from '../data/site';

export const ui = {
  es: {
    'nav.projects': 'proyectos',
    'nav.how': 'cómo trabajo',
    'nav.timeline': 'trayectoria',
    'nav.about': 'sobre mí',
    'nav.uses': 'uses',
    'nav.contact': 'contacto',
    'nav.downloadCv': '[ descargar_cv ]',
    'nav.available': 'Disponible · open to work',
    'nav.menuLabel': 'Abrir menú',
    'nav.closeMenuLabel': 'Cerrar menú',
    'nav.langLabel': 'Switch to English',
    'hero.viewProjects': '[ ver_proyectos ]',
    'hero.contact': '→ ./contactar',
    'section.projects': '// 01 — proyectos',
    'section.how': '// 02 — cómo trabajo',
    'section.timeline': '// 03 — git log',
    'section.about': '// 04 — sobre mí',
    'section.certs': '// 05 — certificaciones',
    'section.contact': '// 06 — contacto',
    'footer.builtWith': 'Built with Astro',
    'footer.lastCommit': 'último commit',
    'footer.machineReadable': 'este CV también es legible por máquinas',
    'footer.hint': 'psst… prueba ? o el código Konami',
    'skip.content': 'Saltar al contenido',
    'meta.home.title': 'Mikel Salvador — Full Stack Developer · React, Next.js, Astro',
    'meta.home.description':
      'Full Stack Developer en Bilbao. React, Next.js, Astro y TypeScript con SEO técnico y Core Web Vitals. Del diseño en Figma al deploy.',
  },
  en: {
    'nav.projects': 'projects',
    'nav.how': 'how I work',
    'nav.timeline': 'timeline',
    'nav.about': 'about',
    'nav.uses': 'uses',
    'nav.contact': 'contact',
    'nav.downloadCv': '[ download_cv ]',
    'nav.available': 'Available · open to work',
    'nav.menuLabel': 'Open menu',
    'nav.closeMenuLabel': 'Close menu',
    'nav.langLabel': 'Cambiar a español',
    'hero.viewProjects': '[ view_projects ]',
    'hero.contact': '→ ./contact',
    'section.projects': '// 01 — projects',
    'section.how': '// 02 — how I work',
    'section.timeline': '// 03 — git log',
    'section.about': '// 04 — about',
    'section.certs': '// 05 — certifications',
    'section.contact': '// 06 — contact',
    'footer.builtWith': 'Built with Astro',
    'footer.lastCommit': 'last commit',
    'footer.machineReadable': 'this CV is also machine-readable',
    'footer.hint': 'psst… try ? or the Konami code',
    'skip.content': 'Skip to content',
    'meta.home.title': 'Mikel Salvador — Full Stack Developer · React, Next.js, Astro',
    'meta.home.description':
      'Full Stack Developer in Bilbao. React, Next.js, Astro and TypeScript with technical SEO and Core Web Vitals. From Figma design to deploy.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key];
  };
}
