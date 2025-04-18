import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./api/axiosConfig";

// Páginas
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Login/Register";
import VerifyEmail from "./components/Pages/Login/TryVerify/VerifyEmail.jsx";
import ForgotPassword from "./components/Pages/Login/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/Pages/Login/ForgotPassword/ResetPassword.jsx";
import RecoveryFailed from "./components/Pages/Login/ForgotPassword/RecoveryFailed.jsx";
import RecoverySuccess from "./components/Pages/Login/ForgotPassword/RecoverySuccess.jsx";
import VerifyPending from "./components/Pages/Login/TryVerify/VerifyPending.jsx";

import Home from "./components/Pages/Authenticated/Home/Home.jsx";
import Perfil from "./components/Pages/Authenticated/Perfil/Perfil.jsx";
import ProyectoFormPage from "./components/Pages/Authenticated/Perfil/ProyectoFormPage.jsx";
import Search from "./components/Pages/Search/Search.jsx";

// Rutas protegidas
import PrivateRoute from "./components/routes/PrivateRoute";

// Contextos
import { SearchProvider } from "./hooks/Search/useSearchContext.jsx";
import { PerfilProvider } from "./components/Pages/Authenticated/Perfil/PerfilContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyPending />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/recovery-success" element={<RecoverySuccess />} />
        <Route path="/recovery-failed" element={<RecoveryFailed />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protegidas */}
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

        {/* Agrupamos perfil y proyecto bajo el mismo Provider */}
        <Route
          path="/home/perfil"
          element={
            <PrivateRoute>
              <PerfilProvider>
                <Perfil />
              </PerfilProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/home/proyecto"
          element={
            <PrivateRoute>
              <PerfilProvider>
                <ProyectoFormPage />
              </PerfilProvider>
            </PrivateRoute>
          }
        />

        {/* Ruta pública con búsqueda */}
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
