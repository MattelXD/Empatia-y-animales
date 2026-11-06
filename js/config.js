// ============================================================
// CONFIGURACIÓN DEL EXPERIMENTO: único archivo que el investigador edita.
// ============================================================
export const VERSION = "1.0.0";

export const CONFIG = {
  titulo: "Estudio sobre decisiones de ayuda a animales",
  pregunta: "Si solo pudieras salvar a uno de estos animales, ¿a cuál elegirías?",
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
  {id:"panda",      nombre:"Panda",      especie:"panda",      emoji:"🐼", img:""},
  {id:"koala",      nombre:"Koala",      especie:"koala",      emoji:"🐨", img:""},
  {id:"perro",      nombre:"Perro",      especie:"perro",      emoji:"🐕", img:"imgs/dog.jpg"},
  {id:"delfin",     nombre:"Delfín",     especie:"delfín",     emoji:"🐬", img:""},
  {id:"gato",       nombre:"Gato",       especie:"gato",       emoji:"🐈", img:""},
  {id:"cerdo",      nombre:"Cerdo",      especie:"cerdo",      emoji:"🐖", img:""},
  {id:"sapo",       nombre:"Sapo",       especie:"sapo",       emoji:"🐸", img:""},
  {id:"rata",       nombre:"Rata",       especie:"rata",       emoji:"🐀", img:""},
  {id:"serpiente",  nombre:"Serpiente",  especie:"serpiente",  emoji:"🐍", img:""},
  {id:"arana",      nombre:"Araña",      especie:"araña",      emoji:"🕷️", img:""},
  {id:"murcielago", nombre:"Murciélago", especie:"murciélago", emoji:"🦇", img:""},
  {id:"buitre",     nombre:"Buitre",     especie:"buitre",     emoji:"🦅", img:""},
];

// Parejas [A, B]. Entre 20 y 30 en el estudio real.
export const PAREJAS = [
  ["panda","sapo"],["koala","rata"],["perro","serpiente"],["delfin","arana"],
  ["gato","murcielago"],["cerdo","buitre"],["panda","rata"],["koala","serpiente"],
  ["perro","sapo"],["gato","arana"],["delfin","buitre"],["cerdo","murcielago"],
  ["panda","koala"],["rata","sapo"],["serpiente","arana"],["perro","gato"],
];
