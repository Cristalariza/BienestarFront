import { useState, useEffect, useRef } from "react";
import pqrsService from "../services/pqrsService";

export const useAdminPQRS = () => {
  const toast = useRef(null);
  const [pqrsData, setPqrsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPQRS, setSelectedPQRS] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [respuesta, setRespuesta] = useState("");
  const [estadisticas, setEstadisticas] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarPQRS();
    cargarEnums();
    cargarEstadisticas();
  }, []);

  const cargarPQRS = async () => {
    try {
      setLoading(true);
      const data = await pqrsService.obtenerTodas({
        skip: 0,
        limit: 1000,
        only_active: true
      });

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
      console.error('Error al cargar PQRS:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar las PQRS',
        life: 3000
      });
      setPqrsData([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarEnums = async () => {
    try {
      const [tiposData, estadosData, categoriasData] = await Promise.all([
        pqrsService.obtenerTipos(),
        pqrsService.obtenerEstados(),
        pqrsService.obtenerCategorias(),
      ]);
      setTipos(Array.isArray(tiposData) ? tiposData : []);
      setEstados(Array.isArray(estadosData) ? estadosData : ["En revisión", "En trámite", "Consulta/Respuesta", "Cerrada"]);
      setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
    } catch (error) {
      console.error('Error al cargar enums:', error);
      // Valores por defecto
      setTipos(["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"]);
      setEstados(["En revisión", "En trámite", "Consulta/Respuesta", "Cerrada"]);
      setCategorias([]);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const stats = await pqrsService.obtenerEstadisticas();
      setEstadisticas(stats);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

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

  // Filtros y búsqueda
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

  // Búsqueda en backend (usar cuando searchTerm cambie después de un delay)
  const buscarEnBackend = async (termino) => {
    if (!termino.trim()) {
      cargarPQRS();
      return;
    }

    try {
      setLoading(true);
      const resultados = await pqrsService.buscar(termino);

      const pqrsMapeadas = Array.isArray(resultados) ? resultados.map(pqrs => ({
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
      console.error('Error al buscar:', error);
    } finally {
      setLoading(false);
    }
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
    cargarPQRS();
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
      setRespuesta(detalles.respuesta || pqrs.respuesta || "");
    } catch (error) {
      console.error('Error al cargar detalles:', error);
      setSelectedPQRS(pqrs);
      setShowModal(true);
      setRespuesta(pqrs.respuesta || "");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPQRS(null);
    setRespuesta("");
    return true;
  };

  const handleChangeStatus = async (newStatus) => {
    const notification = notifyStatusChange(newStatus);

    if (notification) {
      toast.current?.show({
        severity: 'info',
        summary: 'Información',
        detail: notification,
        life: 3000
      });
    }

    try {
      // Actualizar en el backend
      await pqrsService.actualizar(selectedPQRS.id, {
        estado: newStatus,
        respuesta: respuesta || selectedPQRS.respuesta,
        respondido_por: "Administrador",
        fecha_respuesta: new Date().toISOString()
      });

      setSelectedPQRS({ ...selectedPQRS, estado: newStatus });

      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Estado actualizado correctamente',
        life: 3000
      });

      // Recargar la lista
      cargarPQRS();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo actualizar el estado',
        life: 3000
      });
    }
  };

  const handleSaveResponse = async () => {
    const validation = validateSaveResponse();

    if (!validation.isValid) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: validation.message,
        life: 3000
      });
      return false;
    }

    try {
      setLoading(true);

      // Actualizar PQRS con la respuesta usando PUT
      await pqrsService.actualizar(selectedPQRS.id, {
        respuesta: respuesta,
        respondido_por: "Administrador",
        fecha_respuesta: new Date().toISOString()
      });

      // Actualizar el estado local
      setSelectedPQRS({
        ...selectedPQRS,
        respuesta: respuesta,
        respondidoPor: "Administrador"
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Respuesta guardada exitosamente',
        life: 3000
      });

      // Recargar lista de PQRS
      cargarPQRS();

      return true;
    } catch (error) {
      console.error('Error al guardar respuesta:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.detail || 'No se pudo guardar la respuesta',
        life: 3000
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    try {
      // Exportar a CSV
      const headers = ['ID', 'Nombre', 'Correo', 'Tipo', 'Dependencia', 'Asunto', 'Descripción', 'Estado', 'Fecha'];
      const csvData = pqrsData.map(pqrs => [
        pqrs.id,
        pqrs.nombre,
        pqrs.correo,
        pqrs.tipoSolicitud,
        pqrs.dependencia,
        pqrs.asunto,
        pqrs.descripcion,
        pqrs.estado,
        pqrs.fecha
      ]);

      const csv = [
        headers.join(','),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `pqrs_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();

      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Datos exportados correctamente',
        life: 3000
      });
    } catch (error) {
      console.error('Error al exportar:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron exportar los datos',
        life: 3000
      });
    }
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
      cargarPQRS();
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
    respuesta,
    pqrsData,
    loading,
    estadisticas,
    tipos,
    estados,
    categorias,
    toast,

    // Setters
    setRespuesta,

    // Métodos de datos
    getFilteredData,
    getPaginatedData,
    cargarPQRS,
    buscarEnBackend,

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
    handleDelete,
  };
};
