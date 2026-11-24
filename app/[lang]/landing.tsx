"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type AnchorHTMLAttributes,
} from "react";
import {
  locales,
  localePath,
  type Dict,
  type Locale,
} from "./dictionaries";

const whatsappHref = (text: string) =>
  `https://wa.me/525520729410?text=${encodeURIComponent(text)}`;

const LOCALE_LABEL: Record<Locale, string> = { es: "ES", en: "EN", zh: "中文" };

const trabajo = (t: Dict) => [
  {
    rol: t.work.omna.rol,
    org: "OMNA",
    href: "https://www.omna.club/",
    logo: "/logos/omna.png",
    body: t.work.omna.body,
  },
  {
    rol: t.work.aismx.rol,
    org: t.work.aismx.org,
    href: "https://www.aismx.org/",
    logo: "/logos/aismx.png",
    body: t.work.aismx.body,
  },
];


const STAT_NUMBERS = ["200+", "9", "5+"];

const investigacion = (t: Dict) => [
  {
    tipo: t.research.peer,
    title:
      "Generating a Culturally and Linguistically Adapted Word Similarity Benchmark for Yucatec Maya",
    meta: `Molina-Villegas, Suro-Villalobos, Reyes-Magaña, Fernandez-Sabido · Inteligencia Artificial (Iberamia), ${t.research.iberamiaIssue}`,
    links: [
      { href: "https://doi.org/10.4114/intartif.vol28iss76pp283-300", label: t.research.readArticle },
    ],
  },
  {
    tipo: "Apart Research · AI × Epistemics Sprint",
    title:
      "Right by Luck: Measuring When a Language Model's Correct Answer Is Not Knowledge",
    meta: `Suro Villalobos · AI Safety México · ${t.research.apartDate}`,
    links: [
      { href: "https://github.com/rasputin28/right-by-luck/blob/main/paper/paper.pdf", label: "Paper (PDF)" },
      { href: "https://github.com/rasputin28/right-by-luck", label: t.research.code },
      { href: "https://youtu.be/qvoIK3JVxtc", label: t.research.talk },
    ],
  },
  {
    tipo: t.research.preprint,
    title: "Semantic Tokens in Retrieval Augmented Generation",
    meta: "Suro Villalobos · arXiv:2412.02563 · 2024",
    links: [{ href: "https://arxiv.org/abs/2412.02563", label: t.research.readArxiv }],
  },
];
const SOCIAL_LINKS: { href: string; label: string }[] = [
  { href: "https://github.com/rasputin28", label: "GitHub" },
  { href: "https://www.youtube.com/@joelsuro", label: "YouTube" },
  { href: "https://www.linkedin.com/in/joelsuro", label: "LinkedIn" },
  {
    href: "https://www.instagram.com/joelsuroai?igsh=N3RpcHBxYTU0eDc4&utm_source=qr",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/profile.php?id=100064931460320",
    label: "Facebook",
  },
  {
    href: "https://www.tiktok.com/@joel.suro?_r=1&_t=ZS-95tJ0wpkwsC",
    label: "TikTok",
  },
];

