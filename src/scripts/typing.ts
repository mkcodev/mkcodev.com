/**
 * Teclea el texto de `el` char a char sobre rAF. Devuelve `cancel()` que
 * restaura el texto final si se aborta a mitad. Idempotente entre re-inits:
 * guarda el texto original en `dataset.typingText` la primera vez.
 *
 * Anti-CLS: antes de arrancar mide el ancho/alto renderizado del texto
 * final y lo fija en `min-width`/`min-height` del elemento — así el
 * elemento no colapsa mientras se teclea.
 */
export interface TypingOptions {
  /** ms por carácter. Default 40. */
  perChar?: number;
  /** ms máximos totales — si el texto es largo, se ajusta perChar. */
  maxDuration?: number;
  /** Callback al terminar (para encadenar). */
  onDone?: () => void;
}

export function type(el: HTMLElement, opts: TypingOptions = {}): () => void {
  const target = el.dataset['typingText'] ?? el.textContent ?? '';
  el.dataset['typingText'] = target;

  const rect = el.getBoundingClientRect();
  el.style.minWidth = `${Math.ceil(rect.width)}px`;
  el.style.minHeight = `${Math.ceil(rect.height)}px`;

  let per = opts.perChar ?? 40;
  const total = per * target.length;
  if (opts.maxDuration && total > opts.maxDuration) {
    per = opts.maxDuration / target.length;
  }

  el.textContent = '';
  let i = 0;
  let last = performance.now();
  let rafId = 0;

  const tick = (now: number): void => {
    const elapsed = now - last;
    const steps = Math.floor(elapsed / per);
    if (steps > 0) {
      i = Math.min(target.length, i + steps);
      el.textContent = target.slice(0, i);
      last += steps * per;
    }
    if (i >= target.length) {
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
