import { useState } from "react";

export const usePQRSForm = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoInstitucional: "",
    documentoIdentidad: "",
    tipoSolicitud: "",
    dependenciaRelacionada: "",
    asunto: "",
    descripcionDetallada: "",
    archivoAdjunto: null,
    enviarAnonimo: false,
  });

  const [trackingCode, setTrackingCode] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Manejo especial para el checkbox de anónimo
    if (name === "enviarAnonimo") {
      if (checked) {
        // Si se marca como anónimo, establecer valores predeterminados
        setFormData((prev) => ({
          ...prev,
          enviarAnonimo: true,
          nombreCompleto: "ANONIMO",
          correoInstitucional: "anonimo@unicesar.edu.co",
          documentoIdentidad: "0000000000",
        }));
      } else {
        // Si se desmarca, limpiar los campos
        setFormData((prev) => ({
          ...prev,
          enviarAnonimo: false,
          nombreCompleto: "",
          correoInstitucional: "",
          documentoIdentidad: "",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? checked : type === "file" ? files[0] : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones adicionales (saltar validaciones si es anónimo)
    if (!formData.enviarAnonimo && !formData.nombreCompleto.trim()) {
      alert("Por favor ingresa tu nombre completo");
      return;
    }

    if (!formData.enviarAnonimo && !formData.correoInstitucional.trim()) {
      alert("Por favor ingresa tu correo institucional");
      return;
    }

    if (!formData.tipoSolicitud) {
      alert("Por favor selecciona el tipo de solicitud");
      return;
    }

    if (!formData.dependenciaRelacionada) {
      alert("Por favor selecciona la dependencia relacionada");
      return;
    }

    if (!formData.asunto.trim()) {
      alert("Por favor ingresa el asunto");
      return;
    }

    if (!formData.descripcionDetallada.trim()) {
      alert("Por favor ingresa la descripción detallada");
      return;
    }

    // Validar formato de email (saltar si es anónimo)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !formData.enviarAnonimo &&
      !emailRegex.test(formData.correoInstitucional)
    ) {
      alert("Por favor ingresa un correo electrónico válido");
      return;
    }

    // Validar archivo si se adjunta
    if (formData.archivoAdjunto) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.archivoAdjunto.size > maxSize) {
        alert("El archivo no puede ser mayor a 5MB");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      if (!allowedTypes.includes(formData.archivoAdjunto.type)) {
        alert(
          "Formato de archivo no permitido. Solo se permiten: PDF, DOC, DOCX, JPG, PNG"
        );
        return;
      }
    }

    // Aquí iría la lógica para enviar el formulario al backend
    console.log("Formulario PQRS enviado:", formData);

    // Simular envío exitoso
    alert("¡PQRS enviada exitosamente! Te contactaremos pronto.");

    // Resetear formulario
    setFormData({
      nombreCompleto: "",
      correoInstitucional: "",
      documentoIdentidad: "",
      tipoSolicitud: "",
      dependenciaRelacionada: "",
      asunto: "",
      descripcionDetallada: "",
      archivoAdjunto: null,
      enviarAnonimo: false,
    });
  };

  const handleTrackingSearch = (e) => {
    e.preventDefault();

    if (!trackingCode.trim()) {
      alert("Por favor ingresa un código de radicado");
      return;
    }

    // Aquí iría la lógica para buscar el estado de la PQRS
    console.log("Buscando código:", trackingCode);

    // Simular búsqueda
    alert(`Buscando información para el código: ${trackingCode}`);
  };

  return {
    formData,
    trackingCode,
    handleInputChange,
    handleSubmit,
    handleTrackingSearch,
    setTrackingCode,
  };
};
