import React from "react";
import { useNavigate } from "react-router-dom";

function BottonHome() {
  const navigate = useNavigate();

  const irAHome = () => {
    navigate("/home");
  };

  return (
    <button className="btn btn-secondary" onClick={irAHome}>
      Ir a Home
    </button>
  );
}

export default BottonHome;
