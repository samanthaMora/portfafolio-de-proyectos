import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isEqual from "lodash/isEqual";

import { usePerfilContext } from "../PerfilContext.jsx";
import { useCreateProyect } from "../../../../../hooks/Perfil/Test/useCreateProyect.js";
import { useUpdateProyect } from "../../../../../hooks/Perfil/Test/useUpdateProyect.js";
import { useGetProyect } from "../../../../../hooks/Perfil/Test/useGetProyect.js";
import { useCreateCategory } from "../../../../../hooks/Perfil/Test/creators/useCreateCategory.js";
import { useCreateTag } from "../../../../../hooks/Perfil/Test/creators/useCreateTag.js";
import { useCreateTechnology } from "../../../../../hooks/Perfil/Test/creators/useCreateTechnology.js";

import { pushUnique } from "./helpers/pushUnique";
import { getOrCreateIds } from "./helpers/getOrCreateIds";

export function useFormProyect(id) {
  const {
    proyectoEnEdicion,
    arrProyects,
    setArrProyects,
    setProyectoEnEdicion,
  } = usePerfilContext();
  const navigate = useNavigate();

  const { create: createProject } = useCreateProyect();
  const { update: updateProject } = useUpdateProyect();
  const { get: getProject } = useGetProyect();
  const { create: createCategory } = useCreateCategory();
  const { create: createTag } = useCreateTag();
  const { create: createTechnology } = useCreateTechnology();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    url: "",
    repositorio_github: "",
    publico: true,
  });
  const [cats, setCats] = useState([]);
  const [tags, setTags] = useState([]);
  const [techs, setTechs] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!id || loaded) return;
    (async () => {
      try {
        const data = await getProject(id);
        if (!data) {
          setMensaje("❌ Error al cargar proyecto");
          return;
        }
        if (!isEqual(proyectoEnEdicion, data)) {
          setProyectoEnEdicion(data);
        }
        setForm({
          titulo: data.titulo,
          descripcion: data.descripcion,
          url: data.url || "",
          repositorio_github: data.repositorio_github || "",
          publico: data.publico,
        });
        setCats(data.categorias);
        setTags(data.etiquetas);
        setTechs(data.tecnologias);
        setLoaded(true);
      } catch (err) {
        console.error(err);
        setMensaje("❌ Error al cargar el proyecto");
      }
    })();
  }, [id, loaded, proyectoEnEdicion, setProyectoEnEdicion, getProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    try {
      const catIds = await getOrCreateIds(cats, createCategory);
      const tagIds = await getOrCreateIds(tags, createTag);
      const techIds = await getOrCreateIds(techs, createTechnology);

      const payload = {
        ...form,
        categorias: catIds,
        etiquetas: tagIds,
        tecnologias: techIds,
      };

      if (proyectoEnEdicion) {
        await updateProject(proyectoEnEdicion.id, payload);
        setMensaje("✅ Proyecto actualizado");
        setArrProyects(
          arrProyects.map((p) =>
            p.id === proyectoEnEdicion.id ? { ...p, ...payload } : p
          )
        );
      } else {
        const nuevo = await createProject(payload);
        if (!nuevo?.id) {
          setMensaje("❌ No se pudo crear el proyecto");
          return;
        }
        setMensaje("🎉 Proyecto creado");
        setArrProyects([...arrProyects, { id: nuevo.id, ...payload }]);
      }
      setTimeout(() => {
        setProyectoEnEdicion(null);
        navigate("/home/perfil");
      }, 800);
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al guardar proyecto");
    } finally {
      setLoading(false);
    }
  };

  return {
    proyectoEnEdicion,
    form,
    setForm,
    cats,
    setCats,
    tags,
    setTags,
    techs,
    setTechs,
    inpCat: form.inpCat, // si usas form para input, si no usa estados separados
    setInpCat: (v) => setForm((f) => ({ ...f, inpCat: v })),
    inpTag: form.inpTag,
    setInpTag: (v) => setForm((f) => ({ ...f, inpTag: v })),
    inpTech: form.inpTech,
    setInpTech: (v) => setForm((f) => ({ ...f, inpTech: v })),
    loading,
    mensaje,
    handleSubmit,
    pushUnique,
  };
}
