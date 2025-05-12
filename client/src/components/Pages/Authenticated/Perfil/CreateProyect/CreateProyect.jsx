// src/components/Pages/Authenticated/Perfil/CreateProyect/CreateProyect.jsx
import React from "react";
import { useFormProyect } from "./useFormProyect.js";
import ProyectoForm from "./ProyectForm.jsx";

export default function CreateProyect({ id }) {
  const formProps = useFormProyect(id);
  return <ProyectoForm {...formProps} />;
}
