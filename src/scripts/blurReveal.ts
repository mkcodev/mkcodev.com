import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLines, restoreLines } from './splitLines';

gsap.registerPlugin(ScrollTrigger);

/**
 * Blur-reveal por líneas visuales. Cada elemento `[data-blur-lines]` se
 * parte con splitLines() y sus inner-lines animan
 *   filter blur(10px)→0 + y 14→0, power3.out 0.7s, stagger 0.09.
 * ScrollTrigger `top 82%`. Restaura al cleanup.
 */
export function initBlurReveal(): (() => void) | void {
  const targets = document.querySelectorAll<HTMLElement>('[data-blur-lines]');
  if (targets.length === 0) return;

  const ctx = gsap.context(() => {
    for (const el of targets) {
      // splitLines depende del layout real: postponer un frame para que
      // Astro/View Transitions haya terminado el swap y las medidas sean
      // fiables.
      requestAnimationFrame(() => {
        const inners = splitLines(el);
        if (inners.length === 0) return;
        gsap.set(inners, { filter: 'blur(10px)', y: 14, opacity: 0 });
        gsap.to(inners, {
          filter: 'blur(0px)',
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none play none',
          },
        });
      });
    }
  });

  return () => {
    ctx.revert();
    for (const el of targets) restoreLines(el);
  };
}
