// Textos del sitio por idioma. El español es la fuente; en/zh son traducciones
// (zh = chino simplificado; revisado por claridad, sin revisión nativa por decisión de Joel 2026-11-23).

const es = {
  htmlLang: "es",
  ogLocale: "es_MX",
  meta: {
    title: "Joel Suro | CTO de OMNA · Estrategia en AI Safety México",
    description:
      "Perfil de Joel Suro Villalobos: CTO de OMNA, estrategia en AI Safety México e investigación en confiabilidad de modelos de lenguaje.",
  },
  whatsappText: "Hola Joel, vengo de joelsuro.com. ",
  hero: {
    kicker: "Manufactura · Agentes de IA · AI safety",
    title: "IA que funciona en la operación real.",
    body: "CTO de OMNA, donde construimos agentes de IA para fabricantes y distribuidoras. Estrategia en AI Safety México, donde medimos cuándo fallan los modelos.",
  },
  nav: { about: "Sobre mí", work: "Qué hago", research: "Investigación", contact: "Contacto" },
  about: {
    label: "Sobre mí",
    photoAlt: "Joel Suro Villalobos",
    bio: [
      "Soy CTO de OMNA, donde diseñamos agentes de IA para distribuidoras y fabricantes en México y LATAM, y llevo la estrategia de AI Safety México.",
      "Vengo de la operación: mapeo de procesos, datos, transformación digital y manufactura. Me interesa que un agente funcione en el ERP y en el piso de la planta, no sólo en una demo.",
      "Del lado de la investigación me interesa saber cuándo un modelo de verdad sabe algo y cuándo acierta por suerte, y cómo medirlo antes de dejar que un agente actúe solo. También he trabajado con lenguas de pocos recursos, como el maya yucateco.",
    ],
    stats: ["Proyectos con mi equipo en OMNA", "Países", "Años de experiencia"],
  },
  work: {
    label: "Qué hago",
    title: "Dónde lo hago.",
    omna: {
      rol: "CTO",
      body: "Diseño y construyo agentes de IA que operan dentro de distribuidoras y fabricantes: leen pedidos, consultan el ERP y resuelven lo repetitivo para que el equipo atienda las excepciones.",
    },
    aismx: {
      rol: "Estrategia",
      org: "AI Safety México",
      body: "Llevo la estrategia de la comunidad que impulsa investigación técnica y de política en seguridad de IA en México: hackathons, cursos y estudios.",
    },
  },
  research: {
    label: "Investigación",
    title: "Construyo agentes, y también mido cuándo fallan.",
    intro: [
      "Investigo seguridad y confiabilidad de modelos de lenguaje con ",
      ". Lo que aprendo ahí es lo que aplico en ",
      " antes de poner un agente a operar en una empresa.",
    ],
    peer: "Revisado por pares",
    preprint: "Preprint · arXiv",
    iberamiaIssue: "vol. 28, núm. 76, 2025",
    apartDate: "noviembre 2026",
    readArticle: "Leer artículo",
    code: "Código",
    talk: "Charla en Apart",
    readArxiv: "Leer en arXiv",
  },
  contact: { title: "Hablemos.", whatsapp: "Escríbeme por WhatsApp" },
};

export type Dict = typeof es;

