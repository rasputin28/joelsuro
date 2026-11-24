// Ilustraciones isométricas de la marca (docs/DESIGN.md). Uso: node scripts/escena.mjs
// Genera public/escena.svg (encabezado), public/escena-fabrica.svg y public/escena-escudo.svg (tarjetas).
import { writeFileSync } from "node:fs";

const C = {
  top: "#2B4A8C", left: "#16295A", right: "#1E3670", roof: "#3A5FA8",
  signal: "#22D3EE", safety: "#F5B544", edge: "#5B7FD0",
};
const S = 29, COS = Math.cos(Math.PI / 6), OX = 560, OY = 40;
const P = (x, y, z = 0) => [OX + (x - y) * S * COS, OY + (x + y) * S * 0.5 - z * S];
const pts = (a) => a.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");

function escena(piezas, viewBox) {
  const out = [];
  const poly = (a, fill) =>
    out.push(`<polygon points="${pts(a)}" fill="${fill}" stroke="${C.edge}" stroke-opacity=".35"/>`);
  const box = (x, y, w, d, h, col = {}, z = 0) => {
    const H = z + h;
    poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, H), P(x, y + d, H)], col.left || C.left);
    poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, H), P(x + w, y, H)], col.right || C.right);
    poly([P(x, y, H), P(x + w, y, H), P(x + w, y + d, H), P(x, y + d, H)], col.top || C.top);
  };
  const trace = (path, color = C.signal) =>
    out.push(`<polyline points="${pts(path.map(([x, y]) => P(x, y)))}" fill="none" stroke="${color}" stroke-width="2" stroke-opacity=".75" filter="url(#g)"/>`);
  const node = (x, y, color = C.signal) => {
    const [a, b] = P(x, y);
    out.push(`<ellipse cx="${a}" cy="${b}" rx="8.5" ry="5" fill="${color}" filter="url(#g)"/>`);
  };
  const amber = { top: C.safety, left: "#B07A1E", right: "#D3972F" };

  const lib = {
    reticula() {
      for (let i = 0; i <= 20; i += 2) {
        out.push(`<line x1="${P(i, 0)[0]}" y1="${P(i, 0)[1]}" x2="${P(i, 20)[0]}" y2="${P(i, 20)[1]}" stroke="${C.edge}" stroke-opacity=".12"/>`);
        out.push(`<line x1="${P(0, i)[0]}" y1="${P(0, i)[1]}" x2="${P(20, i)[0]}" y2="${P(20, i)[1]}" stroke="${C.edge}" stroke-opacity=".12"/>`);
      }
    },
    circuito() {
      trace([[0, 16], [2, 16], [2, 12], [3, 12]]); trace([[6, 11.5], [8, 11.5], [8, 8]]);
      trace([[9, 4], [13, 4], [13, 9.5], [18, 9.5], [18, 4]]); trace([[10, 13], [10, 18], [15, 18]]);
      trace([[1, 1], [1, 6], [3, 6]]); trace([[17, 13], [20, 13]]);
      [[0, 16], [8, 8], [9, 4], [18, 4], [10, 13], [15, 18], [1, 1], [20, 13]].forEach(([x, y]) => node(x, y));
    },
    fabrica() {
      box(3, 2, 6, 4, 3);
      box(4, 2.3, 0.7, 0.7, 3.4, { top: C.roof }, 3); box(5.6, 2.3, 0.7, 0.7, 2.6, { top: C.roof }, 3);
      for (let k = 0; k < 3; k++) {
        const x = 3 + k * 2;
        poly([P(x, 2, 3), P(x, 6, 3), P(x + 2, 6, 4.4), P(x + 2, 2, 4.4)], C.roof);
        poly([P(x + 2, 2, 3), P(x + 2, 6, 3), P(x + 2, 6, 4.4), P(x + 2, 2, 4.4)], C.right);
      }
    },
    banda() {
      box(10.6, 4.4, 1, 1, 0.8, { top: C.roof });
      const a = P(11.1, 4.9, 0.8), b = P(11.6, 5.6, 2.6), c = P(12.4, 6.4, 2.0);
      out.push(`<polyline points="${pts([a, b, c])}" fill="none" stroke="${C.edge}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`);
      out.push(`<circle cx="${b[0]}" cy="${b[1]}" r="5" fill="${C.signal}" filter="url(#g)"/>`);
      box(9.5, 6, 7, 1.2, 0.6);
      [10.2, 12.2, 14.2].forEach((x) => box(x, 6.2, 1, 0.8, 1.4, amber));
    },
    chip() {
      box(3, 10, 3, 3, 0.8, { top: "#14284F" });
      out.push(`<polygon points="${pts([P(3.6, 10.6, 0.81), P(5.4, 10.6, 0.81), P(5.4, 12.4, 0.81), P(3.6, 12.4, 0.81)])}" fill="none" stroke="${C.signal}" stroke-width="2" filter="url(#g)"/>`);
    },
    almacen() {
      box(12, 11, 5, 4, 2.2);
      box(12.6, 15.4, 1.6, 0.9, 0.9, { top: C.roof }); box(14.6, 15.4, 1.6, 0.9, 0.9, { top: C.roof });
    },
    escudo() {
      trace([[17, 9.5], [17, 15]], C.safety); node(17, 15, C.safety);
      const [x, y] = P(17, 15, 3.2), [a, b] = P(17, 15, 0);
      out.push(`<line x1="${a}" y1="${b}" x2="${x}" y2="${y + 28}" stroke="${C.safety}" stroke-dasharray="3 5" stroke-opacity=".7"/>`);
      out.push(`<g transform="translate(${x - 22},${y - 26})" filter="url(#g)"><path d="M22 0 L44 8 V24 C44 38 34 48 22 54 C10 48 0 38 0 24 V8 Z" fill="#0B1E46" stroke="${C.safety}" stroke-width="3"/><path d="M12 27 L20 35 L33 19" fill="none" stroke="${C.safety}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`);
    },
  };
  piezas.forEach((p) => lib[p]());
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><defs><filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${out.join("")}</svg>`;
}

const todo = ["reticula", "circuito", "fabrica", "chip", "banda", "almacen", "escudo"];
writeFileSync("public/escena.svg", escena(todo, "230 -60 740 600"));
writeFileSync("public/escena-fabrica.svg", escena(["reticula", "fabrica", "banda"], "460 -70 420 470"));
writeFileSync("public/escena-escudo.svg", escena(["reticula", "almacen", "escudo"], "420 280 380 250"));
console.log("ok");
