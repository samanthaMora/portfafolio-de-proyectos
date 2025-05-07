export default function QuickAdd({ label, valor, setValor, onAdd }) {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text">Nuevo {label.toLowerCase()}</span>
        <input
          className="form-control"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder={`Ej. ${label}`}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          disabled={!valor.trim()}
          onClick={onAdd}
        >
          Añadir
        </button>
      </div>
    );
  }
  