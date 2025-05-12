import React from "react";

export default function QuickAdd({ label, valor = "", setValor, onAdd }) {
  const trimmed = String(valor).trim();

  return (
    <div className="d-flex align-items-end mb-3">
      <div className="flex-grow-1 me-2">
        <label className="form-label">{label}</label>
        <input
          type="text"
          className="form-control"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn btn-outline-primary align-self-start"
        disabled={!trimmed}
        onClick={onAdd}
      >
        Agregar
      </button>
    </div>
  );
}
