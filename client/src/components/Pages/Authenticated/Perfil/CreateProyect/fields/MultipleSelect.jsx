import { useState } from "react";

export default function MultipleSelect({ label, arr, setArr }) {
  const [sel, setSel] = useState([]);

  const removeSelected = () => {
    setArr(arr.filter((item) => !sel.includes(item.id)));
    setSel([]);
  };

  return (
    <div className="col-md-4">
      <label className="form-label">{label}</label>
      <select
        multiple
        className="form-select"
        size={6}
        value={sel}
        onChange={(e) => {
          const selected = [...e.target.selectedOptions].map((o) => +o.value);
          setSel(selected);
        }}
      >
        {arr.map((it) => (
          <option key={it.id} value={it.id}>
            {it.nombre}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-sm btn-outline-danger mt-2"
        disabled={!sel.length}
        onClick={removeSelected}
      >
        Eliminar seleccionados
      </button>
    </div>
  );
}
