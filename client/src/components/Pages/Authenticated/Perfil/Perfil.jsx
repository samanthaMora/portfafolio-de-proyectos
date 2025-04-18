import { useNavigate } from "react-router-dom";
import useAvatar from "../../../../hooks/Perfil/useAvatar.js";
import useUploadAvatar from "../../../../hooks/Perfil/useUploadAvatar.js";
import { showConfirm } from "../../../../utils/alerts.js";
import { usePerfilContext } from "../Perfil/PerfilContext.jsx";
import ProyectsList from "./ProyectsList.jsx";
import NavButtonGroup from "../../shared/NavButtons/NavButtonGroup.jsx";

const Perfil = () => {
  const {
    userData,
    error,
    arrProyects,
    setArrProyects,
    setProyectoEnEdicion
  } = usePerfilContext();

  const avatarUrl = useAvatar();
  const { uploadAvatar } = useUploadAvatar();
  const navigate = useNavigate();

  const handleAvatarClick = async () => {
    const confirmed = await showConfirm("¿Deseas cambiar tu imagen de perfil?");
    if (!confirmed) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const success = await uploadAvatar(file);
        if (success) {
          window.location.reload(); 
        }
      }
    };

    input.click();
  };

  const handleCrearNuevo = () => {
    setProyectoEnEdicion(null);
    navigate("/home/proyecto");
  };

  if (error) return <p>{error}</p>;
  if (!userData) return <p>Cargando perfil...</p>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Perfil</h3>

      <div className="d-flex align-items-center mb-4 gap-4">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-circle shadow"
            style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
            onClick={handleAvatarClick}
          />
        )}

        <ul className="list-group" style={{ maxWidth: "400px", width: "100%" }}>
          <li className="list-group-item">
            <strong>Email:</strong> {userData.email}
          </li>
          <li className="list-group-item">
            <strong>Username:</strong> {userData.username}
          </li>
        </ul>
      </div>

      <button className="btn btn-success mb-3" onClick={handleCrearNuevo}>
        + Crear nuevo proyecto
      </button>

      <ProyectsList />

      <br />
      <NavButtonGroup />
    </div>
  );
};

export default Perfil;


