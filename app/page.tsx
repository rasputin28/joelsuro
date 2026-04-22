"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type AnchorHTMLAttributes,
} from "react";

const CTA_HREF =
  "https://wa.me/525520729410?text=Hola%20Joel%2C%20vengo%20de%20joelsuro.com%20y%20quiero%20agendar%20los%2030%20minutos.%0A%0APara%20aprovechar%20mejor%20la%20llamada%3A%0A%0AEmpresa%3A%20%0AMi%20rol%3A%20%0AIndustria%3A%20%0AFacturaci%C3%B3n%20anual%20aproximada%3A%20%0AEl%20proceso%20que%20m%C3%A1s%20me%20est%C3%A1%20costando%20hoy%3A%20%0A%0AS%C3%A9%20que%20es%20una%20llamada%20sin%20pitch.%20Lo%20que%20busco%20espec%C3%ADficamente%20es%3A";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#problema", label: "El problema" },
  { href: "#otro-lado", label: "Del otro lado" },
  { href: "#ahora", label: "Por qué ahora" },
  { href: "#resultados", label: "Resultados" },
  { href: "#porque-yo", label: "Por qué yo" },
];

const HERO_STATS: { number: string; label: string }[] = [
  { number: "200+", label: "Proyectos con mi equipo" },
  { number: "9", label: "Países" },
  { number: "10+", label: "Años de experiencia" },
];

const DISTRIBUCION_BULLETS: string[] = [
  "Un asesor lee el WhatsApp, abre el ERP, busca la lista de precios y captura el pedido — para cada uno de los 200 pedidos del día.",
  "Cuando el cliente llama para saber dónde está su pedido, el asesor tiene que llamarle a distribución, que a veces no contesta.",
  "Al trimestre, contabilidad revisa las facturas del área logística y encuentra diferencias — si tiene tiempo.",
  "Cuando un SKU pierde ventas, nadie lo detecta hasta que el dato llega al reporte — dos trimestres después.",
];

const MANUFACTURA_BULLETS: string[] = [
  "El asesor recibe el WhatsApp del distribuidor, busca la ficha técnica en el sistema, arma la cotización y la manda — a mano.",
  "El equipo de soporte atiende 50 tickets al día, de los cuales 30 son la misma pregunta que se podría filtrar antes.",
  "El cliente que ya pagó no sabe cuándo llega su pedido. El asesor no sabe. Llama a producción. Producción no contesta.",
  "No existe una lista de todos los distribuidores potenciales en el mercado. Se prospecta por referidos y conocidos.",
];

const COSTOS: { number: string; description: string }[] = [
  {
    number: "$400K",
    description:
      "MXN / trimestre en discrepancias contables que pasan sin detección. Contabilidad las encuentra 90 días después — si tiene tiempo de revisar.",
  },
  {
    number: "2",
    description:
      "Trimestres de retraso para detectar que un SKU perdió ventas o que un distribuidor dejó de comprar. Para entonces, la competencia ya tomó ese espacio.",
  },
  {
    number: "6",
    description:
      "Personas dedicadas a capturar pedidos que podrían estar vendiendo, atendiendo o resolviendo excepciones. Un costo operativo que sube con el volumen.",
  },
  {
    number: "∞",
    description:
      "Clientes que no vuelven porque no supieron dónde estaba su pedido, porque la cotización tardó un día, o porque el técnico no los atendió a tiempo.",
  },
];

const TIERRA: { title: string; body: string }[] = [
  {
    title: "Tu equipo de atención deja de capturar",
    body: "Un agente recibe el pedido, lo valida contra inventario, lo crea en tu ERP y confirma al cliente — sin que nadie intervenga. Tu equipo atiende solo las excepciones.",
  },
  {
    title: "El director ve el flujo de caja hoy",
    body: "No en 30 días. No al trimestre. Los datos de CxC, CxP e inventario están consolidados en tiempo real para tomar decisiones cuando importan.",
  },
  {
    title: "El asesor sabe todo del catálogo al instante",
    body: "Precio, ficha técnica, comparativo con la competencia, argumentos de venta. Desde cualquier dispositivo, en cualquier conversación con un cliente.",
  },
  {
    title: "Sabes exactamente qué oportunidades estás perdiendo",
    body: "Qué distribuidor dejó de comprar qué producto. Qué zona tiene baja penetración. Qué SKU está cayendo. Todo con alerta automática antes de que sea tarde.",
  },
  {
    title: "Los clientes saben dónde está su pedido sin llamar",
    body: "Notificaciones proactivas por WhatsApp con el estatus real. El cliente que ya pagó recibe su actualización sin tener que llamar, y tu equipo no pierde tiempo respondiendo lo mismo.",
  },
  {
    title: "Los cobros incorrectos se detectan solos",
    body: "El sistema cruza las facturas contra los pedidos despachados. Las diferencias aparecen antes de pagar, no 90 días después.",
  },
];

