import { CONFIG } from "../config.js";
import { barra } from "./ui.js";

const DIMENSIONES = [["inteligencia", "Inteligencia"], ["peligrosidad", "Peligrosidad"]];

/**
 * Valoración 1..escala de inteligencia y peligrosidad percibidas por especie.
 * No hay valor por defecto: hay que responder todo (evita confundir "no respondió" con "4").
 */
export function vistaValoracion(root, especies) {
  return new Promise(resolve => {
    const v = Object.fromEntries(especies.map(e => [e, {}]));
    const total = especies.length * DIMENSIONES.length;
    const escala = (e, k) => Array.from({ length: CONFIG.escala }, (_, j) =>
      `<button type="button" class="n sec" data-e="${e}" data-k="${k}" data-v="${j + 1}" aria-pressed="false">${j + 1}</button>`).join("");

    root.innerHTML = `${barra(90)}
      <h2>Un último paso: valora cada especie</h2>
      <p class="mut">Piensa en la especie en general, no en la imagen. 1 = nada, ${CONFIG.escala} = muchísimo.</p>
      ${especies.map(e => `<div class="rate"><h3 style="margin:.1em 0 .4em;text-transform:capitalize">${e}</h3>
        ${DIMENSIONES.map(([k, l]) => `<div class="row"><span>${l}</span><div class="esc" role="group" aria-label="${l} de ${e}">${escala(e, k)}</div></div>`).join("")}</div>`).join("")}
      <p class="err" id="falta"></p>
      <div class="actions"><button id="fin" disabled>Finalizar</button></div>`;

    const fin = root.querySelector("#fin"), falta = root.querySelector("#falta");
    root.querySelectorAll(".n").forEach(b => {
      b.onclick = () => {
        v[b.dataset.e][b.dataset.k] = +b.dataset.v;
        b.parentElement.querySelectorAll(".n").forEach(x => {
          const on = x === b;
          x.classList.toggle("on", on); x.setAttribute("aria-pressed", on);
        });
        const hechas = Object.values(v).reduce((s, o) => s + Object.keys(o).length, 0);
        fin.disabled = hechas < total;
        falta.textContent = hechas < total ? `Faltan ${total - hechas} respuestas.` : "";
      };
    });
    fin.onclick = () => resolve(v);
  });
}
