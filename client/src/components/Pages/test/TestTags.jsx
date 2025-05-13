import { useState } from "react";
import axios from "axios";

const TestTags = () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const [nombre, setNombre] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      return setResultado("⚠️ El nombre no puede estar vacío");
    }

    const token = localStorage.getItem("accessToken");
    console.log("🔐 Token usado:", token);
    console.log("🏷 Nombre enviado:", nombre);

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/etiquetas`,
        { nombre },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("✅ Respuesta del backend:", res);
      setResultado(`✅ Etiqueta creada: ${res.data.nombre}`);
    } catch (err) {
      console.error("❌ ERROR:", err);
      setResultado(`❌ Error: ${err.response?.data?.message || "Algo salió mal"}`);
    } finally {
      setLoading(false);
      setNombre("");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Crear Etiqueta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de etiqueta"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
      <p style={{ marginTop: "1rem", color: "blue", fontWeight: "bold" }}>{resultado}</p>
    </div>
  );
};

export default TestTags;
