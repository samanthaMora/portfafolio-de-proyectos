import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3000";

export default function TestCrearProyecto() {
  const { id } = useParams(); // id undefined → crear, defined → editar
  const navigate = useNavigate();

  /* arrays locales */
  const [cats, setCats] = useState([]);
  const [tags, setTags] = useState([]);
  const [techs, setTechs] = useState([]);

  /* inputs rápidos */
  const [inpCat, setInpCat] = useState("");
  const [inpTag, setInpTag] = useState("");
  const [inpTech, setInpTech] = useState("");

  /* formulario proyecto */
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    url: "",
    repositorio_github: "",
    publico: true,
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  // Carga datos si estamos en modo edición
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data } = await axios.get(
          `${API}/proyectos/${id}`,
          { headers }
        );
        // llena el formulario
        setForm({
          titulo: data.titulo || "",
          descripcion: data.descripcion || "",
          url: data.url || "",
          repositorio_github: data.repositorio_github || "",
          publico: data.publico,
        });
        // llena arrays locales con nombres (usando ID como placeholder)
        setCats(data.categorias.map(idCat => ({ nombre: idCat.toString() })));
        setTags(data.etiquetas.map(idTag => ({ nombre: idTag.toString() })));
        setTechs(data.tecnologias.map(idTec => ({ nombre: idTec.toString() })));
      } catch (err) {
        console.error(err);
        setMensaje("Error al cargar proyecto");
      }
    })();
  }, [id]);

  /* añade sin duplicar */
  const pushUnique = (arr, setArr, valor) => {
    const v = valor.trim();
    if (!v) return;
    if (arr.some(e => e.nombre === v)) return;
    setArr([...arr, { nombre: v }]);
  };

  /* guardar proyecto */
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    const createOrGetIds = async (tipo, lista) => {
      const ids = [];
      for (const item of lista) {
        try {
          const { data } = await axios.post(
            `${API}/${tipo}`,
            { nombre: item.nombre },
            { headers }
          );
          ids.push(data.id);
        } catch (err) {
          if (err.response?.status === 409) {
            ids.push(err.response.data.id);
          } else {
            throw err;
          }
        }
      }
      return ids;
    };

    try {
      const catIds = await createOrGetIds("categorias", cats);
      const tagIds = await createOrGetIds("etiquetas", tags);
      const techIds = await createOrGetIds("tecnologias", techs);

      const body = {
        ...form,
        categorias: catIds,
        etiquetas: tagIds,
        tecnologias: techIds,
      };

      if (id) {
        await axios.put(`${API}/proyectos/${id}`, body, { headers });
        setMensaje("✅ Proyecto actualizado");
      } else {
        await axios.post(`${API}/proyectos`, body, { headers });
        setMensaje("🎉 Proyecto creado");
      }
      setTimeout(() => navigate("/mis-proyectos"), 1200);
    } catch (err) {
      console.error(err);
      setMensaje(
        `❌ ${err.response?.data?.message || "Error al guardar proyecto"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2>{id ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <Input
            label="Título *"
            value={form.titulo}
            onChange={v => setForm({ ...form, titulo: v })}
            required
          />
          <Input
            label="URL demo"
            value={form.url}
            onChange={v => setForm({ ...form, url: v })}
          />
          <TextArea
            label="Descripción *"
            value={form.descripcion}
            onChange={v => setForm({ ...form, descripcion: v })}
            required
          />
          <Input
            label="Repositorio GitHub"
            value={form.repositorio_github}
            onChange={v => setForm({ ...form, repositorio_github: v })}
          />
          <div className="col-md-4 d-flex align-items-end">
            <div className="form-check">
              <input
                id="chkPub"
                className="form-check-input"
                type="checkbox"
                checked={form.publico}
                onChange={e => setForm({ ...form, publico: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="chkPub">
                Público
              </label>
            </div>
          </div>
        </div>

        <hr />

        <div className="row g-3">
          <SelectMultiple label="Categorías" arr={cats} setArr={setCats} />
          <SelectMultiple label="Etiquetas" arr={tags} setArr={setTags} />
          <SelectMultiple label="Tecnologías" arr={techs} setArr={setTechs} />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading || !token || !form.titulo.trim() || !form.descripcion.trim()}
        >
          {loading ? "Guardando…" : id ? "Guardar cambios" : "Guardar proyecto"}
        </button>
      </form>

      <h4 className="mt-4">Añadir nuevo ítem</h4>
      <div className="row g-3">
        <CrearRapido
          label="Categoría"
          valor={inpCat}
          setValor={setInpCat}
          onAdd={() => {
            pushUnique(cats, setCats, inpCat);
            setInpCat("");
          }}
        />
        <CrearRapido
          label="Etiqueta"
          valor={inpTag}
          setValor={setInpTag}
          onAdd={() => {
            pushUnique(tags, setTags, inpTag);
            setInpTag("");
          }}
        />
        <CrearRapido
          label="Tecnología"
          valor={inpTech}
          setValor={setInpTech}
          onAdd={() => {
            pushUnique(techs, setTechs, inpTech);
            setInpTech("");
          }}
        />
      </div>

      {!!mensaje && <div className="alert alert-info mt-4">{mensaje}</div>}
    </div>
  );
}

// Componentes auxiliares
const Input = ({ label, value, onChange, required }) => (
  <div className="col-md-6">
    <label className="form-label">{label}</label>
    <input
      className="form-control"
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
    />
  </div>
);

const TextArea = ({ label, value, onChange, required }) => (
  <div className="col-12">
    <label className="form-label">{label}</label>
    <textarea
      className="form-control"
      rows="3"
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
    />
  </div>
);

const SelectMultiple = ({ label, arr, setArr }) => {
  const [selected, setSelected] = useState([]);
  const removeSelected = () => {
    setArr(arr.filter((_, idx) => !selected.includes(idx)));
    setSelected([]);
  };

  return (
    <div className="col-md-4">
      <label className="form-label">{label}</label>
      <select
        multiple
        className="form-select"
        size="6"
        value={selected}
        onChange={e => setSelected([...e.target.selectedOptions].map(o => +o.value))}
      >
        {arr.map((it, idx) => (
          <option key={idx} value={idx}>{it.nombre}</option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-sm btn-outline-danger mt-2"
        disabled={selected.length === 0}
        onClick={removeSelected}
      >
        Eliminar seleccionados
      </button>
    </div>
  );
};

const CrearRapido = ({ label, valor, setValor, onAdd }) => (
  <div className="col-md-4">
    <label className="form-label">{label} nuevo</label>
    <div className="input-group">
      <input
        className="form-control"
        value={valor}
        onChange={e => setValor(e.target.value)}
        placeholder={`Nuevo ${label.toLowerCase()}`}
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
  </div>
);
