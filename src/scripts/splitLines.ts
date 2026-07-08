/**
 * Parte el texto de `el` en líneas visuales usando Range + getClientRects.
 * Cada línea queda envuelta en un `<span class="line"><span class="line-inner">`
 * — la línea externa hereda overflow hidden y la interna es la que anima.
 *
 * Idempotente: si ya se procesó (dataset flag) devuelve los .line-inner
 * existentes sin retocar el DOM.
 */
export function splitLines(el: HTMLElement): HTMLSpanElement[] {
  if (el.dataset['linesSplit'] === '1') {
    return Array.from(el.querySelectorAll<HTMLSpanElement>('.line-inner'));
  }

  const originalHTML = el.innerHTML;
  el.dataset['linesOriginal'] = originalHTML;

  const words = (el.textContent ?? '').split(/(\s+)/);
  el.textContent = '';
  const wordSpans: HTMLSpanElement[] = [];
  for (const part of words) {
    const span = document.createElement('span');
    span.textContent = part;
    if (part.trim() !== '') span.className = 'lw';
    el.appendChild(span);
    wordSpans.push(span);
  }

  // Agrupar palabras por su top rectangle (aproximado por rounding). Las
  // palabras que empiezan en la misma Y forman una línea visual.
  const groups: HTMLSpanElement[][] = [];
  let currentTop = -Infinity;
  let current: HTMLSpanElement[] = [];
  for (const w of wordSpans) {
    const rect = w.getBoundingClientRect();
    if (rect.height === 0) {
      // Espacio en blanco — pertenece al grupo actual.
      current.push(w);
      continue;
    }
    const top = Math.round(rect.top);
    if (top !== currentTop) {
      if (current.length > 0) groups.push(current);
      current = [];
      currentTop = top;
    }
    current.push(w);
  }
  if (current.length > 0) groups.push(current);

  el.textContent = '';
  const inners: HTMLSpanElement[] = [];
  for (const group of groups) {
    const lineWrap = document.createElement('span');
    lineWrap.className = 'line';
    const inner = document.createElement('span');
    inner.className = 'line-inner';
    for (const w of group) inner.appendChild(w);
    lineWrap.appendChild(inner);
    el.appendChild(lineWrap);
    inners.push(inner);
  }
  el.dataset['linesSplit'] = '1';
  return inners;
}

/** Restaura el HTML original guardado por splitLines. */
export function restoreLines(el: HTMLElement): void {
  const original = el.dataset['linesOriginal'];
  if (original === undefined) return;
  el.innerHTML = original;
  delete el.dataset['linesSplit'];
  delete el.dataset['linesOriginal'];
}
