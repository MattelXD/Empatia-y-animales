// DISEÑO Y ESTÍMULOS: construye la secuencia de ensayos. No toca el DOM ni guarda datos.
import { ANIMALES } from "./config.js";

export const porId = Object.fromEntries(ANIMALES.map(a => [a.id, a]));

/** Generador pseudoaleatorio con semilla (mulberry32): la secuencia de cada participante es reproducible. */
export function crearRng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function barajar(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Falla temprano si el diseño tiene errores (ids desconocidos, parejas de un mismo animal). */
export function validarDiseno(parejas) {
  parejas.forEach(([x, y], i) => {
    if (!porId[x] || !porId[y]) throw new Error(`Pareja ${i}: animal desconocido (${x}, ${y})`);
    if (x === y) throw new Error(`Pareja ${i}: el mismo animal en ambos lados`);
  });
}

/**
 * Orden aleatorio de parejas y lado contrabalanceado: exactamente la mitad
 * (±1) de las parejas se presenta con A a la izquierda y la otra mitad con B.
 */
export function construirEnsayos(parejas, rng) {
  const volteo = barajar(parejas.map((_, i) => i % 2 === 0), rng);
  const ensayos = parejas.map(([a, b], i) => ({
    parejaId: i, izq: volteo[i] ? b : a, der: volteo[i] ? a : b,
  }));
  return barajar(ensayos, rng);
}

export const animalesUsados = ensayos => [...new Set(ensayos.flatMap(e => [e.izq, e.der]))];
export const especiesUsadas = ids => [...new Set(ids.map(id => porId[id].especie))];

export function imgSrc(a) {
  return a.img || "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#cfd8d2"/>` +
    `<text x="200" y="160" font-size="110" text-anchor="middle">${a.emoji}</text>` +
    `<text x="200" y="270" font-size="18" text-anchor="middle" font-family="sans-serif" fill="#445">Imagen de ejemplo</text></svg>`);
}

/** Descarga todas las imágenes antes de empezar para que no haya cargas durante la medición de tiempos. */
export async function precargar(ids) {
  const fallos = await Promise.all(ids.map(id => new Promise(res => {
    const im = new Image();
    im.onload = () => res(null);
    im.onerror = () => res(id);
    im.src = imgSrc(porId[id]);
  })));
  return fallos.filter(Boolean);
}
