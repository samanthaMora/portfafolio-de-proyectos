import Input from "./fields/Input";
import TextArea from "./fields/TextArea";
import MultipleSelect from "./fields/MultipleSelect";
import QuickAdd from "./fields/QuickAdd";

export default function ProyectForm(props) {
  const {
    form, setForm,
    cats, setCats,
    tags, setTags,
    techs, setTechs,
    inpCat, setInpCat,
    inpTag, setInpTag,
    inpTech, setInpTech,
    loading, mensaje,
    handleSubmit,
    pushUnique
  } = props;

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      
      {/* Campos básicos */}
      <div className="row g-3">
        <Input
          label="Título *"
          value={form.titulo}
          onChange={(v) => setForm({ ...form, titulo: v })}
          required
        />
        <Input
          label="URL demo"
          value={form.url}
          onChange={(v) => setForm({ ...form, url: v })}
        />
        <TextArea
          label="Descripción *"
          value={form.descripcion}
          onChange={(v) => setForm({ ...form, descripcion: v })}
          required
        />
        <Input
          label="Repositorio GitHub"
          value={form.repositorio_github}
          onChange={(v) => setForm({ ...form, repositorio_github: v })}
        />
        <div className="col-md-4 d-flex align-items-end">
          <div className="form-check">
            <input
              id="chkPub"
              className="form-check-input"
              type="checkbox"
              checked={form.publico}
              onChange={(e) => setForm({ ...form, publico: e.target.checked })}
            />
            <label htmlFor="chkPub" className="form-check-label">
              Público
            </label>
          </div>
        </div>
      </div>

      <hr />

      {/* Selects múltiples */}
      <div className="row g-3">
        <MultipleSelect label="Categorías" arr={cats} setArr={setCats} />
        <MultipleSelect label="Etiquetas" arr={tags} setArr={setTags} />
        <MultipleSelect label="Tecnologías" arr={techs} setArr={setTechs} />
      </div>

      <hr />

      {/* Alta rápida */}
      <QuickAdd
        label="Categoría"
        valor={inpCat}
        setValor={setInpCat}
        onAdd={() => {
          pushUnique(cats, setCats, inpCat);
          setInpCat("");
        }}
      />
      <QuickAdd
        label="Etiqueta"
        valor={inpTag}
        setValor={setInpTag}
        onAdd={() => {
          pushUnique(tags, setTags, inpTag);
          setInpTag("");
        }}
      />
      <QuickAdd
        label="Tecnología"
        valor={inpTech}
        setValor={setInpTech}
        onAdd={() => {
          pushUnique(techs, setTechs, inpTech);
          setInpTech("");
        }}
      />

      <button
        type="submit"
        className="btn btn-primary mt-4"
        disabled={loading || !form.titulo.trim() || !form.descripcion.trim()}
      >
        {loading
          ? "Guardando..."
          : "Guardar proyecto"}
      </button>

      {!!mensaje && (
        <div className="alert alert-info mt-3">
          {mensaje}
        </div>
      )}
    </form>
  );
}
