// src/components/Perfil/fields/MultipleSelect.jsx
import React from "react";

export default function MultipleSelect({ label, arr, setArr }) {
  const handleRemove = (item) => {
    setArr(arr.filter((i) => {
      if (typeof i === "object") return i.id !== item.id;
      return i !== item;
    }));
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="d-flex flex-wrap gap-2">
        {arr.length === 0 && (
          <small className="text-muted">No hay {label.toLowerCase()} aún</small>
        )}
        {arr.map((item, idx) => {
          const name = typeof item === "object" ? item.nombre : item;
          const key = typeof item === "object" ? item.id : name + idx;
          return (
            <span
              key={key}
              className="badge bg-secondary d-flex align-items-center"
            >
              {name}
              <button
                type="button"
                className="btn-close btn-close-white btn-sm ms-2"
                aria-label={`Eliminar ${name}`}
                onClick={() => handleRemove(item)}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
