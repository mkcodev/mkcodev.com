/**
 * Descifra el texto de `el` char a char, izquierda→derecha, con `cycles`
 * chars aleatorios previos por posición. rAF puro, sin dependencias.
 *
 * Anti-CLS: fija `min-width`/`min-height` antes de arrancar. El texto
 * original queda en `dataset.scrambleText` para restaurar en cancel().
 */
const CHARS = '!<>-_\\/[]{}—=+*^?#';

export interface ScrambleOptions {
  /** ms por char. Default 35. */
  perChar?: number;
  /** Rondas de aleatorio antes de fijar cada char. Default 4. */
  cycles?: number;
  onDone?: () => void;
}

export function scramble(el: HTMLElement, opts: ScrambleOptions = {}): () => void {
  const perChar = opts.perChar ?? 35;
  const cycles = opts.cycles ?? 4;
  const target = el.dataset['scrambleText'] ?? el.textContent ?? '';
  el.dataset['scrambleText'] = target;

  const rect = el.getBoundingClientRect();
  el.style.minWidth = `${Math.ceil(rect.width)}px`;
  el.style.minHeight = `${Math.ceil(rect.height)}px`;

  const start = performance.now();
  let rafId = 0;

  const tick = (now: number): void => {
    const elapsed = now - start;
    let out = '';
    let done = true;
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      const charStart = i * perChar;
      const charEnd = charStart + perChar * cycles;
      if (elapsed >= charEnd || ch === ' ') {
        out += ch;
      } else if (elapsed < charStart) {
        done = false;
        // Espacio no rompe layout aquí porque el min-width ya lo fija.
        out += ' ';
      } else {
        done = false;
        out += CHARS[(Math.random() * CHARS.length) | 0] ?? '?';
      }
    }
    el.textContent = out;
    if (done) {
      opts.onDone?.();
      return;
    }
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(rafId);
    el.textContent = target;
  };
}
