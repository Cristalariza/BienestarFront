import { useState, useEffect, useRef } from "react";
import pqrsService from "../services/pqrsService";
import { Toast } from 'primereact/toast';

export const usePQRSForm = () => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [categorias, setCategorias] = useState([]);

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
  const [trackingResult, setTrackingResult] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  // Cargar enums al montar el componente
  useEffect(() => {
    cargarEnums();
  }, []);

  const cargarEnums = async () => {
    try {
      const [tiposData, categoriasData] = await Promise.all([
        pqrsService.obtenerTipos(),
        pqrsService.obtenerCategorias(),
      ]);
      setTipos(Array.isArray(tiposData) ? tiposData : []);
      setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
    } catch (error) {
      console.error('Error al cargar enums:', error);
      // Valores por defecto si falla la carga
      setTipos(["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"]);
      setCategorias([
        "Registro Académico",
        "Bienestar Universitario",
        "Servicios Generales",
        "Infraestructura",
        "Docentes",
        "Cultura",
        "Sistemas",
        "Recursos Humanos",
        "Financiero",
        "Otra"
      ]);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.enviarAnonimo && !formData.nombreCompleto.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor ingresa tu nombre completo',
        life: 3000
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.enviarAnonimo) {
      if (!formData.correoInstitucional.trim()) {
        toast.current?.show({
          severity: 'warn',
          summary: 'Validación',
          detail: 'Por favor ingresa tu correo institucional',
          life: 3000
        });
        return;
      }
      if (!emailRegex.test(formData.correoInstitucional)) {
        toast.current?.show({
          severity: 'warn',
          summary: 'Validación',
          detail: 'Por favor ingresa un correo electrónico válido',
          life: 3000
        });
        return;
      }
    }

    if (!formData.tipoSolicitud) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor selecciona el tipo de solicitud',
        life: 3000
      });
      return;
    }

    if (!formData.dependenciaRelacionada) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor selecciona la dependencia relacionada',
        life: 3000
      });
      return;
    }

    if (!formData.asunto.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor ingresa el asunto',
        life: 3000
      });
      return;
    }

    if (!formData.descripcionDetallada.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor ingresa la descripción detallada',
        life: 3000
      });
      return;
    }

    // Validar archivo si se adjunta
    if (formData.archivoAdjunto) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.archivoAdjunto.size > maxSize) {
        toast.current?.show({
          severity: 'warn',
          summary: 'Validación',
          detail: 'El archivo no puede ser mayor a 5MB',
          life: 3000
        });
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
        toast.current?.show({
          severity: 'warn',
          summary: 'Validación',
          detail: 'Formato de archivo no permitido. Solo se permiten: PDF, DOC, DOCX, JPG, PNG',
          life: 3000
        });
        return;
      }
    }

    try {
      setLoading(true);

      // Preparar datos para enviar al backend
      const pqrsData = {
        nombre_completo: formData.nombreCompleto,
        correo_institucional: formData.correoInstitucional,
        documento_identidad: formData.documentoIdentidad || "",
        enviar_anonimo: formData.enviarAnonimo,
        tipo_solicitud: formData.tipoSolicitud,
        dependencia_relacionada: formData.dependenciaRelacionada,
        asunto: formData.asunto,
        descripcion_detallada: formData.descripcionDetallada,
        archivo_adjunto: formData.archivoAdjunto ? formData.archivoAdjunto.name : ""
      };

      const resultado = await pqrsService.crear(pqrsData);

      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: `PQRS enviada exitosamente. Código de radicado: ${resultado.pqrs_id || 'Generado'}`,
        life: 5000
      });

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

    } catch (error) {
      console.error('Error al enviar PQRS:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.detail || 'No se pudo enviar la PQRS. Por favor intenta de nuevo.',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTrackingSearch = async (e) => {
    e.preventDefault();

    if (!trackingCode.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Por favor ingresa un código de radicado',
        life: 3000
      });
      return;
    }

    try {
      setLoading(true);
      const resultado = await pqrsService.consultarPorCodigo(trackingCode);
      setTrackingResult(resultado);
      setShowTrackingModal(true);
    } catch (error) {
      console.error('Error al buscar PQRS:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'No encontrado',
        detail: 'No se encontró una PQRS con ese código de radicado',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTrackingModal = () => {
    setShowTrackingModal(false);
    setTrackingResult(null);
    setTrackingCode("");
  };

  return {
    formData,
    trackingCode,
    trackingResult,
    showTrackingModal,
    loading,
    tipos,
    categorias,
    toast,
    handleInputChange,
    handleSubmit,
    handleTrackingSearch,
    handleCloseTrackingModal,
    setTrackingCode,
  };
};
