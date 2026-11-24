# DESIGN.md — joelsuro.com

Estilo: **editorial ejecutivo**. Elegido por Joel el 2026-11-23 (frente a «industrial técnico» y «oscuro de ingeniería»).
Propósito (decidido por Joel el 2026-11-23): **perfil público, no página de ventas**. CTO de OMNA · Estrategia en
AI Safety México · investigación. Sin CTA de venta; contacto discreto al final.

## Principios
1. Se lee como una publicación seria, no como una startup: mucho blanco, serif grande, pocas cosas por pantalla.
2. Marino como base; cian (IA) y ámbar (seguridad) sólo en ilustración, etiquetas y acentos. Nada de degradados.
3. Las cifras y los papers son la prueba; el diseño no la adorna.

## Tokens (`app/globals.css`)
| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#0A1F44` marino | títulos, botones, sección de contacto |
| `--color-body` | `#1F2937` | texto corrido |
| `--color-muted` | `#5B6472` | etiquetas, metadatos |
| `--color-cream` | `#F6F5F1` | secciones alternas |
| `--color-hairline` | `#E3E5EA` | divisores |
| `--color-night` | `#071430` | encabezado, barra, fondos de ilustración |
| `--color-signal` | `#22D3EE` cian | circuitos / IA y agentes |
| `--color-safety` | `#F5B544` ámbar | AI safety (color de señalización industrial) |

## Ilustración (2026-11-24)
Isométrica propia, generada por `scripts/escena.mjs` → `public/escena*.svg`: fábrica, banda con brazo
robótico, almacén, chip de IA y escudo, unidos por circuitos. Cian = IA, ámbar = seguridad.
Se regenera con `node scripts/escena.mjs`; los colores viven en el objeto `C` del script.
Mockup aprobado: `docs/mockups/2026-11-24-hero-marca.png`.

## Tipografía
- Títulos (h1–h3): **Fraunces** (serif), peso 600, tracking −0.02em.
- Texto y UI: **Inter**.
- Etiquetas de sección: Inter, mayúsculas, tracking 0.2em, `--color-muted`.

## Componentes
- Botón primario: fondo marino, texto blanco, esquinas 2px.
- Botón en sección oscura (`inverse`): fondo blanco, texto marino.
- Enlaces de texto: subrayado fino `--color-hairline`, se oscurece al pasar.
- Foto: cuadrada, 208px, nunca mayor a la mitad de su resolución nativa.

## Lo que no se hace
- Colores fuera de los tokens.
- Más de un CTA por sección.
- Imágenes estiradas por encima de su resolución.
