// src/components/Perfil/PerfilContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import usePerfil from "../../../../hooks/Perfil/usePerfil.js";
import useMyProyectList from "../../../../hooks/Perfil/useMyProyectsList.js";

const PerfilContext = createContext();

export const PerfilProvider = ({ children }) => {
  const { userData, error } = usePerfil();
  const { getProyectos } = useMyProyectList();

  const [arrProyects, setArrProyects] = useState([]);
  const [proyectoEnEdicion, setProyectoEnEdicion] = useState(null);

  useEffect(() => {
    (async () => {
      const lista = await getProyectos();
      setArrProyects(lista);
    })();
  }, [getProyectos]);

  // Estabiliza setProyectoEnEdicion con useCallback
  const seleccionarProyecto = useCallback((proyecto) => {
    setProyectoEnEdicion((prev) => {
      if (!proyecto) return null; // <- previene errores si proyecto es null
      if (!prev || prev.id !== proyecto.id) {
        return proyecto;
      }
      return prev;
    });
  }, []);
  

  return (
    <PerfilContext.Provider
      value={{
        userData,
        error,
        arrProyects,
        setArrProyects,
        proyectoEnEdicion,
        setProyectoEnEdicion: seleccionarProyecto, // 👈 estable
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
};

export const usePerfilContext = () => useContext(PerfilContext);

