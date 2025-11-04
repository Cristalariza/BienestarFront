import { useState } from "react";

export const useAdminPQRS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPQRS, setSelectedPQRS] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  // Datos de ejemplo - Aquí conectarías con tu API
  const pqrsData = [
    {
      nombre: "Juan Pérez",
      correo: "juan.perez@unicesar.edu.co",
      documento: "1234567890",
      tipoSolicitud: "Petición",
      dependencia: "Bienestar Universitario",
      asunto: "Solicitud de beca",
      descripcion:
        "Solicito información sobre el proceso de postulación a becas para el semestre 2025-1",
      archivo: "documento.pdf",
      fecha: "2025-11-01",
      estado: "En revisión",
    },
    {
      nombre: "María García",
      correo: "maria.garcia@unicesar.edu.co",
      documento: "9876543210",
      tipoSolicitud: "Queja",
      dependencia: "Dirección Académica",
      asunto: "Horario de atención",
      descripcion: "El horario de atención no está siendo cumplido",
      archivo: null,
      fecha: "2025-11-02",
      estado: "En trámite",
    },
    {
      nombre: "Carlos López",
      correo: "carlos.lopez@unicesar.edu.co",
      documento: "5555555555",
      tipoSolicitud: "Reclamo",
      dependencia: "Dirección Financiera",
      asunto: "Error en el cobro",
      descripcion: "Se realizó un cobro duplicado en mi matrícula",
      archivo: "comprobante.pdf",
      fecha: "2025-10-30",
      estado: "Cerrada",
    },
    {
      nombre: "Ana Martínez",
      correo: "ana.martinez@unicesar.edu.co",
      documento: "4444444444",
      tipoSolicitud: "Sugerencia",
      dependencia: "Bienestar Universitario",
      asunto: "Mejora en servicios",
      descripcion: "Sugiero ampliar el horario de la biblioteca",
      archivo: null,
      fecha: "2025-10-28",
      estado: "En revisión",
    },
    {
      nombre: "ANONIMO",
      correo: "anonimo@unicesar.edu.co",
      documento: "0000000000",
      tipoSolicitud: "Queja",
      dependencia: "Recursos Humanos",
      asunto: "Trato inadecuado",
      descripcion: "Reporte de trato inadecuado por parte de un funcionario",
      archivo: null,
      fecha: "2025-11-03",
      estado: "En trámite",
    },
  ];

  // Validaciones
  const validateCloseModal = () => {
    if (
      selectedPQRS?.estado === "Consulta/Respuesta" &&
      !selectedPQRS?.respuesta
    ) {
      return {
        isValid: false,
        message:
          'Por favor, guarda una respuesta antes de cerrar. El estado "Respuesta" requiere una respuesta.',
      };
    }
    return { isValid: true };
  };

  const validateSaveResponse = () => {
    if (!respuesta.trim()) {
      return {
        isValid: false,
        message: "Por favor escribe una respuesta antes de guardar",
      };
    }
    return { isValid: true };
  };

  const notifyStatusChange = (newStatus) => {
    if (
      newStatus === "Consulta/Respuesta" &&
      !respuesta.trim() &&
      !selectedPQRS?.respuesta
    ) {
      return 'Al seleccionar "Respuesta", debes escribir y guardar una respuesta antes de cerrar.';
    }
    return null;
  };

  // Filtros
  const getFilteredData = () => {
    return pqrsData.filter((pqrs) => {
      const matchesSearch =
        pqrs.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pqrs.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pqrs.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pqrs.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "todos" ||
        pqrs.tipoSolicitud.toLowerCase() === selectedFilter.toLowerCase();

      return matchesSearch && matchesFilter;
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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (pqrs) => {
    setSelectedPQRS(pqrs);
    setShowModal(true);
    setRespuesta(pqrs.respuesta || "");
  };

  const handleCloseModal = () => {
    const validation = validateCloseModal();

    if (!validation.isValid) {
      alert(validation.message);
      return false;
    }

    setShowModal(false);
    setSelectedPQRS(null);
    setRespuesta("");
    return true;
  };

  const handleChangeStatus = (newStatus) => {
    const notification = notifyStatusChange(newStatus);

    if (notification) {
      alert(notification);
    }

    setSelectedPQRS({ ...selectedPQRS, estado: newStatus });
  };

  const handleSaveResponse = () => {
    const validation = validateSaveResponse();

    if (!validation.isValid) {
      alert(validation.message);
      return false;
    }

    // Aquí conectarías con tu API para guardar la respuesta
    console.log("Guardando respuesta:", respuesta);
    alert("Respuesta guardada exitosamente");

    setSelectedPQRS({ ...selectedPQRS, respuesta: respuesta });
    return true;
  };

  const handleExport = () => {
    // Aquí conectarías con tu API para exportar
    console.log("Exportando datos PQRS...");
    alert("Exportando datos a Excel...");
  };

  return {
    // Estado
    searchTerm,
    selectedFilter,
    currentPage,
    selectedPQRS,
    showModal,
    respuesta,
    pqrsData,

    // Setters
    setRespuesta,

    // Métodos de datos
    getFilteredData,
    getPaginatedData,

    // Handlers
    handleSearch,
    handleClearSearch,
    handleFilterChange,
    handlePageChange,
    handleViewDetails,
    handleCloseModal,
    handleChangeStatus,
    handleSaveResponse,
    handleExport,
  };
};
