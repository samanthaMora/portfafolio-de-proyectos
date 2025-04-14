import { useSearch } from "../../../hooks/Search/useSearchContext";

const SearchNavbar = ({ isCompact }) => {
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
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)", // fondo blanco translúcido
        border: "1px solid #ccc",
        color: "#000",
        zIndex: 1,
        position: "relative"
      }}
    />
  );
};

export default SearchNavbar;

