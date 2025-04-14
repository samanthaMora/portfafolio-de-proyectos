import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../../../hooks/Search/useSearchContext";
import SearchNavbar from "../Search/SearchNavbar";

const SearchInputGroup = () => {
  const { searchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      localStorage.setItem("lastSearch", searchQuery);
      navigate("/search");
    }
  };
  

  return (
    <form className="input-group mb-3" onSubmit={handleSubmit}>
      <button className="btn btn-secondary btn-light " type="submit">
        Buscar
      </button>
      <SearchNavbar isCompact />
    </form>
  );
};

export default SearchInputGroup;



