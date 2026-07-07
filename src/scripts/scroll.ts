import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { prefersReducedMotion } from './lifecycle';

gsap.registerPlugin(ScrollTrigger);

/** Instancia viva de Lenis para scroll programático (nunca window.scrollTo). */
export let lenis: Lenis | null = null;

export function scrollToTarget(target: string | HTMLElement): void {
  if (lenis) {
    lenis.scrollTo(target, { offset: -96 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView();
  }
}

/** Lenis + ScrollTrigger integrados. Cleanup total en cada swap de página. */
export function initScroll(): () => void {
  if (prefersReducedMotion()) {
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  const instance = new Lenis({ autoRaf: false });
  lenis = instance;

  instance.on('scroll', ScrollTrigger.update);
  const raf = (time: number): void => instance.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    instance.destroy();
    lenis = null;
    // Red de seguridad: ningún ScrollTrigger sobrevive al swap
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
