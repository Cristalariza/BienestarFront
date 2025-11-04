import { useState } from "react";

export const useAdminNoticias = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingNoticia, setEditingNoticia] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    imagen: null,
    estado: true,
  });

  // Datos de ejemplo - Conectar con API
  const noticiasData = [
    {
      noticia_id: "1",
      nombre: "Nuevo programa de becas 2025",
      descripcion: "Se abre convocatoria para becas de excelencia académica",
      fecha: "2025-11-01",
      imagen: "becas.jpg",
      estado: true,
      created_at: "2025-10-25",
    },
    {
      noticia_id: "2",
      nombre: "Jornada deportiva universitaria",
      descripcion: "Participa en los juegos intercursos este fin de semana",
      fecha: "2025-11-05",
      imagen: null,
      estado: true,
      created_at: "2025-10-28",
    },
  ];

  // Validaciones
  const validateForm = () => {
    if (!formData.nombre.trim()) {
      return { isValid: false, message: "El título es obligatorio" };
    }
    if (formData.nombre.length < 5) {
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
        message: "La fecha de la noticia debe ser posterior al día de hoy",
      };
    }

    // Validar imagen si existe
    if (formData.imagen) {
      // Validar que sea un archivo
      if (!(formData.imagen instanceof File)) {
        return {
          isValid: false,
          message: "Debe seleccionar un archivo de imagen válido",
        };
      }

      // Validar tamaño
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.imagen.size > maxSize) {
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
      const fileType = formData.imagen.type.toLowerCase();

      if (!allowedTypes.includes(fileType)) {
        return {
          isValid: false,
          message: "Solo se permiten imágenes en formato JPG, PNG o WEBP",
        };
      }

      // Validación adicional por extensión del nombre
      const fileName = formData.imagen.name.toLowerCase();
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
    return noticiasData.filter((noticia) => {
      if (!noticia.estado) return false;

      const matchesSearch =
        noticia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

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
    setEditingNoticia(null);
    setFormData({
      nombre: "",
      descripcion: "",
      fecha: "",
      imagen: null,
      estado: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (noticia) => {
    setEditingNoticia(noticia);
    setFormData({
      nombre: noticia.nombre,
      descripcion: noticia.descripcion,
      fecha: noticia.fecha,
      imagen: null,
      estado: noticia.estado,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNoticia(null);
    setFormData({
      nombre: "",
      descripcion: "",
      fecha: "",
      imagen: null,
      estado: true,
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
      imagen: file,
    }));
  };

  const handleSubmit = () => {
    const validation = validateForm();

    if (!validation.isValid) {
      alert(validation.message);
      return false;
    }

    if (editingNoticia) {
      console.log("Actualizando noticia:", editingNoticia.noticia_id, formData);
      alert("Noticia actualizada exitosamente");
    } else {
      console.log("Creando noticia:", formData);
      alert("Noticia creada exitosamente");
    }

    handleCloseModal();
    return true;
  };

  const handleDelete = (noticiaId) => {
    if (window.confirm("¿Estás seguro de eliminar esta noticia?")) {
      console.log("Eliminando noticia:", noticiaId);
      alert("Noticia eliminada exitosamente");
    }
  };

  const handleToggleEstado = (noticiaId, currentEstado) => {
    const action = currentEstado ? "desactivar" : "activar";
    if (window.confirm(`¿Estás seguro de ${action} esta noticia?`)) {
      console.log(`${action} noticia:`, noticiaId);
      alert(`Noticia ${action}da exitosamente`);
    }
  };

  return {
    searchTerm,
    currentPage,
    showModal,
    editingNoticia,
    formData,

    getFilteredData,
    getPaginatedData,

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
    handleToggleEstado,
  };
};