const en: Dict = {
  htmlLang: "en",
  ogLocale: "en_US",
  meta: {
    title: "Joel Suro | CTO at OMNA · Strategy at AI Safety Mexico",
    description:
      "Profile of Joel Suro Villalobos: CTO at OMNA, strategy at AI Safety Mexico, and research on language model reliability.",
  },
  whatsappText: "Hi Joel, I found you on joelsuro.com. ",
  hero: {
    kicker: "Manufacturing · AI agents · AI safety",
    title: "AI that works in real operations.",
    body: "CTO at OMNA, building AI agents for manufacturers and distributors. Strategy at AI Safety Mexico, measuring when models fail.",
  },
  nav: { about: "About", work: "What I do", research: "Research", contact: "Contact" },
  about: {
    label: "About",
    photoAlt: "Joel Suro Villalobos",
    bio: [
      "I'm CTO at OMNA, where we design AI agents for distributors and manufacturers in Mexico and Latin America, and I lead strategy at AI Safety Mexico.",
      "I come from operations: process mapping, data, digital transformation and manufacturing. I care about agents that work inside the ERP and on the plant floor, not just in a demo.",
      "On the research side, I want to know when a model actually knows something and when it is right by luck, and how to measure that before letting an agent act on its own. I have also worked on low-resource languages such as Yucatec Maya.",
    ],
    stats: ["Projects with my team at OMNA", "Countries", "Years of experience"],
  },
  work: {
    label: "What I do",
    title: "Where I do it.",
    omna: {
      rol: "CTO",
      body: "I design and build AI agents that run inside distributors and manufacturers: they read orders, query the ERP and handle the repetitive work so the team can focus on the exceptions.",
    },
    aismx: {
      rol: "Strategy",
      org: "AI Safety Mexico",
      body: "I lead strategy for the community that advances technical and policy research on AI safety in Mexico: hackathons, courses and studies.",
    },
  },
  research: {
    label: "Research",
    title: "I build agents, and I measure when they fail.",
    intro: [
      "I research the safety and reliability of language models with ",
      ". What I learn there is what I apply at ",
      " before putting an agent to work in a company.",
    ],
    peer: "Peer-reviewed",
    preprint: "Preprint · arXiv",
    iberamiaIssue: "vol. 28, no. 76, 2025",
    apartDate: "November 2026",
    readArticle: "Read article",
    code: "Code",
    talk: "Talk at Apart",
    readArxiv: "Read on arXiv",
  },
  contact: { title: "Let's talk.", whatsapp: "Message me on WhatsApp" },
};

const zh: Dict = {
  htmlLang: "zh-Hans",
  ogLocale: "zh_CN",
  meta: {
    title: "Joel Suro | OMNA 首席技术官 · AI Safety México 战略负责人",
    description:
      "Joel Suro Villalobos：OMNA 首席技术官，负责 AI Safety México 的战略，研究语言模型的可靠性。",
  },
  whatsappText: "Hi Joel, I found you on joelsuro.com. ",
  hero: {
    kicker: "制造业 · AI 智能体 · AI 安全",
    title: "在真实运营中发挥作用的 AI。",
    body: "OMNA 首席技术官，为制造商和分销商构建 AI 智能体。AI Safety México 战略负责人，研究模型何时失效。",
  },
  nav: { about: "关于我", work: "我的工作", research: "研究", contact: "联系" },
  about: {
    label: "关于我",
    photoAlt: "Joel Suro Villalobos",
    bio: [
      "我是 OMNA 的首席技术官（CTO）。OMNA 为墨西哥和拉丁美洲的分销商和制造商设计 AI 智能体。我同时负责 AI Safety México 的战略。",
      "我出身于运营一线：流程梳理、数据、数字化转型和制造业。我关心的是智能体能否在 ERP 系统和工厂车间里真正运行，而不只是在演示中好看。",
      "在研究方面，我关注两个问题：模型什么时候真正知道答案，什么时候只是碰巧答对；以及如何在让智能体自主行动之前测量这一点。我也做过低资源语言的研究，例如尤卡坦玛雅语。",
    ],
    stats: ["与 OMNA 团队完成的项目", "个国家", "年工作经验"],
  },
  work: {
    label: "我的工作",
    title: "我在哪里做这些。",
    omna: {
      rol: "首席技术官",
      body: "我设计并构建在分销商和制造商内部运行的 AI 智能体：读取订单、查询 ERP、处理重复性工作，让团队专注于例外情况。",
    },
    aismx: {
      rol: "战略",
      org: "AI Safety México",
      body: "我负责 AI Safety México 的战略。这个社区推动墨西哥在 AI 安全领域的技术研究和政策研究，形式包括黑客松、课程和研究项目。",
    },
  },
  research: {
    label: "研究",
    title: "我构建智能体，也测量它们何时失效。",
    intro: [
      "我与 ",
      " 一起研究语言模型的安全性与可靠性。我把在那里学到的方法用在 ",
      "：在智能体投入企业运营之前，先检验它是否可靠。",
    ],
    peer: "同行评审",
    preprint: "预印本 · arXiv",
    iberamiaIssue: "第 28 卷，第 76 期，2025",
    apartDate: "2026 年 11 月",
    readArticle: "阅读论文",
    code: "代码",
    talk: "Apart 演讲",
    readArxiv: "在 arXiv 阅读",
  },
  contact: { title: "联系我。", whatsapp: "通过 WhatsApp 联系我" },
};

export const dictionaries = { es, en, zh };
export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];
export const hasLocale = (l: string): l is Locale => l in dictionaries;
/** Ruta pública de cada idioma: el español vive en la raíz. */
export const localePath = (l: Locale) => (l === "es" ? "/" : `/${l}`);
