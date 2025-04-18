import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// ✅ Alerta de éxito
export const showSuccess = (options = {}) => {
  const defaultOptions = {
    icon: "success",
    title: "Éxito",
    text: typeof options === "string" ? options : "Operación exitosa",
    timer: 2000,
    showConfirmButton: false,
  };
  return Swal.fire(typeof options === "string" ? defaultOptions : { ...defaultOptions, ...options });
};

// ⚠️ Confirmación (como para eliminar)
export const showConfirm = async (options = {}) => {
  const defaultOptions = {
    icon: "warning",
    title: "Confirmar acción",
    text: typeof options === "string" ? options : "¿Estás seguro?",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    reverseButtons: true,
  };
  const finalOptions = typeof options === "string" ? defaultOptions : { ...defaultOptions, ...options };
  const result = await Swal.fire(finalOptions);
  return result.isConfirmed;
};

// ❌ Alerta de error
export const showError = (options = {}) => {
  const defaultOptions = {
    icon: "error",
    title: "Error",
    text: typeof options === "string" ? options : "Ocurrió un error",
  };
  return Swal.fire(typeof options === "string" ? defaultOptions : { ...defaultOptions, ...options });
};

// ⏳ Alerta de carga / espera
export const showLoading = (options = {}) => {
  const defaultOptions = {
    title: "Procesando...",
    text: "Por favor espera.",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  };
  return Swal.fire(typeof options === "string" ? defaultOptions : { ...defaultOptions, ...options });
};
