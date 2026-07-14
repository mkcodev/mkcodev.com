import type { APIRoute } from 'astro';
import { SITE, SITE_URL } from '../data/site';
import { projects } from '../data/projects';
import { certs } from '../data/certs';
import { services, formatPrice } from '../data/services';

export const GET: APIRoute = () => {
  const serviceLines = services.map((s) => {
    const price =
      s.priceUnit === 'mes'
        ? `${formatPrice(s.priceFrom)}€ – ${formatPrice(s.priceTo)}€/mes`
        : `${formatPrice(s.priceFrom)}€ – ${formatPrice(s.priceTo)}€`;
    return `- [${s.title}](${SITE_URL}/servicios/${s.slug}) — ${price}: ${s.cardDesc}`;
  });

  const projectLines = projects.map((p) => {
    const link = p.caseStudy ? `${SITE_URL}/proyectos/${p.slug}` : (p.url ?? '');
    const label = link ? `[${p.title}](${link})` : p.title;
    return `- ${label} (${p.year}): ${p.description.es} Stack: ${p.stack.join(', ')}.`;
  });

  const certLines = certs
    .filter((c) => !c.inProgress)
    .map((c) => `- ${c.name} — ${c.issuer}${c.year ? ` (${c.year})` : ''}`);

  const body = `# ${SITE.name} — ${SITE.author}

> ${SITE.role.es}. ${SITE.tagline.es} Desarrollador web freelance en ${SITE.location}. Servicios para negocios de Bilbao, Gran Bilbao y Zamora (también en remoto para toda España).

Sitio construido con Astro, TypeScript, Tailwind CSS v4, GSAP y Lenis.
Bilingüe: español (por defecto) e inglés bajo /en. Las páginas de servicios son solo en español.

## Servicios y precios

Todos los proyectos con presupuesto cerrado por escrito antes de empezar.

${serviceLines.join('\n')}

Comparativa completa de precios: ${SITE_URL}/servicios

## Zonas de trabajo

- [Diseño web en Bilbao](${SITE_URL}/diseno-web-bilbao): reuniones presenciales en el Gran Bilbao (Basauri, Barakaldo, Getxo…)
- [Diseño web en Zamora](${SITE_URL}/diseno-web-zamora): digitalización de negocios locales, Kit Digital, atención remota y visitas

## Proyectos

${projectLines.join('\n')}

## Formación

${certLines.join('\n')}

## Páginas

- [Home](${SITE_URL}/): presentación, proyectos, trayectoria y contacto
- [Servicios](${SITE_URL}/servicios): los 6 servicios con precios y FAQ
- [Blog](${SITE_URL}/blog): notas sobre desarrollo web, precios, SEO y Kit Digital
- [~/uses](${SITE_URL}/uses): setup y herramientas
- [CV en PDF](${SITE_URL}${SITE.cvPath})
- [resume.json](${SITE_URL}/resume.json): CV en formato JSON Resume

## Contacto

- Email: ${SITE.email}
- Teléfono: ${SITE.phoneDisplay}
- Ubicación: ${SITE.addressLocality}, ${SITE.addressRegion} (España)
- GitHub: ${SITE.github}
- LinkedIn: ${SITE.linkedin}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
