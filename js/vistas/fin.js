import { barra } from "./ui.js";

/**
 * Pantalla final. Recibe funciones (no conoce el almacenamiento):
 *   enviar(): Promise<{ok, motivo}>, bajarJSON(), bajarCSV().
 */
export async function vistaFin(root, { enviar, bajarJSON, bajarCSV }) {
  root.innerHTML = `${barra(100)}<h1>¡Gracias por participar!</h1><p id="estado" class="mut">Guardando tus respuestas…</p>
    <div class="actions"><button class="sec" id="reint" hidden>Reintentar envío</button>
    <button class="sec" id="j">Descargar JSON</button><button class="sec" id="c">Descargar CSV</button></div>`;
  const estado = root.querySelector("#estado"), reint = root.querySelector("#reint");
  root.querySelector("#j").onclick = bajarJSON;
  root.querySelector("#c").onclick = bajarCSV;

  const intentar = async () => {
    estado.className = "mut"; estado.textContent = "Guardando tus respuestas…"; reint.hidden = true;
    const r = await enviar();
    if (r.ok) estado.textContent = "Tus respuestas se enviaron correctamente.";
    else if (r.motivo === "sin_endpoint") estado.textContent = "Tus respuestas quedaron guardadas en este navegador.";
    else { estado.className = "err"; estado.textContent = "No se pudo enviar. Reintenta o descarga tus datos."; reint.hidden = false; }
  };
  reint.onclick = intentar;
  await intentar();
}
