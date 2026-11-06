import { CONFIG } from "../config.js";

/** Consentimiento, instrucciones y datos opcionales. Resuelve con el perfil. */
export function vistaIntro(root) {
  return new Promise(resolve => {
    root.innerHTML = `
      <h1>${CONFIG.titulo}</h1>
      <p>Verás parejas de animales que necesitan ayuda. En cada una, elige a cuál ayudarías: haz clic en la imagen o usa las flechas del teclado. Al final ordenarás los animales según lo bonitos que te parezcan y valorarás cada especie.</p>
      <p class="mut">Dura unos 5 minutos. No hay respuestas correctas ni incorrectas. La participación es voluntaria y anónima, y puedes salir cerrando la página.</p>
      <label style="display:flex;gap:8px;align-items:flex-start;margin-top:18px"><input type="checkbox" id="ok" style="margin-top:5px"> Acepto participar voluntariamente y que mis respuestas anónimas se usen con fines de investigación.</label>
      <div class="actions"><button id="go" disabled>Comenzar</button></div>`;
    const $ = s => root.querySelector(s);
    $("#ok").onchange = e => { $("#go").disabled = !e.target.checked; };
    $("#go").onclick = () => resolve();
  });
}
