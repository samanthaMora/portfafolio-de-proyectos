export default function Input({ label, value, onChange, required }) {
    return (
      <div className="col-md-6">
        <label className="form-label">{label}</label>
        <input
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    );
  }
  