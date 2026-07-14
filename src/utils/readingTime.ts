const WORDS_PER_MINUTE = 200;

/** Minutos de lectura estimados a partir del markdown crudo. */
export function readingTime(markdown: string): number {
  const text = markdown.replace(/```[\s\S]*?```/g, ' ').replace(/[#*_>`[\]()!-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
