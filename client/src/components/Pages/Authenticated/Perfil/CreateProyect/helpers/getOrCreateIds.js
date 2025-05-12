// src/components/Pages/Authenticated/Perfil/CreateProyect/helpers/getOrCreateIds.js
export async function getOrCreateIds(arr, createFn) {
  const ids = [];

  for (const item of arr) {
    // 1) Si es un objeto con id válido, lo usamos directamente
    if (
      item &&
      typeof item === "object" &&
      Number.isInteger(item.id)
    ) {
      ids.push(item.id);
      continue;
    }

    // 2) Si es string, lo creamos pasando sólo el string
    if (typeof item === "string") {
      const nombre = item.trim();
      if (!nombre) continue;           // saltamos vacío
      // <-- aquí cambiamos createFn({ nombre }) por createFn(nombre)
      const nuevo = await createFn(nombre);
      if (nuevo && Number.isInteger(nuevo.id)) {
        ids.push(nuevo.id);
      }
      continue;
    }

    // 3) Cualquier otro valor lo ignoramos
  }

  return ids;
}