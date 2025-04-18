import { useEffect, useState } from "react";
import { useSearch } from "./useSearchContext";
import axios from "axios";

const useSearchProyectos = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [resultados, setResultados] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      const last = localStorage.getItem("lastSearch") || "";
      if (last) setSearchQuery(last);
    }
  }, []);

  useEffect(() => {
    const fetchProyectos = async () => {
      if (searchQuery.length > 0) {
        try {
          const token = localStorage.getItem("accessToken"); // <- cambio aquí
          const res = await axios.get(
            `http://localhost:3000/searchProyects?query=${searchQuery}&page=${page}&limit=5`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setResultados(res.data.proyectos);
          setTotalPages(res.data.totalPages || 1);
        } catch (error) {
          console.error("Error al buscar proyectos:", error);
        }
      } else {
        setResultados([]);
        setTotalPages(1);
      }
    };

    fetchProyectos();
  }, [searchQuery, page]);

  return {
    resultados,
    page,
    totalPages,
    setPage,
  };
};

export default useSearchProyectos;



