import { CONFIG } from "../config.js";
import { porId, imgSrc, barajar } from "../estimulos.js";
import { barra } from "./ui.js";

/**
 * Tier list de atractivo. Toca un animal y luego una fila, o arrástralo.
 * El orden inicial del grupo sin clasificar es aleatorio. Resuelve con {id: letra}.
 */
export function vistaTier(root, ids, rng) {
  return new Promise(resolve => {
    const tiers = {};
    const inicial = barajar(ids, rng);
    let sel = null;

    const chip = id => `<div class="chip ${sel === id ? "sel" : ""}" draggable="true" tabindex="0" role="button"
      data-id="${id}" aria-label="${porId[id].nombre}"><img src="${imgSrc(porId[id])}" alt=""><div>${porId[id].nombre}</div></div>`;

    function pintar() {
      const pool = inicial.filter(id => !tiers[id]);
      root.innerHTML = `${barra(70)}
        <h2>Ordena los animales según lo bonitos que te parecen</h2>
        <p class="mut">Toca un animal y luego toca la fila donde quieres colocarlo, o arrástralo. Para quitarlo, tócalo y toca el recuadro de abajo. Debes colocarlos todos.</p>
        ${CONFIG.tiers.map(([t, l]) => `<div class="tier" data-t="${t}"><b>${t}<br>${l}</b><div>${inicial.filter(id => tiers[id] === t).map(chip).join("")}</div></div>`).join("")}
        <div class="pool" data-t="">${pool.map(chip).join("") || '<span class="mut" style="padding:8px">Todos colocados</span>'}</div>
        <div class="actions"><button id="sig" ${pool.length ? "disabled" : ""}>Continuar</button></div>`;

      root.querySelectorAll(".chip").forEach(c => {
        c.onclick = ev => { ev.stopPropagation(); sel = sel === c.dataset.id ? null : c.dataset.id; pintar(); };
        c.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); c.click(); } };
        c.ondragstart = ev => ev.dataTransfer.setData("text/plain", c.dataset.id);
      });
      root.querySelectorAll(".tier,.pool").forEach(z => {
        const poner = id => {
          if (!id) return;
          if (z.dataset.t) tiers[id] = z.dataset.t; else delete tiers[id];
          sel = null; pintar();
        };
        z.onclick = () => poner(sel);
        z.ondragover = ev => ev.preventDefault();
        z.ondrop = ev => { ev.preventDefault(); poner(ev.dataTransfer.getData("text/plain")); };
      });
      root.querySelector("#sig").onclick = () => resolve({ ...tiers });
    }
    pintar();
  });
}
