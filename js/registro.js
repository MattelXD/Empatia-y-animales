// REGISTRO DE RESPUESTAS: acumula los datos de la sesión. No conoce el DOM ni el almacenamiento.
import { VERSION } from "./config.js";

export class Registro {
  constructor(seed) {
    this.datos = {
      version: VERSION,
      participante: crypto.randomUUID(),
      seed,
      inicio: new Date().toISOString(),
      fin: null,
      completo: false,
      entorno: {
        userAgent: navigator.userAgent,
        pantalla: [innerWidth, innerHeight],
        dpr: devicePixelRatio,
        tactil: "ontouchstart" in window,
        idioma: navigator.language,
      },
      ensayos: [],
      tiers: null,
      valoraciones: null,
    };
  }
  ensayo(e)         { this.datos.ensayos.push(e); }
  tiers(t)          { this.datos.tiers = t; }
  valoraciones(v)   { this.datos.valoraciones = v; }
  cerrar()          { this.datos.fin = new Date().toISOString(); this.datos.completo = true; return this.datos; }
}
