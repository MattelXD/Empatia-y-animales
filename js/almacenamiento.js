// ALMACENAMIENTO: guardado local, envío al servidor con reintentos y descarga de archivos.
const CLAVE = "exp_animales";

/** Copia de seguridad en el navegador (también guarda sesiones incompletas). */
export function guardarLocal(datos) {
  try { localStorage.setItem(`${CLAVE}:${datos.participante}`, JSON.stringify(datos)); } catch { /* cuota o modo privado */ }
}

/** POST como text/plain para evitar el preflight CORS (compatible con Google Apps Script). */
export async function enviar(datos, endpoint, intentos = 3) {
  if (!endpoint) return { ok: false, motivo: "sin_endpoint" };
  for (let k = 0; k < intentos; k++) {
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(datos) });
      if (r.ok) return { ok: true };
    } catch { /* se reintenta */ }
    await new Promise(res => setTimeout(res, 500 * 2 ** k));
  }
  return { ok: false, motivo: "red" };
}

export function descargar(nombre, texto, tipo) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([texto], { type: tipo }));
  a.download = nombre;
  a.click();
  URL.revokeObjectURL(a.href);
}
