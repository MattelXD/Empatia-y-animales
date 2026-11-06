// Utilidades compartidas por las vistas.
export const esperar = ms => new Promise(r => setTimeout(r, ms));
export const barra = p => `<div class="bar" role="progressbar" aria-valuenow="${Math.round(p)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;
/** Resuelve con el instante (performance.now) en que el navegador ya pintó la pantalla. */
export const trasPintar = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(performance.now()))));
