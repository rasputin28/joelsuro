# DESIGN.md — joelsuro.com

Estilo: **editorial ejecutivo**. Elegido por Joel el 2026-11-23 (frente a «industrial técnico» y «oscuro de ingeniería»).
Propósito (decidido por Joel el 2026-11-23): **perfil público, no página de ventas**. CTO de OMNA · Estrategia en
AI Safety México · investigación. Sin CTA de venta; contacto discreto al final.

## Principios
1. Se lee como una publicación seria, no como una startup: mucho blanco, serif grande, pocas cosas por pantalla.
2. Un solo color de acento (marino). Nada de verdes de WhatsApp ni degradados.
3. Las cifras y los papers son la prueba; el diseño no la adorna.

## Tokens (`app/globals.css`)
| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#0A1F44` marino | títulos, botones, sección de contacto |
| `--color-body` | `#1F2937` | texto corrido |
| `--color-muted` | `#5B6472` | etiquetas, metadatos |
| `--color-cream` | `#F6F5F1` | secciones alternas |
| `--color-hairline` | `#E3E5EA` | divisores |

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
