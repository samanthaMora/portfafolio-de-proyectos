import useSearchProyectos from "../../../hooks/Search/useSearchProyectos";
import SearchResultItem from "./SearchResultItem";
import { useSearch } from "../../../hooks/Search/useSearchContext";
import "../../../styles/pagination-buttons.css";
import "../../../styles/OverlayMessage.css";

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
          className={`pagination-button mx-1 ${
            i === page ? "pagination-active" : ""
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
          <h5 className="view-text">
            Resultados para: <em>"{searchQuery}"</em>
          </h5>

          {resultados.length === 0 ? (
            <p className="view-text">No se encontraron proyectos.</p>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover align-middle glass-card">
                  <thead className="table-dark">
                    <tr>
                      <th>Título</th>
                      <th>Descripción</th>
                      <th>Autor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map((proyecto) => (
                      <SearchResultItem key={proyecto.id} proyecto={proyecto} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginador numérico */}
              <div className="d-flex justify-content-center mt-4 flex-wrap">
                <button
                  className="pagination-button mx-1"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </button>

                {renderPageNumbers()}

                <button
                  className="pagination-button mx-1"
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
