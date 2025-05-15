// src/components/Pages/Authenticated/Perfil/ProyectoForm.jsx
import React from "react";
import Input from "./fields/Input.jsx";
import TextArea from "./fields/TextArea.jsx";
import MultipleSelect from "./fields/MultipleSelect.jsx";
import QuickAdd from "./fields/QuickAdd.jsx";
import ProjectImagesUploader from "./ProjectImagesUploader.jsx";
import isTokenValid from "../../../../../utils/isTokenValid.js";
import renewToken from "../../../../../utils/renewToken.js";

export default function ProyectoForm({
  proyectoEnEdicion,
  form,
  setForm,
  cats,
  setCats,
  tags,
  setTags,
  techs,
  setTechs,
  inpCat,
  setInpCat,
  inpTag,
  setInpTag,
  inpTech,
  setInpTech,
  loading,
  mensaje,
  handleSubmit,
  pushUnique,
}) {
  const isEdit = Boolean(proyectoEnEdicion?.id);

  return (
    <div>
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
                onChange={(e) =>
                  setForm({ ...form, publico: e.target.checked })
                }
              />
              <label htmlFor="chkPub" className="form-check-label">
                Público
              </label>
            </div>
          </div>
        </div>

        <hr />

        {/* Badges clicables */}
        <div className="row g-3">
          <div className="col-md-4">
            <MultipleSelect label="Categorías" arr={cats} setArr={setCats} />
          </div>
          <div className="col-md-4">
            <MultipleSelect label="Etiquetas" arr={tags} setArr={setTags} />
          </div>
          <div className="col-md-4">
            <MultipleSelect label="Tecnologías" arr={techs} setArr={setTechs} />
          </div>
        </div>

        <hr />

        {/* Alta rápida ahora solo con nombres */}
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
          onClick={async (e) => {
            /* -- Valida el JWT antes de enviar el formulario -- */
            if (!isTokenValid()) {
              e.preventDefault(); // detiene el submit original
              const ok = await renewToken(); // intenta renovar

              if (ok) {
                /*  token renovado ➜ vuelve a disparar el submit */
                e.target.form.requestSubmit(); // mismo formulario
              } else {
                /* sin refresh válido → redirección ya hecha en renewToken() */
                // aquí puedes añadir un toast si lo deseas
              }
            }
          }}
        >
          {loading
            ? isEdit
              ? "Guardando cambios..."
              : "Guardando..."
            : isEdit
            ? "Actualizar proyecto"
            : "Guardar proyecto"}
        </button>

        {!!mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </form>

      {/* Uploader solo en edición */}
      {isEdit && (
        <ProjectImagesUploader
          projectId={proyectoEnEdicion.id}
          repoUrl={form.repositorio_github}
        />
      )}
    </div>
  );
}