const JOEL_PHOTO_SRC = "/joel-2026.jpg";

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
      "bg-[color:var(--color-ink)] text-white px-8 py-4 rounded-sm hover:bg-[#071530]",
    inverse:
      "bg-white text-[color:var(--color-ink)] px-8 py-4 rounded-sm hover:bg-gray-100 focus-visible:ring-white",
    nav: "bg-[color:var(--color-ink)] text-white px-4 py-2 text-sm rounded-sm hover:bg-[#071530]",
  };

  return (
    <a
      {...props}
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

export default function Landing({ lang, t }: { lang: Locale; t: Dict }) {
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

  const navLinks = [
    { href: "#sobre-mi", label: t.nav.about },
    { href: "#trabajo", label: t.nav.work },
    { href: "#investigacion", label: t.nav.research },
    { href: "#contacto", label: t.nav.contact },
  ];
  const wa = whatsappHref(t.whatsappText);

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
          className="max-w-6xl mx-auto px-6 md:px-12 py-5 flex items-center justify-end gap-6"
        >
          <a
            href={localePath(lang)}
            className="mr-auto font-serif text-lg md:text-xl font-semibold tracking-tight text-[color:var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-ink)] rounded-sm"
          >
            Joel Suro Villalobos
          </a>

          <ul className="hidden md:flex items-center gap-8 text-sm text-[color:var(--color-ink)]">
            {navLinks.map((link) => (
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

          <ul
            aria-label="Idioma / Language / 语言"
            className="flex items-center gap-1 text-sm md:pl-6 md:border-l border-[color:var(--color-hairline)]"
          >
            {locales.map((l) => (
              <li key={l}>
                <a
                  href={localePath(l)}
                  hrefLang={l === "zh" ? "zh-Hans" : l}
                  lang={l === "zh" ? "zh-Hans" : l}
                  aria-current={l === lang ? "page" : undefined}
                  className={[
                    "px-2 py-1 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ink)]",
                    l === lang
                      ? "font-semibold text-[color:var(--color-ink)] underline underline-offset-4"
                      : "text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]",
                  ].join(" ")}
                >
                  {LOCALE_LABEL[l]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* SECCIÓN 2: SOBRE MÍ (arriba: es perfil público, no página de ventas) */}
        <section
          id="sobre-mi"
          aria-labelledby="sobre-mi-title"
          className="bg-white"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <h1
                id="sobre-mi-title"
                className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                {t.about.label}
              </h1>
            </Reveal>

            {/* Bio + foto editorial */}
            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
              <Reveal delay={160} className="md:col-span-7">
                <div className="space-y-6 text-base md:text-lg leading-relaxed text-[color:var(--color-ink)]">
                  {t.about.bio.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={200} className="md:col-span-5">
                <div className="w-48 md:w-52 mx-auto md:mx-0">
                  <div className="relative aspect-square w-full bg-[color:var(--color-cream)] overflow-hidden rounded-sm">
                    <Image
                      src={JOEL_PHOTO_SRC}
                      alt={t.about.photoAlt}
                      fill
                      sizes="208px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={640}>
              <div className="mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pt-12 border-t border-[color:var(--color-hairline)]">
                {STAT_NUMBERS.map((n, i) => (
                  <Stat key={n} number={n} label={t.about.stats[i]} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECCIÓN 3: QUÉ HAGO */}
        <section
          id="trabajo"
          aria-labelledby="trabajo-title"
          className="bg-[color:var(--color-cream)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>{t.work.label}</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="trabajo-title" className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl">
                {t.work.title}
              </h2>
            </Reveal>
            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
              {trabajo(t).map((c, i) => (
                <Reveal key={c.org} delay={160 + i * 80}>
                  <div className="pt-8 border-t border-[color:var(--color-hairline)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.logo}
                      alt={c.org}
                      className="h-12 w-auto mb-6 mix-blend-multiply"
                    />
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-muted)]">
                      {c.rol}
                    </p>
                    <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)]">
                      <a
                        href={c.href}
                        {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                        className="hover:text-[color:var(--color-muted)] transition-colors"
                      >
                        {c.org}
                      </a>
                    </h3>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-[color:var(--color-body)]">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 8b: INVESTIGACIÓN */}
        <section
          id="investigacion"
          aria-labelledby="investigacion-title"
          className="bg-white border-t border-[color:var(--color-hairline)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
            <Reveal>
              <SectionLabel>{t.research.label}</SectionLabel>
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="investigacion-title"
                className="mt-6 md:mt-8 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)] max-w-4xl"
              >
                {t.research.title}
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 text-base md:text-lg leading-relaxed text-[color:var(--color-body)] max-w-3xl">
                {t.research.intro[0]}
                <a
                  href="https://www.aismx.org/"
                  target="_blank"
                  rel="noopener"
                  className="underline decoration-[color:var(--color-hairline)] underline-offset-4 hover:decoration-[color:var(--color-ink)] transition-colors"
                >
                  {t.work.aismx.org}
                </a>
                {t.research.intro[1]}
                <a
                  href="https://www.omna.club/"
                  target="_blank"
                  rel="noopener"
                  className="underline decoration-[color:var(--color-hairline)] underline-offset-4 hover:decoration-[color:var(--color-ink)] transition-colors"
                >
                  OMNA
                </a>
                {t.research.intro[2]}
              </p>
            </Reveal>

            <ul className="mt-16 md:mt-20 space-y-12">
              {investigacion(t).map((item, i) => (
                <li key={item.title}>
                <Reveal delay={240 + i * 80} className="pt-8 border-t border-[color:var(--color-hairline)]">
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[color:var(--color-muted)]">
                      {item.tipo}
                    </p>
                    <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[color:var(--color-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-[color:var(--color-body)]">
                      {item.meta}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {item.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener"
                          className="text-sm md:text-base font-medium underline decoration-[color:var(--color-hairline)] underline-offset-4 hover:decoration-[color:var(--color-ink)] transition-colors"
                        >
                          {l.label} →
                        </a>
                      ))}
                    </div>
                </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECCIÓN 9: CONTACTO */}
        <section
          id="contacto"
          aria-labelledby="contacto-title"
          className="bg-[color:var(--color-ink)] text-white"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 flex flex-col items-center text-center">
            <Reveal>
              <h2
                id="contacto-title"
                className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white"
              >
                {t.contact.title}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CTAButton variant="inverse" href={wa}>
                    {t.contact.whatsapp}
                  </CTAButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="bg-white border-t border-[color:var(--color-hairline)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-[color:var(--color-muted)]">
            Joel Suro Villalobos
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[color:var(--color-ink)] hover:text-[color:var(--color-muted)] transition-colors"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
