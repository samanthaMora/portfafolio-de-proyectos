// src/components/Pages/Search/SearchResultItem.jsx
import { useNavigate } from "react-router-dom";

export default function SearchResultItem({ proyecto }) {
  const navigate = useNavigate();

  const handleClick = () =>
    navigate(`/proyectos/${proyecto.proyecto_id}`);

  return (
    <tr
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      className="hover:bg-gray-100"
    >
      <td className="py-2">{proyecto.titulo}</td>
      <td className="py-2">{proyecto.descripcion}</td>
      <td className="py-2">{proyecto.autor_username}</td>
    </tr>
  );
}