const AHORA: { number: string; title: string; body: string }[] = [
  {
    number: "10x",
    title: "Más rápido",
    body: "Construir software a la medida hoy es 10 veces más rápido que hace 3 años. Lo que antes tomaba 6 meses ahora toma semanas. El costo bajó en la misma proporción.",
  },
  {
    number: "$15T",
    title: "USD en compras B2B manejadas por IA para 2028",
    body: "Gartner proyecta que para 2028, el 90% de las compras B2B serán gestionadas por agentes de IA. Tus distribuidores ya esperan respuesta inmediata.",
  },
  {
    number: "74%",
    title: "De empresas lucha para escalar IA",
    body: "BCG reporta que 74% de las empresas no logra escalar su implementación de IA. La diferencia entre las que sí lo logran: empezaron por entender su operación antes de construir.",
  },
];

const DIFERENCIADORES: { title: string; body: string }[] = [
  {
    title: "Entiendo primero, construyo después",
    body: "Antes de proponer nada, mapeo tu operación real — sin suposiciones. Entrevisto al equipo que ejecuta los procesos, no solo a la dirección.",
  },
  {
    title: "Todo proyecto sale con ROI calculado",
    body: "Sabes cuánto cuesta no resolverlo antes de saber cuánto cuesta resolverlo. Sin letra chica, sin sorpresas a la mitad del proyecto.",
  },
  {
    title: "El conocimiento queda dentro de tu empresa",
    body: "Trabajo con un AI Champion tuyo para que la transformación no dependa de mí. Si me voy, tu empresa sigue funcionando.",
  },
  {
    title: "Si no soy la solución, te lo digo",
    body: "Y te recomiendo quién sí puede ayudarte. Prefiero eso a vender un proyecto que no va a funcionar.",
  },
];

const POR_QUE_YO_STATS: { number: string; label: string }[] = [
  { number: "200+", label: "Proyectos con mi equipo en OMNA" },
  { number: "9", label: "Países" },
  { number: "10+", label: "Años de experiencia" },
];

/**
 * Credenciales — reemplaza los valores por los reales.
 * Coloca los archivos en /public/.
 */
const JOEL_PHOTO = {
  src: "/joel.png",
  alt: "Joel Suro — consultor en IA para distribuidoras y fabricantes",
};

const CLIENT_LOGOS: { name: string; src: string }[] = [
  { name: "Tu Marca Tenis", src: "/TUMARCATENIS.png" },
  { name: "Fundemex", src: "/FUNDEMEX.png" },
  { name: "Jagger", src: "/JAGGER.png" },
  { name: "Movistar", src: "/MOVISTAR.jpg" },
  { name: "Megaplus", src: "/MEGAPLUS.svg" },
  { name: "Illux", src: "/ILLUX.png" },
];

