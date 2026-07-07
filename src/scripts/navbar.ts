/** Navbar: compacta la barra y escala el logo-moneda al hacer scroll. */
export function initNavbar(): (() => void) | void {
  const navbar = document.querySelector<HTMLElement>('[data-navbar]');
  if (!navbar) return;

  let ticking = false;

  const update = (): void => {
    navbar.classList.toggle('navbar--compact', window.scrollY > 80);
    ticking = false;
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}
