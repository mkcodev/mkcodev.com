const SECTION_IDS = ['proyectos', 'como-trabajo', 'trayectoria', 'sobre-mi', 'contacto'];

/** Grados por píxel de scroll — 360° cada 1200 px (≈2 vueltas por página típica). */
const SPIN_FACTOR = 0.3;

function initSectionActive(navbar: HTMLElement): (() => void) | undefined {
  const links = new Map<string, HTMLElement>();
  navbar.querySelectorAll<HTMLElement>('.navbar-link').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    const hashIdx = href.indexOf('#');
    if (hashIdx === -1) return;
    const hash = href.slice(hashIdx + 1);
    if (hash) links.set(hash, a);
  });
  if (links.size === 0) return;

  const targets: HTMLElement[] = [];
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el) targets.push(el);
  }
  if (targets.length === 0) return;

  const setActive = (id: string | null): void => {
    for (const [key, el] of links) el.classList.toggle('is-active', key === id);
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      const first = visible[0]?.target as HTMLElement | undefined;
      if (first) setActive(first.id);
    },
    { rootMargin: '-30% 0px -60% 0px' },
  );
  for (const el of targets) io.observe(el);

  return () => {
    io.disconnect();
    setActive(null);
  };
}

/**
 * Navbar: altura fija (siempre "compacto"). Actualiza el progress ring, el
 * spin del logo proporcional al scroll y el link activo por sección visible.
 */
export function initNavbar(): (() => void) | void {
  const navbar = document.querySelector<HTMLElement>('[data-navbar]');
  if (!navbar) return;
  const progress = navbar.querySelector<SVGCircleElement>('[data-nav-progress]');
  const logo = navbar.querySelector<HTMLElement>('[data-nav-logo]');

  let ticking = false;

  const applyScroll = (): void => {
    const y = window.scrollY;
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      progress.style.strokeDashoffset = String(1 - p);
    }
    if (logo) {
      logo.style.transform = `rotate(${y * SPIN_FACTOR}deg)`;
    }
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      applyScroll();
    });
  };

  applyScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const cleanupSections = initSectionActive(navbar);

  return () => {
    window.removeEventListener('scroll', onScroll);
    cleanupSections?.();
  };
}
