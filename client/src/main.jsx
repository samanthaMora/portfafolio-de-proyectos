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
import Landing from "./components/Pages/Landing.jsx";

import Home from "./components/Pages/Authenticated/Home/Home.jsx";
import Perfil from "./components/Pages/Authenticated/Perfil/Perfil.jsx";
import ProyectoFormPage from "./components/Pages/Authenticated/Perfil/ProyectoFormPage.jsx";
import Search from "./components/Pages/Search/Search.jsx";
import ProjectPublicView from "./components/Pages/Search/ProjectPublicView.jsx";

// Rutas protegidas
import PrivateRoute from "./components/routes/PrivateRoute";

// Contextos
import { SearchProvider } from "./hooks/Search/useSearchContext.jsx";
import { PerfilProvider } from "./components/Pages/Authenticated/Perfil/PerfilContext.jsx";

document.documentElement.style.height = "100%"; // html
document.body.style.height = "100%";            // body
document.getElementById("root").style.height = "100%"; // #root

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ------ PÁGINA INICIO ------ */}
        <Route path="/" element={<Landing />} />

        {/* ------ PÚBLICAS ------ */}
        <Route path="/login"             element={<Login />} />
        <Route path="/register"          element={<Register />} />
        <Route path="/verify"            element={<VerifyPending />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password"   element={<ForgotPassword />} />
        <Route path="/recovery-success"  element={<RecoverySuccess />} />
        <Route path="/recovery-failed"   element={<RecoveryFailed />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/proyectos/:id"     element={<ProjectPublicView />} />

        {/* búsqueda pública con provider */}
        <Route
          path="/search"
          element={
            <SearchProvider>
              <Search />
            </SearchProvider>
          }
        />

        {/* ------ PROTEGIDAS ------ */}
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

        <Route
          path="/home/proyecto/editar/:id"
          element={
            <PrivateRoute>
              <PerfilProvider>
                <ProyectoFormPage />
              </PerfilProvider>
            </PrivateRoute>
          }
        />

        {/* ------ NOT FOUND (último) ------ */}
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);