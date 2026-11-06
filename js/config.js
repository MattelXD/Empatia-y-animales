// ============================================================
// CONFIGURACIÓN DEL EXPERIMENTO: único archivo que el investigador edita.
// ============================================================
export const VERSION = "1.0.0";

export const CONFIG = {
  titulo: "Estudio sobre decisiones de ayuda a animales",
  pregunta: "Ambos animales necesitan ayuda monetaria para un tratamiento, pero solo puedes salvar a uno de estos animales, ¿a cuál elegirías?",
  endpoint: "",        // URL que recibe el JSON por POST. Vacío = solo guardado local + descarga.
  itiMs: 500,          // pantalla de fijación entre ensayos (evita arrastre de respuesta)
  bloqueoMs: 300,      // respuestas más rápidas que esto se ignoran (clics accidentales)
  pausaCada: 10,       // pausa voluntaria cada N ensayos (fatiga)
  escala: 7,           // escala de valoración de inteligencia y peligrosidad (1..escala)
  // [código, etiqueta, puntos]. Los puntos son la medida numérica de atractivo.
  tiers: [["S","Muy bonito",5],["A","Bonito",4],["B","Neutro",3],["C","Poco bonito",2],["D","Nada bonito",1]],
};

// Estímulos. Si "img" está vacío se muestra un marcador. En el estudio real usa fotos
// con situación, gravedad de la necesidad y posibilidades de recuperación equivalentes.
export const ANIMALES = [
  {id:"panda",      nombre:"Panda",      especie:"panda",      emoji:"🐼", img:"imgs/panda.jpg"},
  {id:"koala",      nombre:"Koala",      especie:"koala",      emoji:"🐨", img:"imgs/koala.jpg"},
  {id:"perro",      nombre:"Perro",      especie:"perro",      emoji:"🐕", img:"imgs/dog.jpg"},
  {id:"delfin",     nombre:"Delfín",     especie:"delfín",     emoji:"🐬", img:"imgs/delfin.jpg"},
  {id:"gato",       nombre:"Gato",       especie:"gato",       emoji:"🐈", img:"imgs/gato.jpg"},
  {id:"cerdo",      nombre:"Cerdo",      especie:"cerdo",      emoji:"🐖", img:"imgs/cerdo.jpg"},
  {id:"rata",       nombre:"Rata",       especie:"rata",       emoji:"🐀", img:"imgs/rata.jpg"},
  {id:"arana",      nombre:"Araña",      especie:"araña",      emoji:"🕷️", img:""},
  {id:"conejo",     nombre:"Conejo",     especie:"conejo",     emoji:"🐇", img:"imgs/conejo.jpg"},
  {id:"lobo",       nombre: "Lobo",      especie:"Lobo",       emoji:"🐺", img:"imgs/lobo.jpg"},
  {id:"escarabajo", nombre: "Escarabajo", especie:"Escarabajo", emoji:"", img:"imgs/escarabajo.jpg"},
  {id:"mariposa",   nombre: "Mariposa",   especie:"Mariposa",   emoji:"", img:"imgs/mariposa.jpg"},
  {id:"tigre",      nombre: "Tigre",      especie:"Tigre",      emoji:"", img:"imgs/tigre.jpg"},
  {id:"vaca",       nombre: "Vaca",       especie:"Vaca",       emoji:"", img:"imgs/vaca.jpg"},
  {id:"tiburon",    nombre: "Tiburón",    especie:"Tiburón",    emoji:"", img:"imgs/tiburon.jpg"},

];

// Parejas [A, B]. Entre 20 y 30 en el estudio real.
export const PAREJAS = [
  ["panda","koala"],["panda","perro"],["panda", "cerdo"],["panda","rata"],
  ["koala","rata"],["koala","perro"],["delfin","tiburon"],["delfin", "koala"],
  ["perro","conejo"],["cerdo","conejo"],["perro","gato"],["perro","delfin"],
  ["gato","tigre"],["delfin","panda"],["cerdo","gato"],["gato","conejo"],
  ["rata","conejo"],["escarabajo","arana"],["escarabajo","rata"],
  ["lobo", "perro"],["lobo", "tigre"],["lobo", "cerdo"],["tigre", "tiburon"],
  ["mariposa","arana"],["mariposa","escarabajo"],["mariposa","rata"],["arana","rata"],
  ["vaca","cerdo"],["vaca","lobo"],["vaca","panda"],["tiburon","lobo"],
];
