import { useState, useEffect, useRef } from "react";
import pqrsService from "../services/pqrsService";

export const useStudentPQRS = () => {
  const toast = useRef(null);
  const [pqrsData, setPqrsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPQRS, setSelectedPQRS] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar PQRS del usuario al montar el componente
  useEffect(() => {
    cargarMisPQRS();
  }, []);

  const cargarMisPQRS = async () => {
    try {
      setLoading(true);

      // Obtener el usuario del localStorage
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      const usuarioId = usuario.usuario_id;

      if (!usuarioId) {
        console.error("No se encontró el ID de usuario");
        setPqrsData([]);
        return;
      }

      // Obtener las PQRS del usuario
      const data = await pqrsService.obtenerPorUsuario(usuarioId);

      // Mapear datos del backend al formato del frontend
      const pqrsMapeadas = Array.isArray(data) ? data.map(pqrs => ({
        id: pqrs.pqrs_id,
        nombre: pqrs.nombre_completo || 'N/A',
        correo: pqrs.correo_institucional || 'N/A',
        documento: pqrs.documento_identidad || 'N/A',
        tipoSolicitud: pqrs.tipo_solicitud || 'N/A',
        dependencia: pqrs.dependencia_relacionada || 'N/A',
        asunto: pqrs.asunto || 'N/A',
        descripcion: pqrs.descripcion_detallada || 'N/A',
        archivo: pqrs.archivo_adjunto || null,
        fecha: pqrs.fecha_solicitud ? new Date(pqrs.fecha_solicitud).toLocaleDateString() : 'N/A',
        estado: pqrs.estado || 'En revisión',
        respuesta: pqrs.respuesta || '',
        respondidoPor: pqrs.respondido_por || '',
        enviarAnonimo: pqrs.enviar_anonimo || false
      })) : [];

      setPqrsData(pqrsMapeadas);
    } catch (error) {
      console.error('Error al cargar mis PQRS:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar tus PQRS',
        life: 3000
      });
      setPqrsData([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtros y búsqueda
  const getFilteredData = () => {
    return pqrsData.filter((pqrs) => {
      const matchesSearch =
        pqrs.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pqrs.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pqrs.tipoSolicitud.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "todos" ||
        pqrs.estado.toLowerCase() === selectedFilter.toLowerCase();

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

  const handleViewDetails = async (pqrs) => {
    try {
      setLoading(true);
      // Cargar detalles completos desde el backend
      const detalles = await pqrsService.obtenerPorId(pqrs.id);

      setSelectedPQRS({
        ...pqrs,
        ...detalles
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar detalles:', error);
      setSelectedPQRS(pqrs);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPQRS(null);
  };

  const handleDelete = async (pqrsId) => {
    try {
      await pqrsService.cancelar(pqrsId);
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'PQRS cancelada correctamente',
        life: 3000
      });
      cargarMisPQRS();
    } catch (error) {
      console.error('Error al cancelar PQRS:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cancelar la PQRS',
        life: 3000
      });
    }
  };

  return {
    // Estado
    searchTerm,
    selectedFilter,
    currentPage,
    selectedPQRS,
    showModal,
    pqrsData,
    loading,
    toast,

    // Métodos de datos
    getFilteredData,
    getPaginatedData,
    cargarMisPQRS,

    // Handlers
    handleSearch,
    handleClearSearch,
    handleFilterChange,
    handlePageChange,
    handleViewDetails,
    handleCloseModal,
    handleDelete,
  };
};
