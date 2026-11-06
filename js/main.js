// ORQUESTADOR: máquina de estados lineal del experimento. Conecta los módulos y no contiene lógica propia.
import { CONFIG, PAREJAS } from "./config.js";
import { crearRng, validarDiseno, construirEnsayos, animalesUsados, especiesUsadas, precargar } from "./estimulos.js";
import { Registro } from "./registro.js";
import { derivar, aCSV } from "./analisis.js";
import { guardarLocal, enviar, descargar } from "./almacenamiento.js";
import { vistaIntro } from "./vistas/intro.js";
import { vistaEnsayo, vistaPausa } from "./vistas/ensayo.js";
import { vistaTier } from "./vistas/tier.js";
import { vistaValoracion } from "./vistas/valoracion.js";
import { vistaFin } from "./vistas/fin.js";

async function main() {
  const root = document.getElementById("app");
  try {
    validarDiseno(PAREJAS);
    const seed = crypto.getRandomValues(new Uint32Array(1))[0];
    const rng = crearRng(seed);
    const rec = new Registro(seed);
    addEventListener("pagehide", () => guardarLocal(rec.datos));   // sesiones abandonadas

    // 1. Consentimiento e instrucciones
    await vistaIntro(root);

    // 2. Diseño de la sesión y precarga de imágenes
    const ensayos = construirEnsayos(PAREJAS, rng);
    const ids = animalesUsados(ensayos);
    root.innerHTML = "<p class='mut centro'>Cargando imágenes…</p>";
    const fallos = await precargar(ids);
    if (fallos.length) throw new Error(`No se pudieron cargar las imágenes: ${fallos.join(", ")}`);

    // 3. Ensayos de elección forzada
    for (let i = 0; i < ensayos.length; i++) {
      if (i > 0 && i % CONFIG.pausaCada === 0) await vistaPausa(root, i, ensayos.length);
      rec.ensayo(await vistaEnsayo(root, ensayos[i], i, ensayos.length));
      guardarLocal(rec.datos);
    }

    // 4. Tier list de atractivo y valoración por especie
    rec.tiers(await vistaTier(root, ids, rng));
    rec.valoraciones(await vistaValoracion(root, especiesUsadas(ids)));

    // 5. Cierre, derivación de variables y guardado
    const datos = rec.cerrar();
    datos.ensayos = derivar(datos);
    guardarLocal(datos);
    await vistaFin(root, {
      enviar: () => enviar(datos, CONFIG.endpoint),
      bajarJSON: () => descargar(`resultado_${datos.participante}.json`, JSON.stringify(datos, null, 2), "application/json"),
      bajarCSV: () => descargar(`resultado_${datos.participante}.csv`, aCSV(datos), "text/csv"),
    });
  } catch (err) {
    console.error(err);
    root.innerHTML = `<h1>Ocurrió un problema</h1><p class="err">${err.message}</p><p>Recarga la página para intentarlo de nuevo.</p>`;
  }
}
main();
