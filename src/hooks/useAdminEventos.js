import { useState, useEffect, useRef } from "react";
import { eventosService } from "../services";

export const useAdminEventos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [showInactive, setShowInactive] = useState(false);
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    organizador: "",
    imagen_url: "",
    activo: true,
  });

  // Cargar eventos desde el backend
  useEffect(() => {
    cargarEventos();
  }, [showInactive]); // Recargar cuando cambie el checkbox

  const cargarEventos = async () => {
    try {
      setLoading(true);
      console.log('Iniciando carga de eventos...');

      // Si showInactive es false, traer solo activos (only_active: true)
      // Si showInactive es true, traer todos para filtrar inactivos (only_active: false)
      const onlyActive = !showInactive;
      console.log('Consultando con only_active:', onlyActive);

      const data = await eventosService.obtenerTodos({
        skip: 0,
        limit: 100,
        only_active: onlyActive
      });
      console.log('Eventos cargados del backend:', data);

      const eventosArray = Array.isArray(data) ? data : [];

      if (!Array.isArray(data)) {
        console.warn('Los datos recibidos no son un array, usando array vacío');
      }

      // Mapear datos del backend al formato del frontend
      const eventosFormateados = eventosArray.map((evento, index) => {
        console.log(`Mapeando evento ${index}:`, evento);
        return {
          evento_id: evento.evento_id || `temp-${index}`,
          titulo: evento.titulo || 'Sin título',
          descripcion: evento.descripcion || 'Sin descripción',
          fecha: evento.fecha || '',
          lugar: evento.lugar || '',
          organizador: evento.organizador || '',
          imagen_url: evento.imagen_url || null,
          activo: evento.activo !== undefined ? evento.activo : true,
          created_at: evento.created_at || new Date().toISOString(),
        };
      });

      console.log('Eventos formateados:', eventosFormateados);
      setEventos(eventosFormateados);
      console.log('Eventos establecidos correctamente');
    } catch (error) {
      console.error('Error completo al cargar eventos:', error);
      console.error('Detalles del error:', {
        message: error.message,
        status: error.status,
        data: error.data
      });

      // No mostrar toast si el backend no está corriendo
      if (error.status !== 503) {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los eventos. Verifica la consola para más detalles.',
          life: 3000
        });
      }
      setEventos([]);
    } finally {
      console.log('Finalizando carga de eventos');
      setLoading(false);
    }
  };

  // Validaciones
  const validateForm = () => {
    if (!formData.titulo || !formData.titulo.trim()) {
      return { isValid: false, message: "El título es obligatorio" };
    }
    if (formData.titulo.length < 5) {
      return {
        isValid: false,
        message: "El título debe tener al menos 5 caracteres",
      };
    }

    // Validar título único
    const tituloExiste = eventos.some((evento) => {
      // Si estamos editando, excluir el evento actual de la validación
      if (editingEvento && evento.evento_id === editingEvento.evento_id) {
        return false;
      }
      // Comparar títulos en minúsculas para hacer la validación case-insensitive
      return evento.titulo.toLowerCase().trim() === formData.titulo.toLowerCase().trim();
    });

    if (tituloExiste) {
      return {
        isValid: false,
        message: "Ya existe un evento con este título. Por favor, elige otro título.",
      };
    }

    if (!formData.descripcion || !formData.descripcion.trim()) {
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

    if (!formData.organizador || !formData.organizador.trim()) {
      return { isValid: false, message: "El organizador es obligatorio" };
    }

    return { isValid: true };
  };

  // Filtros
  const getFilteredData = () => {
    // Primero filtrar por estado activo/inactivo
    let resultado = eventos.filter((evento) => {
      if (showInactive) {
        // Si el checkbox está activo, mostrar SOLO los inactivos
        return evento.activo === false;
      } else {
        // Si el checkbox está inactivo, mostrar SOLO los activos
        return evento.activo === true;
      }
    });

    // Luego aplicar filtro de búsqueda si existe
    if (!searchTerm.trim()) return resultado;

    const term = searchTerm.toLowerCase();
    return resultado.filter((evento) => {
      const titulo = evento.titulo || '';
      const descripcion = evento.descripcion || '';
      const organizador = evento.organizador || '';
      const lugar = evento.lugar || '';

      return (
        titulo.toLowerCase().includes(term) ||
        descripcion.toLowerCase().includes(term) ||
        organizador.toLowerCase().includes(term) ||
        lugar.toLowerCase().includes(term)
      );
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
      imagen_url: "",
      activo: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = async (evento) => {
    try {
      setLoading(true);

      // Consultar el evento actualizado del backend
      console.log('Consultando evento:', evento.evento_id);
      const eventoActualizado = await eventosService.obtenerPorId(evento.evento_id);
      console.log('Evento obtenido del backend:', eventoActualizado);

      setEditingEvento(eventoActualizado);

      // Convertir fechas ISO a formato yyyy-MM-dd para los inputs de tipo date
      const formatearFecha = (fechaISO) => {
        if (!fechaISO) return '';
        const fecha = new Date(fechaISO);
        return fecha.toISOString().split('T')[0];
      };

      setFormData({
        titulo: eventoActualizado.titulo || '',
        descripcion: eventoActualizado.descripcion || '',
        fecha: formatearFecha(eventoActualizado.fecha),
        lugar: eventoActualizado.lugar || '',
        organizador: eventoActualizado.organizador || '',
        imagen_url: eventoActualizado.imagen_url || '',
        activo: eventoActualizado.activo !== undefined ? eventoActualizado.activo : true,
      });

      setShowModal(true);
    } catch (error) {
      console.error('Error al cargar el evento para editar:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo cargar la información del evento',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
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
      imagen_url: "",
      activo: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (file) => {
    // Por ahora solo guardamos el nombre del archivo o URL
    // En una implementación real, subirías el archivo a un servidor
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagen_url: file.name, // O la URL después de subirlo
      }));
    }
  };

  const handleSubmit = async () => {
    const validation = validateForm();

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

      // Preparar datos para el backend
      // Convertir fecha a ISO 8601 si es necesario
      const eventoData = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha: new Date(formData.fecha).toISOString(),
        lugar: formData.lugar,
        organizador: formData.organizador,
        imagen_url: formData.imagen_url || "",
        activo: formData.activo,
      };

      if (editingEvento) {
        console.log("Actualizando evento:", editingEvento.evento_id, eventoData);
        await eventosService.actualizar(editingEvento.evento_id, eventoData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Evento actualizado exitosamente',
          life: 3000
        });
      } else {
        console.log("Creando evento:", eventoData);
        await eventosService.crear(eventoData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Evento creado exitosamente',
          life: 3000
        });
      }

      // Recargar eventos
      await cargarEventos();
      handleCloseModal();
      return true;
    } catch (error) {
      console.error('Error al guardar evento:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'Error al guardar el evento. Por favor, intenta nuevamente.',
        life: 3000
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventoId) => {
    if (window.confirm("¿Estás seguro de eliminar este evento?")) {
      try {
        setLoading(true);
        console.log("Eliminando evento:", eventoId);
        await eventosService.eliminar(eventoId);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Evento eliminado exitosamente',
          life: 3000
        });

        // Recargar eventos
        await cargarEventos();
      } catch (error) {
        console.error('Error al eliminar evento:', error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar el evento. Por favor, intenta nuevamente.',
          life: 3000
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleActivo = async (eventoId, currentActivo) => {
    const action = currentActivo ? "desactivar" : "activar";
    if (window.confirm(`¿Estás seguro de ${action} este evento?`)) {
      try {
        setLoading(true);
        console.log(`${action} evento:`, eventoId);

        // Obtener el evento completo
        const evento = eventos.find((e) => e.evento_id === eventoId);
        if (!evento) {
          throw new Error('Evento no encontrado');
        }

        // Actualizar solo el estado activo
        const eventoData = {
          titulo: evento.titulo,
          descripcion: evento.descripcion,
          fecha: evento.fecha,
          lugar: evento.lugar,
          organizador: evento.organizador,
          imagen_url: evento.imagen_url || "",
          activo: !currentActivo, // Invertir el estado actual
        };

        await eventosService.actualizar(eventoId, eventoData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: `Evento ${action}do exitosamente`,
          life: 3000
        });

        // Recargar eventos
        await cargarEventos();
      } catch (error) {
        console.error(`Error al ${action} evento:`, error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: `Error al ${action} el evento. Por favor, intenta nuevamente.`,
          life: 3000
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    // Estado
    searchTerm,
    currentPage,
    showModal,
    editingEvento,
    formData,
    loading,
    toast,
    eventos,
    showInactive,
    setShowInactive,

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
