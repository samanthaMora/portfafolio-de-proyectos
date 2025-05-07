export default function TextArea({ label, value, onChange, required }) {
    return (
      <div className="col-12">
        <label className="form-label">{label}</label>
        <textarea
          className="form-control"
          rows="3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    );
  }
  