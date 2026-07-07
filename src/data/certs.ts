import type { Lang } from './site';

export interface Cert {
  name: string;
  issuer: string;
  year?: string;
  verifyUrl?: string;
  inProgress?: boolean;
  note?: Record<Lang, string>;
}

export const certs: Cert[] = [
  {
    name: 'Full Stack Developer (360h)',
    issuer: '4Geeks Academy',
    year: '2026',
    verifyUrl: 'https://certificate.4geeks.com/fdf96e66bfe55ec00d730ecc75ea042fe6a7c6cb',
  },
  {
    name: 'Claude 101',
    issuer: 'Anthropic',
    verifyUrl: 'https://verify.skilljar.com/c/5pvtrsw8e6rm',
  },
  {
    name: 'Claude Code 101',
    issuer: 'Anthropic',
    verifyUrl: 'https://verify.skilljar.com/c/h6km8xu8oxsc',
  },
  {
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    inProgress: true,
    note: { es: 'en curso', en: 'in progress' },
  },
  {
    name: 'Máster en React',
    issuer: 'Udemy — Víctor Robles',
  },
  {
    name: 'Máster en Lógica de Programación',
    issuer: 'Udemy — Víctor Robles',
  },
  {
    name: 'JS Intensivo: camino hacia React',
    issuer: 'Udemy — Código 369',
  },
  {
    name: 'Next Level CSS',
    issuer: 'Udemy',
  },
  {
    name: 'Clean Code y Principios SOLID',
    issuer: 'DevTalles — Fernando Herrera',
  },
  {
    name: 'Productividad con VS Code',
    issuer: 'DevTalles — Fernando Herrera',
  },
];
