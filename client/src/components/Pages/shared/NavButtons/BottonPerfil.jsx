import { useNavigate } from "react-router-dom";

const BottonPerfil = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home/perfil");
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Ir al Perfil
    </button>
  );
};

export default BottonPerfil;
