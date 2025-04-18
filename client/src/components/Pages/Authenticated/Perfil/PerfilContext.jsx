import { createContext, useContext, useState, useEffect } from "react";
import usePerfil from "../../../../hooks/Perfil/usePerfil.js";
import useMyProyectList from "../../../../hooks/Perfil/useMyProyectsList.js";

const PerfilContext = createContext();

export const PerfilProvider = ({ children }) => {
  const { userData, error } = usePerfil();
  const { getProyectos } = useMyProyectList();

  const [arrProyects, setArrProyects] = useState([]);
  const [proyectoEnEdicion, setProyectoEnEdicion] = useState(null);

  useEffect(() => {
    const fetchProyectos = async () => {
      const proyectos = await getProyectos();
      setArrProyects(proyectos);
    };
    fetchProyectos();
  }, []);

  return (
    <PerfilContext.Provider
      value={{
        userData,
        error,
        arrProyects,
        setArrProyects,
        proyectoEnEdicion,
        setProyectoEnEdicion,
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
};

export const usePerfilContext = () => useContext(PerfilContext);
