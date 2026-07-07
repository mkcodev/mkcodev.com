import type { Lang } from './site';

export interface TimelineCommit {
  hash: string;
  message: Record<Lang, string>;
  year: string;
  isHead?: boolean;
  isMerge?: boolean;
}

// git log — trayectoria real 2019 → 2026
export const timeline: TimelineCommit[] = [
  {
    hash: 'a3f19e2',
    message: {
      es: 'feat: primeras tiendas Shopify',
      en: 'feat: first Shopify stores',
    },
    year: '2019',
  },
  {
    hash: 'c7d02b8',
    message: {
      es: 'feat: SEO técnico + afiliación WordPress',
      en: 'feat: technical SEO + WordPress affiliate',
    },
    year: '2020',
  },
  {
    hash: 'e1b44f0',
    message: {
      es: 'feat: diseño y marketing — Figma, Adobe',
      en: 'feat: design & marketing — Figma, Adobe',
    },
    year: '2021',
  },
  {
    hash: 'f9a71c3',
    message: {
      es: 'refactor: del diseño al código',
      en: 'refactor: from design to code',
    },
    year: '2022',
  },
  {
    hash: 'b2e88d1',
    message: {
      es: 'feat: primeras webs de cliente en producción',
      en: 'feat: first client sites shipped',
    },
    year: '2023',
  },
  {
    hash: 'd4c30a7',
    message: {
      es: 'merge: bootcamp 4Geeks — Python/Flask',
      en: 'merge: 4Geeks bootcamp — Python/Flask',
    },
    year: '2026',
    isMerge: true,
  },
  {
    hash: 'HEAD',
    message: {
      es: 'HEAD: open_to_work',
      en: 'HEAD: open_to_work',
    },
    year: 'ahora',
    isHead: true,
  },
];
