import NavButtonGroup from "../../shared/NavButtons/NavButtonGroup";
import SearchInputGroup from "../../shared/SearchInputGroup";
import FondoNet from "../../shared/Backgrounds/FondoNet";
import "../../../../styles/OverlayMessage.css"

const Home = () => {
  return (
    <>
      <FondoNet/>

      <div className="container mt-5 text-center">
        <SearchInputGroup />

        <br />

        <h2 className="view-text">You are logged in</h2>
        <NavButtonGroup />
      </div>
    </>
  );
};

export default Home;
