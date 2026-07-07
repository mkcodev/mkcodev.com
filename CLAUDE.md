# mk-portfolio — CLAUDE.md

Portfolio de Mikel Salvador García (mkcodev). Astro 7 + TS strict + Tailwind v4 + GSAP + Lenis. Dark only. Deploy: Vercel (`mkcodev.vercel.app`).

## Reglas duras

- **Cero valores Tailwind arbitrarios** (`w-[347px]`). Todo sale de `src/styles/tokens.css`. One-offs justificados se documentan aquí.
- **Glass SOLO en**: navbar, mega menu, celdas bento, ⌘K, modals → utility `.glass`. Cards de proyecto = surface sólida + hairline border.
- **Animar solo** `transform`/`opacity`/`filter`. `will-change` quirúrgico. `prefers-reduced-motion` colapsa todo a fades.
- **Acento con disciplina**: prompts, CTAs, glows, estados activos. Si todo brilla, nada brilla.
- **Proyectos**: solo los 6 reales de `src/data/projects.ts`. Métricas reales o `[PENDIENTE]`, nunca inventadas.
- Radius máx 10px (cards). Fuentes: Space Grotesk (display) + JetBrains Mono (terminal/labels/números).
- React islands SOLO: Terminal hero, ⌘K palette. Todo lo demás vanilla TS + GSAP.

## PATRÓN CENTRAL — Lifecycle de View Transitions

`src/scripts/lifecycle.ts`. ClientRouter hace swap del DOM en cada navegación:

- Cada módulo global se registra con `onPageLoad(init)` en `src/scripts/app.ts`; `init` devuelve su cleanup.
- `astro:page-load` → re-init de todos los módulos. `astro:before-swap` → cleanup (Lenis destroy, `ScrollTrigger.getAll().forEach(kill)`, listeners).
- Scripts de componente (`<script>` en .astro) corren UNA vez por bundle: usar **delegación a nivel de document** (ver Navbar.astro) o registrar vía `onPageLoad`.
- Scroll programático: `scrollToTarget()` de `src/scripts/scroll.ts` (Lenis), nunca `window.scrollTo`.

## Animation Manifest

Tokens GSAP: entradas `power3.out 0.6–0.9s` · salidas `power2.in 0.4s` · hover `0.25s` (CSS) · stagger `0.06–0.1s`. ScrollTrigger: `toggleActions: "play reverse play reverse"` (re-anima al reentrar).

| Elemento | Trigger | In / Out |
|---|---|---|
| Boot-line | 1ª visita (sessionStorage) | type ~0.8s + fade overlay |
| Hero LCP | ninguno | render inmediato; terminal enhance después |
| Navbar compact | scroll >80px | clase `.navbar--compact`, CSS 0.25s |
| Mega menu | toggle | fade+y 0.4 power3.out, stagger li 0.06 / 0.3 power2.in |
| Section headings | ScrollTrigger 80% | fade+y 24px 0.7s, reverse |
| Project cards | ScrollTrigger | fade+y stagger 0.08; hover lift+glow CSS |
| Card→case study | click | VT morph (`transition:name` en imagen+título) |
| Bento | ScrollTrigger | scale 0.96→1 stagger 0.1; hover glow + demo despierta |
| Timeline | pin+scrub SOLO ≥768px (gsap.matchMedia) | branch stroke-dashoffset; mobile: lista vertical stagger |
| About foto | hover | crossfade ASCII canvas 0.4s |
| ⌘K | Ctrl/Cmd+K | scale 0.98→1 fade 0.25s |

## Decisiones

1. **Astro 7** (no 5 como decía el brief): última estable, mismas APIs necesarias (ClientRouter, astro:assets, i18n). create-astro la instaló por defecto.
2. **Bento vanilla GSAP** (no React): sin estado; más ligero.
3. **Fuentes**: `font-display: swap` (default fontsource) + fallbacks con métricas ajustadas (`size-adjust`/`ascent-override` en tokens.css) → protege LCP, marca y CLS a la vez. Preload de los 2 woff2 latin en Base.astro.
4. **OG images**: astro-og-canvas (build time).
5. **Grain**: SVG feTurbulence data-URI en `body::after`, opacity .03.
6. **i18n**: ES default sin prefijo, EN en `/en`. **Mapa de rutas explícito** en `src/i18n/routes.ts` — al añadir página, añadir su par ES↔EN ahí. Toggle SIEMPRE a la página equivalente. `trailingSlash: 'never'`.
7. **foto es .png** (brief decía .jpg) — astro:assets la sirve AVIF igualmente.
8. **Dominio centralizado**: `SITE_URL` en `src/data/site.ts` — cambio de dominio = 1 línea.

## Entorno (Windows)

- **pnpm vía Bash tool o `pnpm.cmd`** — ExecutionPolicy bloquea `pnpm.ps1` en PowerShell.
- Verificar TS: `pnpm astro check`. Build: `pnpm build`. Dev: `pnpm dev`.
- Screenshots: `node scripts/screenshot.mjs` (1440 y 390 + estados interactivos). Refs de calidad en `refs/`.

## Cómo añadir un proyecto

1. Añadir entrada en `src/data/projects.ts` (con `slug` + `slugEn`).
2. Si es flagship con case study: rellenar `caseStudy` y añadir par de rutas en `src/i18n/routes.ts`.
3. Screenshot 1440×900 en `src/assets/projects/`.

## Verificación por sección (obligatoria antes de enseñar)

1. Screenshot 1440px Y 390px, mirarlos.
2. Estados interactivos con Playwright: hover cards/bento, mega menu abierto, ⌘K abierto, terminal tras comando.
3. Commit por sección (conventional commits).
