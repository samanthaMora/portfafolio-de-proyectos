import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import renewToken from "../../utils/renewToken.js";
import isTokenValid from "../../utils/isTokenValid.js";

const PrivateRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (isTokenValid()) {
        setAuthorized(true);
      } else {
        const newToken = await renewToken();
        if (newToken) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) return <p>Cargando...</p>;
  if (!authorized) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
