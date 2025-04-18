import NavButtonGroup from "../../shared/NavButtons/NavButtonGroup";
import SearchInputGroup from "../../shared/SearchInputGroup";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <SearchInputGroup />
      <br />
      <h2>You are logged in</h2>
      <NavButtonGroup />
    </div>
  );
};

export default Home;
