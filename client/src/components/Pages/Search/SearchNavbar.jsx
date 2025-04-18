import { useSearch } from "../../../hooks/Search/useSearchContext";

const SearchNavbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Buscar proyectos..."
      value={searchQuery}
      onChange={handleChange}
    />
  );
};

export default SearchNavbar;

