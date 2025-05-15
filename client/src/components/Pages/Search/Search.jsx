import { useEffect } from "react";
import SearchNavbar from "./SearchNavbar";
import SearchResults from "./SearchResults";
import NavButtonGroup from "../shared/NavButtons/NavButtonGroup";

const Search = () => {
  useEffect(() => {
    localStorage.removeItem("lastSearch");
  }, []);

  return (
    <div className="container mt-5">
      <SearchNavbar />
      <SearchResults />

      <div className="d-flex justify-content-center mt-4 mb-5">
        <NavButtonGroup />
      </div>
    </div>
  );
};

export default Search;

//aportacionde karen
