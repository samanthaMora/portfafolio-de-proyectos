// src/components/Pages/Search/SearchResults.jsx
import useSearchProyectos from "../../../hooks/Search/useSearchProyectos";
import { useSearch } from "../../../hooks/Search/useSearchContext";
import SearchResultItem from "./SearchResultItem";

const SearchResults = () => {
  const { resultados, page, totalPages, setPage } = useSearchProyectos();
  const { searchQuery } = useSearch();

  const handlePageClick = (pageNum) => {
    if (pageNum !== page) setPage(pageNum);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-sm mx-1 ${
            i === page ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mt-4">
      {searchQuery.length > 0 && (
        <div>
          <h5>
            Resultados para: <em>"{searchQuery}"</em>
          </h5>

          {resultados.length === 0 ? (
            <p>No se encontraron proyectos.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Título</th>
                      <th>Descripción</th>
                      <th>Autor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map((proyecto) => (
                      <SearchResultItem
                        key={proyecto.proyecto_id}
                        proyecto={proyecto}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-center mt-4 flex-wrap">
                <button
                  className="btn btn-outline-secondary btn-sm mx-1"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </button>

                {renderPageNumbers()}

                <button
                  className="btn btn-outline-secondary btn-sm mx-1"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
