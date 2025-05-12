// File: src/components/Perfil/ProjectImagesUploader.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000";

export default function ProjectImagesUploader({ projectId, repoUrl }) {
  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState(null);
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  // Carga la lista inicial de imágenes
  useEffect(() => {
    axios
      .get(`${API_BASE}/proyectos/${projectId}/images`, { headers })
      .then((res) => setFiles(res.data.images))
      .catch((err) => console.error("Error listando imágenes:", err));
  }, [projectId]);

  const handleFileChange = (e) => setNewFiles(e.target.files);

  const handleUpload = async () => {
    if (!newFiles) return;
    const formData = new FormData();
    Array.from(newFiles).forEach((f) => formData.append("images", f));
    if (repoUrl) formData.append("repoUrl", repoUrl);

    setStatus("Subiendo...");
    try {
      await axios.post(
        `${API_BASE}/proyectos/${projectId}/images`,
        formData,
        { headers }
      );
      setStatus("✅ Imágenes subidas");
      const res = await axios.get(
        `${API_BASE}/proyectos/${projectId}/images`,
        { headers }
      );
      setFiles(res.data.images);
    } catch (err) {
      console.error("Error subiendo imágenes:", err);
      setStatus("❌ Error al subir imágenes");
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(
        `${API_BASE}/proyectos/${projectId}/images/${filename}`,
        { headers }
      );
      setFiles(files.filter((f) => f !== filename));
    } catch (err) {
      console.error("Error eliminando imagen:", err);
    }
  };

  return (
    <div className="card p-3 mt-4">
      <h5>Imágenes del Proyecto</h5>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {files.map((f) => (
          <div key={f} className="position-relative">
            <img
              src={`${API_BASE}/uploads/${String(projectId)}/images/${f}`}
              alt={f}
              width={100}
              className="img-thumbnail"
            />
            <button
              className="btn btn-sm btn-danger position-absolute top-0 end-0"
              onClick={() => handleDelete(f)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <h5>Agregar Imágenes</h5>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="form-control mb-2"
      />
      <button
        className="btn btn-outline-primary"
        onClick={handleUpload}
        disabled={!newFiles}
      >
        Subir
      </button>
      {!!status && <p className="mt-2">{status}</p>}
    </div>
  );
}
