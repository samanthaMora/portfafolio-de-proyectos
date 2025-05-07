export async function getOrCreateIds(lista, createFn) {
    const ids = [];
  
    for (const item of lista) {
      if (item.id) {
        ids.push(item.id);
      } else {
        const { id } = await createFn(item.nombre);
        ids.push(id);
      }
    }
  
    return ids;
  }
  