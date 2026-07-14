// Servicios comerciales (ES-only). Fuente única para el hub /servicios,
// las páginas de detalle, el schema Service y llms.txt.
// Precios placeholder acordados — actualizar cuando Mikel cierre tarifas.

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** Nombre completo (H1, schema). */
  title: string;
  /** Nombre corto (nav, cards, tabla). */
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** Descripción corta para cards del hub (sin precio: la card ya lo muestra). */
  cardDesc: string;
  /** Párrafo answer-first: responde la intención de búsqueda en 2-3 frases citables. */
  answerFirst: string;
  priceFrom: number;
  priceTo: number;
  priceUnit: 'proyecto' | 'mes';
  deliverables: string[];
  process: Array<{ step: string; detail: string }>;
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: 'diseno-web',
    title: 'Diseño y desarrollo web',
    shortTitle: 'Diseño web',
    metaTitle: 'Diseño y desarrollo web a medida | mkcodev',
    metaDescription:
      'Webs a medida con Astro, Next.js y React: rápidas, accesibles y orientadas a captar clientes. Desde 1.500€. Bilbao, Gran Bilbao y Zamora.',
    cardDesc:
      'Webs a medida con Astro, Next.js y React: rápidas, con SEO técnico incluido y diseño propio. Sin plantillas ni WordPress.',
    answerFirst:
      'Diseño y desarrollo webs a medida con Astro, Next.js y React, sin plantillas ni WordPress. Una web corporativa completa cuesta desde 1.500€ y está lista en 3-5 semanas: diseño propio, contenido optimizado para SEO, formulario de contacto y analítica configurada desde el primer día.',
    priceFrom: 1500,
    priceTo: 2500,
    priceUnit: 'proyecto',
    deliverables: [
      'Diseño propio (no plantilla) adaptado a tu marca',
      'Desarrollo con código moderno: Astro o Next.js + TypeScript',
      'SEO on-page completo: metadatos, schema, sitemap, Core Web Vitals',
      'Responsive real: móvil, tablet y escritorio verificados',
      'Formulario de contacto y Google Analytics con consentimiento RGPD',
      'Dominio, hosting y despliegue configurados y documentados',
    ],
    process: [
      {
        step: 'Reunión inicial',
        detail:
          'Objetivos, público, referencias y contenidos. 1 hora, presencial en el Gran Bilbao o por videollamada.',
      },
      {
        step: 'Propuesta y diseño',
        detail: 'Estructura, wireframe y dirección visual. Dos rondas de revisión incluidas.',
      },
      {
        step: 'Desarrollo',
        detail: 'Código a medida con entregas parciales para que veas el avance real.',
      },
      {
        step: 'Lanzamiento',
        detail: 'Dominio, SEO técnico, analítica y verificación en Google Search Console.',
      },
      {
        step: 'Entrega y formación',
        detail: 'Te enseño a actualizar el contenido y te entrego toda la documentación.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una página web profesional?',
        a: 'Una web corporativa a medida cuesta entre 1.500€ y 2.500€ según número de páginas y funcionalidades. Una web con animaciones avanzadas y diseño premium va de 3.000€ a 5.000€. El precio siempre se cierra antes de empezar, sin sorpresas.',
      },
      {
        q: '¿Cuánto se tarda en hacer una web?',
        a: 'Entre 3 y 5 semanas para una web corporativa, desde la reunión inicial hasta el lanzamiento. Proyectos con más páginas o funcionalidades a medida pueden llegar a 8 semanas.',
      },
      {
        q: '¿Usas WordPress o plantillas?',
        a: 'No. Trabajo con Astro, Next.js y React: código a medida, más rápido, más seguro y sin plugins que mantener. El resultado carga en menos de un segundo y puntúa alto en Core Web Vitals, que Google usa para posicionar.',
      },
      {
        q: '¿La web incluye SEO?',
        a: 'Sí. Toda web que entrego sale con SEO técnico completo: metadatos, datos estructurados (schema.org), sitemap, rendimiento optimizado y verificación en Google Search Console. El posicionamiento continuo es un servicio aparte.',
      },
    ],
  },
  {
    slug: 'tiendas-online',
    title: 'Tiendas online y e-commerce',
    shortTitle: 'Tiendas online',
    metaTitle: 'Tiendas online y e-commerce a medida | mkcodev',
    metaDescription:
      'Tiendas online rápidas y fáciles de gestionar: catálogo, pagos, envíos y SEO. Desde 2.500€. Bilbao, Gran Bilbao y Zamora.',
    cardDesc:
      'E-commerce completo: catálogo, pasarela de pago, envíos y panel para gestionarlo tú. Optimizado para convertir visitas en ventas.',
    answerFirst:
      'Desarrollo tiendas online completas desde 2.500€: catálogo de productos, pasarela de pago (Stripe, Redsys), gestión de envíos y panel para que actualices productos sin depender de nadie. Optimizadas para que carguen rápido y conviertan visitas en ventas.',
    priceFrom: 2500,
    priceTo: 4500,
    priceUnit: 'proyecto',
    deliverables: [
      'Catálogo de productos con variantes, stock y categorías',
      'Pasarela de pago segura: Stripe, Redsys o PayPal',
      'Panel de gestión para productos, pedidos y clientes',
      'SEO para e-commerce: fichas de producto optimizadas y schema Product',
      'Emails transaccionales: confirmación de pedido y envío',
      'Cumplimiento legal: RGPD, condiciones de venta, cookies',
    ],
    process: [
      {
        step: 'Análisis del negocio',
        detail: 'Catálogo, logística, pagos y objetivos de venta. Definimos el alcance exacto.',
      },
      {
        step: 'Diseño de la tienda',
        detail: 'Ficha de producto, carrito y checkout diseñados para convertir.',
      },
      {
        step: 'Desarrollo e integración',
        detail: 'Catálogo, pagos, envíos y emails. Entregas parciales para probar el flujo real.',
      },
      {
        step: 'Pruebas de compra',
        detail: 'Compras de prueba completas en móvil y escritorio antes de lanzar.',
      },
      {
        step: 'Lanzamiento y formación',
        detail: 'Te enseño a gestionar productos y pedidos. Documentación incluida.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una tienda online?',
        a: 'Una tienda online a medida cuesta entre 2.500€ y 4.500€ según el tamaño del catálogo y las integraciones (pagos, envíos, facturación). Incluye todo lo necesario para vender desde el primer día.',
      },
      {
        q: '¿Podré gestionar los productos yo mismo?',
        a: 'Sí. La tienda incluye un panel de gestión desde el que actualizas productos, precios, stock y pedidos sin tocar código. Además te formo en su uso antes de la entrega.',
      },
      {
        q: '¿Qué pasarelas de pago puedo usar?',
        a: 'Stripe, Redsys (la pasarela de los bancos españoles) y PayPal. Stripe es la opción que recomiendo para empezar: comisión por venta, sin cuota fija y alta el mismo día.',
      },
      {
        q: '¿La tienda cumple con la normativa española?',
        a: 'Sí. Entrego la tienda con RGPD, política de cookies con consentimiento real, condiciones de venta y proceso de compra conforme a la normativa de comercio electrónico española.',
      },
    ],
  },
  {
    slug: 'seo',
    title: 'SEO y posicionamiento web',
    shortTitle: 'SEO',
    metaTitle: 'SEO y posicionamiento web para negocios | mkcodev',
    metaDescription:
      'SEO técnico, local y de contenidos para aparecer en Google y en las respuestas de la IA. Desde 400€/mes. Bilbao, Gran Bilbao y Zamora.',
    cardDesc:
      'SEO técnico, local y de contenidos para aparecer en Google y en las respuestas de ChatGPT y Perplexity. Informe mensual claro.',
    answerFirst:
      'Ofrezco SEO para negocios locales y pymes desde 400€/mes: auditoría técnica, SEO local (Google Business Profile), contenidos que posicionan y optimización para buscadores con IA como ChatGPT y Perplexity. Primer informe de resultados a los 30 días.',
    priceFrom: 400,
    priceTo: 900,
    priceUnit: 'mes',
    deliverables: [
      'Auditoría técnica inicial: indexación, velocidad, estructura',
      'SEO local: Google Business Profile, reseñas y citaciones NAP',
      'Estrategia de contenidos con keywords de tu sector y zona',
      'Optimización GEO: aparecer en respuestas de ChatGPT, Perplexity y AI Overviews',
      'Datos estructurados (schema.org) en todo el sitio',
      'Informe mensual claro: posiciones, tráfico y conversiones',
    ],
    process: [
      {
        step: 'Auditoría',
        detail:
          'Estado técnico, competencia y oportunidades de keywords. Con plan de acción priorizado.',
      },
      {
        step: 'Correcciones técnicas',
        detail: 'Indexación, velocidad, schema y estructura. La base sin la que nada posiciona.',
      },
      {
        step: 'SEO local',
        detail: 'Perfil de Google Business optimizado, estrategia de reseñas y consistencia NAP.',
      },
      {
        step: 'Contenidos',
        detail: 'Páginas y artículos orientados a las búsquedas que hacen tus clientes.',
      },
      {
        step: 'Medición y ajuste',
        detail: 'Informe mensual y ajuste de estrategia según resultados reales.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta el SEO al mes?',
        a: 'Entre 400€ y 900€ al mes según la competencia de tu sector y el alcance (solo local, o local + contenidos). Sin permanencia: si no ves valor, lo dejas.',
      },
      {
        q: '¿Cuánto tarda el SEO en dar resultados?',
        a: 'Las correcciones técnicas y el SEO local dan resultados en 4-8 semanas. El posicionamiento orgánico competitivo necesita de 3 a 6 meses. En el primer informe (30 días) ya ves los primeros movimientos.',
      },
      {
        q: '¿Qué es el GEO o SEO para IA?',
        a: 'GEO (Generative Engine Optimization) es optimizar tu web para que ChatGPT, Perplexity y los AI Overviews de Google te citen como respuesta. Cada vez más clientes preguntan a la IA antes que a Google, y estar ahí es una ventaja que casi nadie está trabajando todavía.',
      },
      {
        q: '¿Trabajas el SEO local de Bilbao y Zamora?',
        a: 'Sí, es mi especialidad. Trabajo el posicionamiento local en el Gran Bilbao (donde tengo base, en Basauri) y en la provincia de Zamora, donde la baja competencia permite resultados rápidos.',
      },
    ],
  },
  {
    slug: 'mantenimiento-web',
    title: 'Mantenimiento web',
    shortTitle: 'Mantenimiento',
    metaTitle: 'Mantenimiento web mensual para negocios | mkcodev',
    metaDescription:
      'Mantenimiento web desde 50€/mes: actualizaciones, copias de seguridad, seguridad, cambios de contenido y soporte directo sin intermediarios.',
    cardDesc:
      'Actualizaciones, backups, monitorización de caídas y cambios de contenido. Soporte directo conmigo, sin tickets ni intermediarios.',
    answerFirst:
      'Ofrezco mantenimiento web mensual desde 50€/mes: actualizaciones, copias de seguridad, monitorización de caídas, pequeños cambios de contenido y soporte directo conmigo, sin tickets ni intermediarios. Para webs hechas por mí o por terceros.',
    priceFrom: 50,
    priceTo: 150,
    priceUnit: 'mes',
    deliverables: [
      'Actualizaciones de dependencias y parches de seguridad',
      'Copias de seguridad automáticas y restauración garantizada',
      'Monitorización 24/7 de caídas y errores',
      'Bolsa mensual de cambios de contenido y pequeñas mejoras',
      'Informe mensual de estado: rendimiento, seguridad, visitas',
      'Soporte directo por email o WhatsApp',
    ],
    process: [
      {
        step: 'Revisión inicial',
        detail: 'Audito el estado actual de la web: seguridad, rendimiento y deuda técnica.',
      },
      {
        step: 'Puesta a punto',
        detail: 'Corrijo lo urgente y dejo la web en un estado sano y documentado.',
      },
      {
        step: 'Mantenimiento mensual',
        detail: 'Actualizaciones, backups, monitorización y los cambios que necesites.',
      },
      {
        step: 'Informe mensual',
        detail: 'Resumen claro de lo hecho y del estado de la web, sin jerga técnica.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta el mantenimiento de una web?',
        a: 'Entre 50€ y 150€ al mes según el tipo de web y la bolsa de cambios que necesites. El plan básico (50€/mes) cubre actualizaciones, backups y monitorización; los planes superiores añaden horas de cambios y mejoras.',
      },
      {
        q: '¿Mantienes webs que no has hecho tú?',
        a: 'Sí. Hago primero una revisión inicial para conocer el estado del código y a partir de ahí la mantengo como si fuera mía. Si la web está en muy mal estado, te doy un diagnóstico honesto antes de comprometerme.',
      },
      {
        q: '¿Qué pasa si mi web se cae?',
        a: 'La monitorización me avisa en minutos y actúo directamente. Con las copias de seguridad automáticas, el peor escenario es restaurar la web a su último estado sano.',
      },
      {
        q: '¿Hay permanencia?',
        a: 'No. El mantenimiento es mes a mes y puedes cancelarlo cuando quieras. Al salir te entrego backups y documentación de todo.',
      },
    ],
  },
  {
    slug: 'ia-automatizacion',
    title: 'Soluciones de IA y automatización',
    shortTitle: 'IA y automatización',
    metaTitle: 'IA y automatización para negocios | mkcodev',
    metaDescription:
      'Chatbots, asistentes con IA y automatización de procesos para pymes. Desde 1.500€. Ahorra horas de trabajo manual cada semana.',
    cardDesc:
      'Chatbots, asistentes sobre tus documentos y automatización de procesos que ahorran horas de trabajo manual cada semana.',
    answerFirst:
      'Desarrollo soluciones de IA y automatización para pymes desde 1.500€: chatbots que atienden a tus clientes 24/7, asistentes internos que responden sobre tus documentos y automatizaciones que eliminan tareas manuales repetitivas. Proyectos acotados con retorno medible.',
    priceFrom: 1500,
    priceTo: 6000,
    priceUnit: 'proyecto',
    deliverables: [
      'Chatbot o asistente IA entrenado con la información de tu negocio',
      'Automatización de procesos: emails, informes, gestión de datos',
      'Integración con tus herramientas: CRM, hojas de cálculo, email',
      'Guardarrailes: la IA solo responde sobre tu negocio, sin inventar',
      'Panel de control y métricas de uso',
      'Formación del equipo y documentación',
    ],
    process: [
      {
        step: 'Diagnóstico',
        detail: 'Identificamos qué procesos consumen más horas y cuáles automatizar primero.',
      },
      {
        step: 'Propuesta con ROI',
        detail: 'Alcance, coste y horas ahorradas estimadas. Solo avanzamos si los números salen.',
      },
      {
        step: 'Desarrollo iterativo',
        detail: 'Versión funcional temprana que pruebas con casos reales de tu negocio.',
      },
      {
        step: 'Ajuste y guardarrailes',
        detail: 'Afinamos respuestas y límites hasta que el comportamiento sea fiable.',
      },
      {
        step: 'Despliegue y formación',
        detail: 'Puesta en producción, formación del equipo y soporte inicial.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta implantar IA en mi negocio?',
        a: 'Depende del alcance: un chatbot de atención al cliente parte de 1.500€; automatizaciones de procesos y asistentes internos sobre tus documentos van de 3.000€ a 6.000€. Siempre con propuesta cerrada y estimación de horas ahorradas.',
      },
      {
        q: '¿Qué procesos se pueden automatizar?',
        a: 'Los más habituales: atención de consultas repetitivas, elaboración de presupuestos e informes, clasificación de emails, entrada de datos entre herramientas y seguimiento de clientes. Si una tarea sigue reglas y consume horas cada semana, probablemente se puede automatizar.',
      },
      {
        q: '¿La IA se inventará respuestas con mis clientes?',
        a: 'No, si está bien construida. Implemento guardarrailes: el asistente solo responde con la información verificada de tu negocio y deriva a una persona cuando la consulta se sale de su ámbito. Es la diferencia entre un chatbot de juguete y una herramienta profesional.',
      },
      {
        q: '¿Necesito muchos datos o infraestructura?',
        a: 'No. Trabajo con modelos como Claude y Gemini vía API: no hay que entrenar nada desde cero ni montar servidores. Con la documentación de tu negocio (catálogo, FAQs, procedimientos) es suficiente para empezar.',
      },
    ],
  },
  {
    slug: 'marca-personal',
    title: 'Creación de marca personal',
    shortTitle: 'Marca personal',
    metaTitle: 'Webs de marca personal para profesionales | mkcodev',
    metaDescription:
      'Portfolios y webs de marca personal que te diferencian: diseño memorable, contenido estratégico y SEO de tu nombre. Desde 900€.',
    cardDesc:
      'Portfolio con diseño memorable, contenido que comunica tu valor y SEO de tu nombre. Que quien te busque te encuentre a ti.',
    answerFirst:
      'Creo webs de marca personal para profesionales y freelances desde 900€: portfolio con diseño memorable, contenido que comunica tu valor y SEO para que quien busque tu nombre te encuentre a ti, no a tu perfil de LinkedIn. Este mismo portfolio es mi carta de presentación.',
    priceFrom: 900,
    priceTo: 2500,
    priceUnit: 'proyecto',
    deliverables: [
      'Web personal con diseño propio y memorable (nada de plantillas)',
      'Estrategia de contenido: cómo contar lo que haces y para quién',
      'SEO de marca: posicionar tu nombre y tu especialidad',
      'Optimización de LinkedIn y GitHub coherente con la web',
      'Blog opcional listo para publicar',
      'Dominio propio y email profesional configurados',
    ],
    process: [
      {
        step: 'Sesión de posicionamiento',
        detail: 'Quién eres, qué te diferencia y a quién quieres atraer. La base de todo.',
      },
      {
        step: 'Concepto y diseño',
        detail: 'Dirección visual única que te representa. Nada que parezca una plantilla.',
      },
      {
        step: 'Contenido',
        detail:
          'Textos trabajados contigo: bio, proyectos, servicios. Lo que lee un cliente potencial.',
      },
      {
        step: 'Desarrollo y lanzamiento',
        detail: 'Web rápida, animada con criterio y optimizada para buscadores.',
      },
      {
        step: 'Ecosistema',
        detail: 'LinkedIn, GitHub y email profesional alineados con tu nueva marca.',
      },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una web de marca personal?',
        a: 'Entre 900€ y 2.500€ según el nivel de diseño y contenido. Un portfolio sólido con diseño propio parte de 900€; una web de marca completa con animaciones, blog y estrategia de contenido llega a 2.500€.',
      },
      {
        q: '¿No me vale con LinkedIn?',
        a: 'LinkedIn es un perfil dentro de la plataforma de otro, con el mismo diseño que millones de perfiles más. Una web propia te diferencia, posiciona tu nombre en Google y es tuya: nadie te cambia las reglas ni el alcance.',
      },
      {
        q: '¿Para quién tiene sentido una marca personal?',
        a: 'Freelances, consultores, desarrolladores, creativos y cualquier profesional cuyo nombre sea su negocio. Si tus clientes te buscan por tu nombre antes de contratarte, lo que encuentren decide la venta.',
      },
      {
        q: '¿Me ayudas con el contenido o solo con el diseño?',
        a: 'Con ambos. El diseño sin un mensaje claro no vende: trabajamos juntos tu propuesta de valor, la bio y la presentación de proyectos. Tú pones la experiencia, yo la estructura y el texto que la comunica.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function formatPrice(n: number): string {
  return n.toLocaleString('es-ES');
}
