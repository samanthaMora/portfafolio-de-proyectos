import { useState, useEffect } from "react";
import usePerfil from "../../../../hooks/Perfil/usePerfil.js";
import ProyectsList from "./ProyectsList.jsx";
import CreateProyect from "./CreateProyect.jsx";
import useMyProyectList from "../../../../hooks/Perfil/useMyProyectsList.js";
import NavButtonGroup from "../../shared/NavButtons/NavButtonGroup";
import FondoNet from "../../shared/Backgrounds/FondoNet.jsx"
import "../../../../styles/OverlayMessage.css"

const Perfil = () => {
  const [arrProyects, setArrProyects] = useState([]);
  const [proyectoEnEdicion, setProyectoEnEdicion] = useState(null);
  const { userData, error } = usePerfil();
  const { getProyectos } = useMyProyectList();

  useEffect(() => {
    const fetchProyectos = async () => {
      const proyectos = await getProyectos();
      setArrProyects(proyectos);
    };

    fetchProyectos();
  }, []);

  if (error) return <p>{error}</p>;
  if (!userData) return <p>Cargando perfil...</p>;

  return (
    <>
    <FondoNet/>
      <div className="container mt-5">
        <h3 className="view-text">Perfil</h3>

        <ul className="list-group" style={{ maxWidth: "400px" }}>
          <li className="list-group-item">
            <strong>Email:</strong> {userData.email}
          </li>
          <li className="list-group-item">
            <strong>Username:</strong> {userData.username}
          </li>
        </ul>
        <br />
        <CreateProyect
          setArrProyects={setArrProyects}
          proyectoEnEdicion={proyectoEnEdicion}
          setProyectoEnEdicion={setProyectoEnEdicion}
        />
        <br />
        <ProyectsList
          arrProyects={arrProyects}
          setArrProyects={setArrProyects}
          setProyectoEnEdicion={setProyectoEnEdicion}
        />
        <br />
        <NavButtonGroup />
      </div>
    </>
  );
};

export default Perfil;
