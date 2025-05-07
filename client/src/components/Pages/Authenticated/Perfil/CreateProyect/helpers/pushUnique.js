export function pushUnique(arr, setArr, v) {
    const nombre = v.trim();
    if (!nombre || arr.some((x) => x.nombre === nombre)) return;
    setArr([...arr, { nombre }]);
  }
  