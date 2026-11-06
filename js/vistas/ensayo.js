import { CONFIG } from "../config.js";
import { porId, imgSrc } from "../estimulos.js";
import { barra, esperar, trasPintar } from "./ui.js";

const tarjeta = (a, lado) => `
  <button class="pick" data-id="${a.id}" data-lado="${lado}" aria-label="Elegir ${a.nombre}">
    <img src="${imgSrc(a)}" alt="${a.nombre} que necesita ayuda"><span>${a.nombre}</span>
  </button>`;

/** Un ensayo: fijación, par de imágenes y respuesta. Resuelve con el registro del ensayo. */
export async function vistaEnsayo(root, e, i, n) {
  root.innerHTML = `${barra(i / n * 100)}<p class="fijacion" aria-hidden="true">+</p>`;
  await esperar(CONFIG.itiMs);

  root.innerHTML = `${barra(i / n * 100)}
    <p class="q">${CONFIG.pregunta}</p>
    <div class="pair">${tarjeta(porId[e.izq], "izquierda")}${tarjeta(porId[e.der], "derecha")}</div>
    <p class="mut centro">Ensayo ${i + 1} de ${n}. Puedes responder con las flechas ← →.</p>`;
  const t0 = await trasPintar();

  return new Promise(resolve => {
    const responder = lado => {
      const rt = performance.now() - t0;
      if (rt < CONFIG.bloqueoMs) return;            // clic accidental: se ignora
      document.removeEventListener("keydown", tecla);
      resolve({
        orden: i + 1, parejaId: e.parejaId, izquierda: e.izq, derecha: e.der,
        elegido: lado === "izquierda" ? e.izq : e.der,
        rechazado: lado === "izquierda" ? e.der : e.izq, lado, rt_ms: Math.round(rt),
      });
    };
    const tecla = ev => {
      if (ev.key === "ArrowLeft") responder("izquierda");
      if (ev.key === "ArrowRight") responder("derecha");
    };
    document.addEventListener("keydown", tecla);
    root.querySelectorAll(".pick").forEach(b => { b.onclick = () => responder(b.dataset.lado); });
  });
}

/** Pausa voluntaria para reducir la fatiga. */
export function vistaPausa(root, hechos, total) {
  return new Promise(resolve => {
    root.innerHTML = `${barra(hechos / total * 100)}
      <h2>Pausa breve</h2>
      <p>Llevas ${hechos} de ${total} parejas. Descansa un momento y continúa cuando quieras.</p>
      <div class="actions"><button id="seguir">Continuar</button></div>`;
    root.querySelector("#seguir").onclick = resolve;
  });
}
