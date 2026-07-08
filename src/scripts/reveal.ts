import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type } from './typing';

gsap.registerPlugin(ScrollTrigger);

const TOGGLE = 'play reverse play reverse';
// Marker se teclea al entrar — NO reverse: re-teclear al reentrar marea.
const TOGGLE_ONCE = 'play none play none';

/**
 * Envuelve cada palabra del texto de `el` en un span `.word` dentro de un
 * wrapper `.mask` con `overflow: hidden`. Es idempotente: si ya está
 * envuelto (dataset flag) no vuelve a hacerlo. El texto original queda
 * expresado en spans — SEO y no-JS siguen viendo el mismo string.
 */
function wrapWords(el: HTMLElement): HTMLSpanElement[] {
  if (el.dataset['wordsWrapped'] === '1') {
    return Array.from(el.querySelectorAll<HTMLSpanElement>('.word'));
  }
  const text = el.textContent ?? '';
  const parts = text.split(/(\s+)/); // conserva los espacios entre palabras
  el.textContent = '';
  const words: HTMLSpanElement[] = [];
  for (const part of parts) {
    if (part.trim() === '') {
      el.appendChild(document.createTextNode(part));
      continue;
    }
    const mask = document.createElement('span');
    mask.className = 'mask';
    const word = document.createElement('span');
    word.className = 'word';
    word.textContent = part;
    mask.appendChild(word);
    el.appendChild(mask);
    words.push(word);
  }
  el.dataset['wordsWrapped'] = '1';
  return words;
}

/**
 * Reveals genéricos por scroll — cada sección solo necesita data-attributes:
 * - `data-animate="section-heading"` (SectionHeading): marker se teclea
 *   char a char; título entra palabra a palabra con clip-path desde abajo.
 * - `data-reveal-group` + hijos `data-reveal`: fade+y con stagger 0.08.
 * Los estados iniciales se fijan desde JS: sin JS el contenido es visible.
 */
export function initReveals(): (() => void) | void {
  const cancels: Array<() => void> = [];

  const ctx = gsap.context(() => {
    document.querySelectorAll<HTMLElement>('[data-animate="section-heading"]').forEach((el) => {
      const marker = el.querySelector<HTMLElement>('[data-animate-marker]');
      const title = el.querySelector<HTMLElement>('[data-animate-title]');

      if (marker) {
        marker.dataset['typingText'] = marker.textContent ?? '';
        marker.textContent = '';
      }
      let words: HTMLSpanElement[] = [];
      if (title) {
        words = wrapWords(title);
        gsap.set(words, { yPercent: 105, clipPath: 'inset(100% 0 0 0)' });
      }

      const playTitle = (): void => {
        if (words.length === 0) return;
        gsap.to(words, {
          yPercent: 0,
          clipPath: 'inset(0% 0 -10% 0)',
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.08,
        });
      };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        toggleActions: TOGGLE_ONCE,
        onEnter: () => {
          if (marker) {
            cancels.push(
              type(marker, {
                perChar: 26,
                maxDuration: 1000,
                onDone: playTitle,
              }),
            );
          } else {
            playTitle();
          }
        },
      });
    });

    document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
      const items = group.querySelectorAll('[data-reveal]');
      if (items.length === 0) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: TOGGLE },
          // El transform inline residual pisa los :hover CSS (lift de las cards)
          onComplete: () => gsap.set(items, { clearProps: 'transform' }),
        },
      );
    });
  });

  return () => {
    for (const c of cancels) c();
    ctx.revert();
  };
}
