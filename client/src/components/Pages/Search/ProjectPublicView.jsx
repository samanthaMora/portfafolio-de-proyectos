// src/pages/ProjectPublicView.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import RatingSelect from "./RatingSelect";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

/* ---------- helpers ---------- */
const authHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const currentUserId = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  try {
    const { id, id_usuario, userId, sub } = jwtDecode(token);
    return id || id_usuario || userId || sub || null;
  } catch {
    return null;
  }
};

/* ---------- componente ---------- */
export default function ProjectPublicView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [proyecto, setProyecto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [repoFiles, setRepoFiles] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [loading, setLoading] = useState(true);

  /* fetch proyecto + archivos */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/public/proyectos/${id}`);
        setProyecto(data);
        setImagenes(
          data.imagenes.map(
            (f) => `${API_BASE}/uploads/${data.autor_id}/${id}/images/${f}`
          )
        );
        setRepoFiles(
          data.repo_files.map((f) => ({
            name: f,
            url: `${API_BASE}/uploads/${data.autor_id}/${id}/repo/${f}`,
          }))
        );
      } catch (err) {
        console.error(err);
        setProyecto(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* fetch comentarios */
  const loadComentarios = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE}/proyectos/${id}/comentarios`
      );
      setComentarios(data);
    } catch (err) {
      console.error("Error cargando comentarios:", err);
    }
  };

  useEffect(() => {
    loadComentarios();
  }, [id]);

  /* crear comentario */
  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;
    try {
      await axios.post(
        `${API_BASE}/proyectos/${id}/comentarios`,
        { contenido: nuevoComentario.trim() },
        { headers: authHeaders() }
      );
      setNuevoComentario("");
      loadComentarios();
    } catch (err) {
      console.error("Error creando comentario:", err);
      alert("Necesitas iniciar sesión para comentar.");
    }
  };

  /* eliminar comentario */
  const handleDeleteComentario = async (comentarioId) => {
    if (!window.confirm("¿Eliminar comentario?")) return;
    try {
      await axios.delete(`${API_BASE}/comentarios/${comentarioId}`, {
        headers: authHeaders(),
      });
      setComentarios((prev) => prev.filter((c) => c.id !== comentarioId));
    } catch (err) {
      console.error("Error eliminando comentario:", err);
      alert("No autorizado para eliminar este comentario.");
    }
  };

  /* ---------- UI ---------- */
  if (loading) return <p className="mt-5 text-center">Cargando…</p>;
  if (!proyecto)
    return <p className="mt-5 text-center">Proyecto no encontrado.</p>;

  const userId = currentUserId();

  const handleDownloadRepo = async () => {
    // 1. Asegurar que tenemos un ID válido (el objeto puede venir con id o proyecto_id)
    const repoId = proyecto.id ?? proyecto.proyecto_id;
    if (!repoId) {
      alert("No se encontró el ID del proyecto. Intenta recargar la página.");
      return;
    }

    try {
      // 2. Construir la URL correctamente
      const url = `${API_BASE}/proyectos/${repoId}/repo/download?userId=${proyecto.autor_id}`;

      // 3. Hacer la petición como blob
      const res = await axios.get(url, { responseType: "blob" });

      // 4. Crear un enlace temporal y disparar la descarga
      const blobUrl = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `repo_${repoId}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error descargando repo:", err);
      alert("No se pudo descargar el repositorio.");
    }
  };

  return (
    <div className="container my-5">
      {/* botón regresar */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Regresar
      </button>
      {/* tarjeta principal */}
      <div className="card shadow-sm">
        <div className="card-body">
          {/* encabezado */}
          <h2 className="card-title">{proyecto.titulo}</h2>
          <p className="text-muted mb-4">
            Autor: {proyecto.autor_username} •{" "}
            {new Date(proyecto.fecha_creacion).toLocaleDateString()}
          </p>

          {/* descripción */}
          <h5>Descripción</h5>
          <p>{proyecto.descripcion}</p>

          {/* urls */}
          {proyecto.url && (
            <>
              <h5 className="mt-4">URL del proyecto</h5>
              <a href={proyecto.url} target="_blank" rel="noreferrer">
                {proyecto.url}
              </a>
            </>
          )}

          {proyecto.repositorio_github && (
            <>
              <h5 className="mt-4">Repositorio GitHub</h5>
              <a
                href={proyecto.repositorio_github}
                target="_blank"
                rel="noreferrer"
              >
                {proyecto.repositorio_github}
              </a>
            </>
          )}

          {/* taxonomías */}
          {proyecto.categorias.length > 0 && (
            <>
              <h5 className="mt-4">Categorías</h5>
              <ul className="list-inline">
                {proyecto.categorias.map((c) => (
                  <li
                    key={c}
                    className="list-inline-item badge bg-primary me-1"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </>
          )}

          {proyecto.etiquetas.length > 0 && (
            <>
              <h5 className="mt-4">Etiquetas</h5>
              <ul className="list-inline">
                {proyecto.etiquetas.map((e) => (
                  <li
                    key={e}
                    className="list-inline-item badge bg-secondary me-1"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </>
          )}

          {proyecto.tecnologias.length > 0 && (
            <>
              <h5 className="mt-4">Tecnologías</h5>
              <ul className="list-inline">
                {proyecto.tecnologias.map((t) => (
                  <li
                    key={t}
                    className="list-inline-item badge bg-success me-1"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* galería */}
          <h5 className="mt-4">Galería</h5>
          {imagenes.length ? (
            <div className="row g-3">
              {imagenes.map((url) => (
                <div key={url} className="col-12 col-sm-6 col-md-4">
                  <img
                    src={url}
                    alt=""
                    className="img-fluid rounded shadow-sm w-100"
                    style={{ objectFit: "cover", maxHeight: "250px" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No hay imágenes.</p>
          )}

          {/* archivos repo */}
          {repoFiles.length > 0 && (
            <>
              <h5 className="mt-4">Archivos del repo</h5>
              <ul className="list-group list-group-flush">
                {repoFiles.map((f) => (
                  <li key={f.url} className="list-group-item">
                    <a href={f.url} download>
                      {f.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-success mt-3"
        onClick={handleDownloadRepo}
      >
        Descargar repo (.zip)
      </button>

      <RatingSelect proyectoId={proyecto.id || proyecto.proyecto_id} />
      {/* comentarios */}
      <div className="card shadow-sm mt-5">
        <div className="card-body">
          <h5 className="card-title mb-3">Comentarios</h5>

          {userId ? (
            <form onSubmit={handleSubmitComentario} className="mb-4">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Escribe tu comentario..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              />
              <button type="submit" className="btn btn-primary mt-2">
                Publicar
              </button>
            </form>
          ) : (
            <p className="text-muted">
              Inicia sesión para dejar un comentario.
            </p>
          )}

          {comentarios.length === 0 ? (
            <p className="text-muted">Aún no hay comentarios.</p>
          ) : (
            <ul className="list-group">
              {comentarios.map((c) => (
                <li
                  key={c.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <strong>{c.username || "usuario"}</strong>{" "}
                    <span className="text-muted" style={{ fontSize: "0.85em" }}>
                      {new Date(c.fecha).toLocaleString()}
                    </span>
                    <p className="mb-1">{c.contenido}</p>
                  </div>
                  {c.id_usuario === userId && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteComentario(c.id)}
                    >
                      ×
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
