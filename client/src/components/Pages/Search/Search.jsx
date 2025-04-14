import { useEffect } from "react";
import SearchNavbar from "./SearchNavbar";
import SearchResults from "./SearchResults";
import NavButtonGroup from "../shared/NavButtons/NavButtonGroup";
import ParticlesBackground from "../shared/Backgrounds/ParticlesBackground";

const Search = () => {
  useEffect(() => {
    localStorage.removeItem("lastSearch");
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <ParticlesBackground />

      <div className="container mt-5">
        <SearchNavbar />
        <SearchResults />
      </div>

      <div className="d-flex justify-content-center mt-4 mb-5">
        <NavButtonGroup />
      </div>
    </div>
  );
};

export default Search;

