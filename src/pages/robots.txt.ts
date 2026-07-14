import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/site';

// Crawlers de IA permitidos explícitamente (GEO): search/retrieval + training.
// Estar en el índice Y en los pesos del modelo = citas + recomendaciones.
const AI_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
] as const;

export const GET: APIRoute = () => {
  const aiBlocks = AI_CRAWLERS.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n');

  const body = `User-agent: *
Allow: /

${aiBlocks}

Sitemap: ${SITE_URL}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
