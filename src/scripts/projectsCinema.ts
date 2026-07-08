import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function buildCinema(cinema: HTMLElement): void {
  const track = cinema.querySelector<HTMLElement>('[data-proj-track]');
  if (!track) return;
  const chapters = track.querySelectorAll<HTMLElement>('[data-proj-chapter]');
  if (chapters.length < 2) return;

  const distance = () => track.scrollWidth - cinema.clientWidth;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cinema,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1.2,
      invalidateOnRefresh: true,
    },
  });

  tl.to(track, { x: () => -distance(), ease: 'none', duration: 1 }, 0);

  const progress = cinema.querySelector('[data-cin-progress]');
  if (progress) {
    tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);
  }

  // Deriva horizontal sutil de las imágenes contra el movimiento del track.
  // El img tiene 110% de ancho con margin -5%: ±4 xPercent nunca deja borde visto.
  const imgs = track.querySelectorAll<HTMLElement>('[data-cin-img]');
  if (imgs.length > 0) {
    tl.fromTo(imgs, { xPercent: -4 }, { xPercent: 4, ease: 'none', duration: 1 }, 0);
  }

  // La copy de los capítulos siguientes entra con lag respecto al track.
  chapters.forEach((chapter, i) => {
    if (i === 0) return;
    const copy = chapter.querySelector<HTMLElement>('[data-cin-copy]');
    if (!copy) return;
    const at = ((i - 0.55) / (chapters.length - 1)) * 1;
    tl.fromTo(
      copy,
      { xPercent: 10, opacity: 0.2 },
      { xPercent: 0, opacity: 1, ease: 'none', duration: 0.45 },
      Math.max(0, at),
    );
  });
}

/** Flagships como capítulos horizontales pinneados — solo desktop ≥1024px. */
export function initProjectsCinema(): (() => void) | void {
  const cinema = document.querySelector<HTMLElement>('[data-proj-cinema]');
  if (!cinema) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => buildCinema(cinema));
  return () => mm.revert();
}
