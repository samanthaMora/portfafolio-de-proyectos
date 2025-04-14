import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./api/axiosConfig";


// Páginas
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Login/Register";
import Home from "./components/Pages/Authenticated/Home/Home.jsx";
import Perfil from "./components/Pages/Authenticated/Perfil/Perfil.jsx";
import Search from "./components/Pages/Search/Search.jsx";

// Rutas protegidas
import PrivateRoute from "./components/routes/PrivateRoute";

// Contexto de búsqueda
import { SearchProvider } from "./hooks/Search/useSearchContext.jsx";






ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Rutas protegidas con SearchProvider */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <SearchProvider>
                <Home />
              </SearchProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/home/perfil"
          element={
            <PrivateRoute>
              <SearchProvider>
                <Perfil />
              </SearchProvider>
            </PrivateRoute>
          }
        />

        {/* Ruta pública de búsqueda */}
        <Route
          path="/search"
          element={
            <SearchProvider>
              <Search />
            </SearchProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
