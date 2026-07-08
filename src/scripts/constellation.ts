import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Constellation graph: las aristas SVG (pathLength=1) se dibujan con
 * scrub proporcional al scroll dentro de la sección. Un tap/click en un
 * nodo dispara scroll a #proyectos vía scrollToTarget.
 */
export function initConstellation(): (() => void) | void {
  const section = document.querySelector<HTMLElement>('[data-constellation]');
  if (!section) return;
  const edges = section.querySelectorAll<SVGLineElement>('[data-const-edge]');
  const nodes = section.querySelectorAll<SVGGElement>('[data-const-node]');

  const ctx = gsap.context(() => {
    if (edges.length > 0) {
      gsap.fromTo(
        edges,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 65%',
            scrub: 0.8,
          },
        },
      );
    }
    if (nodes.length > 0) {
      gsap.fromTo(
        nodes,
        { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.6)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none play none',
          },
        },
      );
    }
  }, section);

  // Click en un nodo → smooth scroll a la sección de Proyectos.
  const onClick = async (e: Event): Promise<void> => {
    const node = (e.target as Element).closest<SVGElement>('[data-const-node]');
    if (!node) return;
    const { scrollToTarget } = await import('./scroll');
    scrollToTarget('#proyectos');
  };
  section.addEventListener('click', (e) => void onClick(e));

  return () => {
    ctx.revert();
    section.removeEventListener('click', (e) => void onClick(e));
  };
}
