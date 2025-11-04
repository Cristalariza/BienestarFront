import { useState } from "react";

export const useAdminEventos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    organizador: "",
    imagen_url: null,
    activo: true,
  });

  // Datos de ejemplo - Conectar con API
  const eventosData = [
    {
      evento_id: "1",
      titulo: "Feria de ciencias 2025",
      descripcion: "Exposición de proyectos científicos de estudiantes",
      fecha: "2025-11-15",
      lugar: "Auditorio Principal",
      organizador: "Facultad de Ciencias",
      imagen_url: "feria.jpg",
      activo: true,
      created_at: "2025-10-20",
    },
    {
      evento_id: "2",
      titulo: "Conferencia de emprendimiento",
      descripcion: "Charla con empresarios exitosos de la región",
      fecha: "2025-11-20",
      lugar: "Sala de conferencias",
      organizador: "Bienestar Universitario",
      imagen_url: null,
      activo: true,
      created_at: "2025-10-22",
    },
  ];

  // Validaciones
  const validateForm = () => {
    if (!formData.titulo.trim()) {
      return { isValid: false, message: "El título es obligatorio" };
    }
    if (formData.titulo.length < 5) {
      return {
        isValid: false,
        message: "El título debe tener al menos 5 caracteres",
      };
    }
    if (!formData.descripcion.trim()) {
      return { isValid: false, message: "La descripción es obligatoria" };
    }
    if (formData.descripcion.length < 10) {
      return {
        isValid: false,
        message: "La descripción debe tener al menos 10 caracteres",
      };
    }
    if (!formData.fecha) {
      return { isValid: false, message: "La fecha es obligatoria" };
    }

    // Validar que la fecha sea mayor a hoy (no puede ser hoy mismo)
    const fechaSeleccionada = new Date(formData.fecha);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    if (fechaSeleccionada < manana) {
      return {
        isValid: false,
        message: "La fecha del evento debe ser posterior al día de hoy",
      };
    }

    if (!formData.organizador.trim()) {
      return { isValid: false, message: "El organizador es obligatorio" };
    }

    // Validar imagen si existe
    if (formData.imagen_url) {
      // Validar que sea un archivo
      if (!(formData.imagen_url instanceof File)) {
        return {
          isValid: false,
          message: "Debe seleccionar un archivo de imagen válido",
        };
      }

      // Validar tamaño
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.imagen_url.size > maxSize) {
        return {
          isValid: false,
          message: "La imagen no puede ser mayor a 5MB",
        };
      }

      // Validar tipo de archivo
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      const fileType = formData.imagen_url.type.toLowerCase();

      if (!allowedTypes.includes(fileType)) {
        return {
          isValid: false,
          message: "Solo se permiten imágenes en formato JPG, PNG o WEBP",
        };
      }

      // Validación adicional por extensión del nombre
      const fileName = formData.imagen_url.name.toLowerCase();
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
      const hasValidExtension = allowedExtensions.some((ext) =>
        fileName.endsWith(ext)
      );

      if (!hasValidExtension) {
        return {
          isValid: false,
          message: "El archivo debe tener extensión .jpg, .jpeg, .png o .webp",
        };
      }
    }

    return { isValid: true };
  };

  // Filtros
  const getFilteredData = () => {
    return eventosData.filter((evento) => {
      if (!evento.activo) return false; // Ocultar inactivos

      const matchesSearch =
        evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evento.organizador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evento.lugar &&
          evento.lugar.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    });
  };

  // Paginación
  const getPaginatedData = (filteredData, itemsPerPage = 10) => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return { paginatedData, totalPages };
  };

  // Handlers
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenCreateModal = () => {
    setEditingEvento(null);
    setFormData({
      titulo: "",
      descripcion: "",
      fecha: "",
      lugar: "",
      organizador: "",
      imagen_url: null,
      activo: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (evento) => {
    setEditingEvento(evento);
    setFormData({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      lugar: evento.lugar || "",
      organizador: evento.organizador,
      imagen_url: null, // No precargamos la imagen
      activo: evento.activo,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvento(null);
    setFormData({
      titulo: "",
      descripcion: "",
      fecha: "",
      lugar: "",
      organizador: "",
      imagen_url: null,
      activo: true,
    });
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      imagen_url: file,
    }));
  };

  const handleSubmit = () => {
    const validation = validateForm();

    if (!validation.isValid) {
      alert(validation.message);
      return false;
    }

    if (editingEvento) {
      // Actualizar evento existente
      console.log("Actualizando evento:", editingEvento.evento_id, formData);
      alert("Evento actualizado exitosamente");
    } else {
      // Crear nuevo evento
      console.log("Creando evento:", formData);
      alert("Evento creado exitosamente");
    }

    handleCloseModal();
    return true;
  };

  const handleDelete = (eventoId) => {
    if (window.confirm("¿Estás seguro de eliminar este evento?")) {
      // Aquí conectarías con tu API para soft delete
      console.log("Eliminando evento:", eventoId);
      alert("Evento eliminado exitosamente");
    }
  };

  const handleToggleActivo = (eventoId, currentActivo) => {
    const action = currentActivo ? "desactivar" : "activar";
    if (window.confirm(`¿Estás seguro de ${action} este evento?`)) {
      // Aquí conectarías con tu API
      console.log(`${action} evento:`, eventoId);
      alert(`Evento ${action}do exitosamente`);
    }
  };

  return {
    // Estado
    searchTerm,
    currentPage,
    showModal,
    editingEvento,
    formData,

    // Métodos de datos
    getFilteredData,
    getPaginatedData,

    // Handlers
    handleSearch,
    handleClearSearch,
    handlePageChange,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleDelete,
    handleToggleActivo,
  };
};
