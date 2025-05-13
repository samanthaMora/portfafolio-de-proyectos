// src/pages/TestCategorias.jsx
import { useState } from "react";
import axios from "axios";

const TestCategorias = () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const [nombre, setNombre] = useState("");
  const [resultado, setResultado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("accessToken");
    console.log("Token usado:", token);
    console.log("Nombre enviado:", nombre);
  
    try {
      const res = await axios.post(`${API_BASE}/categorias`,
        { nombre },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Respuesta del backend:", res);

      setResultado(`✅ Categoría creada: ${res.data.nombre}`);
    } catch (err) {
      console.error("ERROR:", err);
      setResultado(`❌ Error: ${err.response?.data?.message || "Algo salió mal"}`);
    }
  };
  

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Crear Categoría</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de categoría"
        />
        <button type="submit">Crear</button>
      </form>
      <p style={{ marginTop: "1rem", color: "blue", fontWeight: "bold" }}>{resultado}</p>

    </div>
  );
};

export default TestCategorias;
