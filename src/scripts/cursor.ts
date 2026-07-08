const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-magnetic]';

/** Cursor custom dot + ring. Solo desktop con puntero fino. */
export function initCursor(): (() => void) | void {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(dot, ring);
  document.documentElement.classList.add('has-custom-cursor');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let targetScale = 1;
  let scale = 1;
  let rafId = 0;

  const onMove = (e: MouseEvent): void => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    const overInteractive = Boolean((e.target as Element | null)?.closest?.(INTERACTIVE));
    targetScale = overInteractive ? 1.5 : 1;
    ring.classList.toggle('cursor-ring--active', overInteractive);
  };

  const loop = (): void => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    scale += (targetScale - scale) * 0.2;
    // Scale DENTRO del transform (no como propiedad CSS aparte): al combinar
    // `transform: translate(x,y)` con `scale: 1.5` individual, el margin
    // negativo que centra el ring se re-escala y el ring aparece desplazado
    // hacia abajo-derecha. Meterlo en la misma cadena evita esa deriva.
    ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`;
    rafId = requestAnimationFrame(loop);
  };

  window.addEventListener('mousemove', onMove, { passive: true });
  rafId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onMove);
    dot.remove();
    ring.remove();
    document.documentElement.classList.remove('has-custom-cursor');
  };
}