/* ---------- Hook: reveal on scroll ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      const id = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/* ---------- Subcomponents ---------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={[
        "transition-all duration-500 ease-out will-change-[opacity,transform]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-muted)]">
      {children}
    </p>
  );
}

function Stat({
  number,
  label,
  inverse = false,
}: {
  number: string;
  label: string;
  inverse?: boolean;
}) {
  return (
    <div>
      <div
        className={[
          "font-serif font-semibold leading-none text-6xl md:text-8xl",
          inverse ? "text-white" : "text-[color:var(--color-ink)]",
        ].join(" ")}
      >
        {number}
      </div>
      <div
        className={[
          "mt-3 md:mt-4 text-sm md:text-base",
          inverse ? "text-gray-400" : "text-[color:var(--color-muted)]",
        ].join(" ")}
      >
        {label}
      </div>
    </div>
  );
}

type CTAVariant = "primary" | "inverse" | "nav";

function CTAButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: CTAVariant;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center gap-3 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-ink)]";

  const variants: Record<CTAVariant, string> = {
    primary:
      "bg-[color:var(--color-ink)] text-white px-8 py-4 rounded-sm hover:bg-gray-800",
    inverse:
      "bg-white text-[color:var(--color-ink)] px-8 py-4 rounded-sm hover:bg-gray-100 focus-visible:ring-white",
    nav: "bg-[color:var(--color-ink)] text-white px-4 py-2 text-sm rounded-sm hover:bg-gray-800",
  };

  return (
    <a
      {...props}
      href={props.href ?? CTA_HREF}
      target={props.target ?? "_blank"}
      rel={props.rel ?? "noopener noreferrer"}
      className={[base, variants[variant], className].join(" ")}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

/* ---------- Page ---------- */

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = window.requestAnimationFrame(onScroll);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* SECCIÓN 1: NAV */}
      <header
        className={[
          "sticky top-0 z-50 bg-white/90 backdrop-blur border-b transition-shadow duration-200",
          scrolled
            ? "border-[color:var(--color-hairline)] shadow-sm"
            : "border-gray-100",
        ].join(" ")}
      >
        <nav
          aria-label="Principal"
          className="max-w-6xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between gap-6"
        >
          <a
            href="#hero"
            className="-ml-1 md:-ml-2 font-bold text-base md:text-lg tracking-wide text-[color:var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-ink)] rounded-sm"
          >
            JSV
          </a>

          <ul className="hidden md:flex items-center gap-8 text-sm text-[color:var(--color-ink)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-[color:var(--color-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-ink)] rounded-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto">
            <CTAButton variant="nav" href={CTA_HREF}>
              Agendar 30 minutos
            </CTAButton>
          </div>
        </nav>
      </header>

      <main>
        {/* SECCIÓN 2: HERO */}
        <section
          id="hero"
          aria-labelledby="hero-title"
          className="min-h-screen flex items-center bg-white"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 w-full">
            <Reveal>
              <SectionLabel>
                Joel Suro Villalobos · Consultoría en IA para distribuidoras y
                fabricantes
              </SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h1
                id="hero-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-[color:var(--color-ink)] max-w-5xl"
              >
                El <span className="font-serif font-normal">70%</span> de tus
                pedidos llegan por WhatsApp. El{" "}
                <span className="font-serif font-normal">100%</span> se capturan
                a mano. Y probablemente ya sabes que eso te está costando.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 md:mt-10 text-lg md:text-xl text-[color:var(--color-muted)] max-w-3xl leading-relaxed">
                He visto esta escena en más de 200 empresas en LATAM. La
                pregunta no es si se puede automatizar — es en qué orden, con
                qué tecnología, y cuánto debería costar. En 30 minutos te lo
                digo.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10">
                <CTAButton href={CTA_HREF}>
                  Agendar 30 minutos conmigo
                </CTAButton>
                <p className="mt-4 text-sm text-[color:var(--color-muted)]">
                  Sin pitch. Sin presentación. Solo preguntas y respuestas
                  concretas.
                </p>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pt-12 border-t border-[color:var(--color-hairline)]">
                {HERO_STATS.map((s) => (
                  <Stat key={s.label} number={s.number} label={s.label} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECCIÓN 3: STATUS QUO */}
        <section
          id="problema"
          aria-labelledby="problema-title"
          className="bg-[color:var(--color-cream)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>El día a día hoy</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="problema-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                Así opera tu empresa hoy. Y cuesta más de lo que parece.
              </h2>
            </Reveal>

            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <Reveal delay={120}>
                <h3 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                  Distribución B2B
                </h3>
                <ul className="mt-8 space-y-8">
                  {DISTRIBUCION_BULLETS.map((b, i) => (
                    <li
                      key={i}
                      className="text-base md:text-lg leading-relaxed text-gray-700 flex gap-4"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[color:var(--color-ink)] shrink-0"
                      >
                        —
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={200}>
                <h3 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                  Manufactura B2B
                </h3>
                <ul className="mt-8 space-y-8">
                  {MANUFACTURA_BULLETS.map((b, i) => (
                    <li
                      key={i}
                      className="text-base md:text-lg leading-relaxed text-gray-700 flex gap-4"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[color:var(--color-ink)] shrink-0"
                      >
                        —
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: EL COSTO REAL */}
        <section
          id="costo"
          aria-labelledby="costo-title"
          className="bg-white"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>El costo real</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="costo-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                No resolver esto tiene un precio todos los meses.
              </h2>
            </Reveal>

            <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
              {COSTOS.map((c, i) => (
                <Reveal key={c.number} delay={120 + i * 80}>
                  <div className="font-serif font-semibold leading-none text-7xl md:text-8xl text-[color:var(--color-ink)]">
                    {c.number}
                  </div>
                  <p className="mt-6 text-sm md:text-base leading-relaxed text-[color:var(--color-muted)]">
                    {c.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 5: TIERRA PROMETIDA */}
        <section
          id="otro-lado"
          aria-labelledby="otro-lado-title"
          className="bg-[color:var(--color-cream)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>La tierra prometida</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="otro-lado-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                Así se ve la operación del otro lado.
              </h2>
            </Reveal>

            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16">
              {TIERRA.map((item, i) => (
                <Reveal key={item.title} delay={120 + (i % 2) * 80}>
                  <article
                    className={[
                      "py-10 md:py-12 border-t border-[color:var(--color-hairline)] transition-colors duration-200 hover:bg-white/60 -mx-4 px-4 md:-mx-6 md:px-6 rounded-sm",
                    ].join(" ")}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 6: POR QUÉ AHORA */}
        <section
          id="ahora"
          aria-labelledby="ahora-title"
          className="bg-white"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>Por qué ahora</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="ahora-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                El mercado ya se está moviendo. Quien automatiza primero, gana.
              </h2>
            </Reveal>

            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {AHORA.map((item, i) => (
                <Reveal key={item.number} delay={120 + i * 80}>
                  <div className="font-serif font-semibold leading-none text-7xl md:text-8xl text-[color:var(--color-ink)]">
                    {item.number}
                  </div>
                  <h3 className="mt-6 text-xl md:text-2xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-[color:var(--color-muted)]">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 7: CASOS REALES */}
        <section
          id="resultados"
          aria-labelledby="resultados-title"
          className="bg-[color:var(--color-cream)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>Casos reales</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="resultados-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                Mismo contenido que he presentado en sala con directores y
                dueños.
              </h2>
            </Reveal>

            <div className="mt-16 md:mt-20 space-y-20 md:space-y-28">
              {/* Caso 1 — Distribución */}
              <Reveal delay={120}>
                <article className="max-w-3xl transition-colors duration-200 hover:bg-white/60 -mx-4 px-4 md:-mx-6 md:px-6 py-6 rounded-sm">
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-muted)]">
                    Caso real — Distribución
                  </p>
                  <h3 className="mt-5 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)]">
                    Distribuidora B2B con 400 distribuidores, 500 SKUs y 200
                    pedidos diarios.
                  </h3>

                  <div className="mt-10 space-y-8">
                    <div>
                      <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                        El problema
                      </h4>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-700">
                        6 personas capturando pedidos manualmente en SAP desde
                        WhatsApp, correo y llamadas. El 70% del volumen llegaba
                        por canales no estructurados. Al cierre del mes siempre
                        quedaban pedidos sin procesar y dinero sin facturar. Las
                        facturas de flotilla se revisaban trimestralmente —
                        cuando ya habían pasado.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                        Lo que construimos
                      </h4>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-700">
                        Un agente de IA que lee los canales de entrada, extrae
                        la información del pedido, verifica inventario en SAP en
                        tiempo real y crea la orden automáticamente. Una
                        auditoría automatizada cruza las facturas de flotilla
                        contra los pedidos despachados al cierre de cada semana.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                        El resultado
                      </h4>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-700">
                        200 pedidos diarios procesados sin intervención humana.
                        El equipo de atención pasó de capturar a resolver
                        excepciones. $400,000 MXN recuperados en el primer
                        trimestre de facturas incorrectas. ROI del proyecto
                        recuperado en menos de 6 meses.
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>

              {/* Caso 2 — Manufactura */}
              <Reveal delay={160}>
                <article className="max-w-3xl transition-colors duration-200 hover:bg-white/60 -mx-4 px-4 md:-mx-6 md:px-6 py-6 rounded-sm">
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-muted)]">
                    Caso real — Manufactura
                  </p>
                  <h3 className="mt-5 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)]">
                    Fabricante con red de distribuidores, productos
                    configurables y servicio técnico.
                  </h3>

                  <div className="mt-10 space-y-8">
                    <div>
                      <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                        El problema
                      </h4>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-700">
                        Los asesores buscaban fichas técnicas manualmente para
                        cada cotización. Los tickets de servicio técnico
                        llegaban sin filtro — preguntas básicas consumían el
                        tiempo de los técnicos especializados. Los clientes
                        llamaban para saber dónde estaba su pedido y nadie tenía
                        la respuesta en tiempo real.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                        Lo que construimos
                      </h4>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-700">
                        Un asistente RAG entrenado sobre todo el catálogo de
                        productos que responde al asesor en lenguaje natural —
                        fichas, comparativos, argumentos de venta contra la
                        competencia. Un agente de filtro de tickets que hace el
                        diagnóstico inicial y solo escala al técnico los casos
                        que lo requieren.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-ink)]">
                        El resultado
                      </h4>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-700">
                        −80% en tiempo de búsqueda de información técnica por
                        parte del equipo de ventas. Onboarding de vendedores
                        nuevos reducido de meses a días. Los técnicos atienden
                        exclusivamente casos que requieren su criterio. El
                        distribuidor recibe respuesta en minutos, no en horas.
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECCIÓN 8: POR QUÉ YO */}
        <section
          id="porque-yo"
          aria-labelledby="porque-yo-title"
          className="bg-white"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>Por qué yo</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="porque-yo-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                No llego con una solución. Llego a entender tu negocio.
              </h2>
            </Reveal>

            {/* Bio + foto editorial */}
            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
              <Reveal delay={160} className="md:col-span-7">
                <div className="space-y-6 text-base md:text-lg leading-relaxed text-[color:var(--color-ink)]">
                  <p>
                    Soy Joel Suro, cofundador y arquitecto técnico de{" "}
                    <a
                      href="https://www.omna.club/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="underline decoration-[color:var(--color-hairline)] underline-offset-4 hover:decoration-[color:var(--color-ink)] transition-colors"
                    >
                      OMNA
                    </a>
                    . Llevo más de 10 años diseñando y construyendo sistemas
                    para empresas medianas en LATAM, especialmente en entornos
                    donde la operación, los datos y la toma de decisiones
                    necesitan escalar.
                  </p>
                  <p>
                    Emprendedor y consultor en IA para distribuidoras y
                    fabricantes B2B en México y LATAM. Experiencia en mapeo de
                    procesos, transformación digital, inteligencia artificial y
                    Big Data.
                  </p>
                  <p>
                    Mi enfoque en IA es práctico: no se trata de implementar
                    tecnología por moda, sino de identificar dónde realmente
                    impacta el negocio — en eficiencia operativa, márgenes o
                    crecimiento.
                  </p>
                  <p>
                    Trabajo con equipos de distribuidores y fabricantes para
                    convertir datos en decisiones accionables y automatizar
                    procesos clave. Desde forecasting y optimización de
                    inventario hasta copilotos internos que sí se usan en el
                    día a día.
                  </p>
                  <p>
                    Mi objetivo es simple: que tu inversión en IA mueva números
                    reales — no que termine en un piloto bonito o en un chatbot
                    que nadie usa.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200} className="md:col-span-5">
                <div className="max-w-sm mx-auto md:max-w-none">
                  <div className="relative aspect-[4/5] w-full bg-[color:var(--color-cream)] overflow-hidden rounded-sm">
                    <Image
                      src={JOEL_PHOTO.src}
                      alt={JOEL_PHOTO.alt}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Logo wall — validación social */}
            <Reveal delay={280}>
              <div className="mt-20 md:mt-28 pt-12 border-t border-[color:var(--color-hairline)]">
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-muted)]">
                  Empresas que han confiado en mi trabajo
                </p>
                <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-10 items-center">
                  {CLIENT_LOGOS.map((logo) => (
                    <li
                      key={logo.name}
                      className="flex items-center justify-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="max-h-8 md:max-h-10 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Diferenciadores */}
            <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12 md:gap-y-16">
              {DIFERENCIADORES.map((d, i) => (
                <Reveal key={d.title} delay={320 + i * 80}>
                  <div className="pt-8 border-t border-[color:var(--color-hairline)]">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)]">
                      {d.title}
                    </h3>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">
                      {d.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={640}>
              <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pt-12 border-t border-[color:var(--color-hairline)]">
                {POR_QUE_YO_STATS.map((s) => (
                  <Stat key={s.label} number={s.number} label={s.label} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECCIÓN 9: CTA FINAL */}
        <section
          id="cta-final"
          aria-labelledby="cta-final-title"
          className="bg-[color:var(--color-ink)] text-white"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-32 md:py-40 flex flex-col items-center text-center">
            <Reveal>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-gray-400">
                Joel Suro Villalobos
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="cta-final-title"
                className="mt-6 md:mt-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white"
              >
                Una sola pregunta.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-2xl">
                ¿Hay alguno de estos procesos que esté costándote hoy?
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-400 max-w-2xl">
                Si la respuesta es sí, vale la pena una conversación de 30
                minutos. Sin presentación, sin pitch. Entendemos tu caso y te
                digo si puedo ayudarte o no.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-12">
                <CTAButton variant="inverse" href={CTA_HREF}>
                  Agendar 30 minutos
                </CTAButton>
              </div>
            </Reveal>

          </div>
        </section>
      </main>
    </>
  );
}
