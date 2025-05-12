// src/components/Pages/Authenticated/Perfil/CreateProyect/helpers/pushUnique.js
export function pushUnique(arr, setArr, nuevoNombre) {
  const nombre = String(nuevoNombre || "").trim();
  if (!nombre) return;           // nada que añadir si viene vacío
  if (arr.includes(nombre)) return; // evita duplicados
  setArr([...arr, nombre]);      // añade solo el string
}
