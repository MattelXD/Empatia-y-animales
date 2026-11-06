// ANÁLISIS: variables derivadas y exportación CSV. Funciones puras, sin efectos secundarios.
import { CONFIG } from "./config.js";
import { porId } from "./estimulos.js";

const PUNTOS = Object.fromEntries(CONFIG.tiers.map(([t, , p]) => [t, p]));

/** Añade a cada ensayo atractivo, inteligencia y peligrosidad de los dos animales. */
export function derivar({ ensayos, tiers, valoraciones }) {
  return ensayos.map(e => {
    const bE = PUNTOS[tiers[e.elegido]], bR = PUNTOS[tiers[e.rechazado]];
    const sE = porId[e.elegido].especie, sR = porId[e.rechazado].especie;
    const iE = valoraciones[sE].inteligencia, iR = valoraciones[sR].inteligencia;
    const pE = valoraciones[sE].peligrosidad, pR = valoraciones[sR].peligrosidad;
    // Diferencias orientadas por posición (izquierda − derecha): no dependen de la elección,
    // por lo que sirven como predictores de la elección sin circularidad.
    const at = (id, f) => f(porId[id].especie);
    const dIzqDer = (f) => (f === "belleza" ? PUNTOS[tiers[e.izquierda]] - PUNTOS[tiers[e.derecha]]
      : at(e.izquierda, s => valoraciones[s][f]) - at(e.derecha, s => valoraciones[s][f]));
    return {
      ...e,
      elige_izquierda: Number(e.lado === "izquierda"),
      especie_elegida: sE, especie_rechazada: sR,
      belleza_elegido: bE, belleza_rechazado: bR,
      dif_belleza: bE - bR,                                 // elegido menos rechazado
      elige_mas_bonito: bE === bR ? null : Number(bE > bR), // null = empate (se excluye en H1)
      inteligencia_elegida: iE, inteligencia_rechazada: iR,
      peligrosidad_elegida: pE, peligrosidad_rechazada: pR,
      d_belleza_izq_der: dIzqDer("belleza"), d_inteligencia_izq_der: dIzqDer("inteligencia"),
      d_peligrosidad_izq_der: dIzqDer("peligrosidad"),
    };
  });
}

const COLUMNAS = ["participante", "orden", "parejaId", "izquierda", "derecha", "elegido", "rechazado", "lado",
  "elige_izquierda", "rt_ms", "especie_elegida", "especie_rechazada", "belleza_elegido", "belleza_rechazado",
  "dif_belleza", "elige_mas_bonito", "inteligencia_elegida", "inteligencia_rechazada",
  "peligrosidad_elegida", "peligrosidad_rechazada", "d_belleza_izq_der", "d_inteligencia_izq_der",
  "d_peligrosidad_izq_der"];

export function aCSV(d) {
  const filas = d.ensayos.map(e => COLUMNAS.map(c =>
    c === "participante" ? d.participante : e[c] ?? ""));
  return [COLUMNAS.join(","), ...filas.map(f => f.join(","))].join("\n");
}
