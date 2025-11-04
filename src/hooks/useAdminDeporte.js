import { useState, useEffect, useRef } from "react";
import { programasDeportivosService } from "../services";

export const useAdminDeporte = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPrograma, setEditingPrograma] = useState(null);
  const [loading, setLoading] = useState(false);
  const [programas, setProgramas] = useState([]);
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    nombre: "",
    deporte: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    horario: "",
    instructor: "",
    cupos_disponibles: 30,
    ubicacion: "",
    estado: true,
  });

  // Cargar programas desde el backend
  useEffect(() => {
    cargarProgramas();
  }, []);

  const cargarProgramas = async () => {
    try {
      setLoading(true);
      console.log('Iniciando carga de programas deportivos...');

      const data = await programasDeportivosService.obtenerTodos({ skip: 0, limit: 1000, only_active: false });
      console.log('Programas cargados del backend:', data);
      console.log('Tipo de datos recibidos:', typeof data, Array.isArray(data));

      // Si data no es un array, intentar obtener el array correcto
      let programasArray = Array.isArray(data) ? data : [];

      if (!Array.isArray(data)) {
        console.warn('Los datos recibidos no son un array, usando array vacío');
      }

      // Mapear datos del backend al formato del frontend
      const programasFormateados = programasArray.map((programa, index) => {
        console.log(`Mapeando programa ${index}:`, programa);
        return {
          programa_id: programa.programa_id || `temp-${index}`,
          nombre: programa.nombre || 'Sin nombre',
          deporte: programa.deporte || '',
          descripcion: programa.descripcion || 'Sin descripción',
          fecha_inicio: programa.fecha_inicio || '',
          fecha_fin: programa.fecha_fin || '',
          horario: programa.horario || '',
          instructor: programa.instructor || '',
          cupos_disponibles: programa.cupos_disponibles || 0,
          ubicacion: programa.ubicacion || '',
          estado: programa.estado !== undefined ? programa.estado : true,
          created_at: programa.created_at || new Date().toISOString(),
        };
      });

      console.log('Programas formateados:', programasFormateados);
      setProgramas(programasFormateados);
      console.log('Programas establecidos correctamente');
    } catch (error) {
      console.error('Error completo al cargar programas:', error);
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
          detail: 'Error al cargar los programas deportivos. Verifica la consola para más detalles.',
          life: 3000
        });
      }
      setProgramas([]);
    } finally {
      console.log('Finalizando carga de programas');
      setLoading(false);
    }
  };

  // Validaciones
  const validateForm = () => {
    if (!formData.nombre || !formData.nombre.trim()) {
      return { isValid: false, message: "El nombre del programa es obligatorio" };
    }
    if (formData.nombre.length < 3) {
      return {
        isValid: false,
        message: "El nombre del programa debe tener al menos 3 caracteres",
      };
    }
    if (!formData.deporte || !formData.deporte.trim()) {
      return { isValid: false, message: "El tipo de deporte es obligatorio" };
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
    if (!formData.fecha_inicio) {
      return { isValid: false, message: "La fecha de inicio es obligatoria" };
    }
    if (!formData.fecha_fin) {
      return { isValid: false, message: "La fecha de fin es obligatoria" };
    }
    if (new Date(formData.fecha_fin) < new Date(formData.fecha_inicio)) {
      return { isValid: false, message: "La fecha de fin debe ser posterior a la fecha de inicio" };
    }
    if (!formData.horario || !formData.horario.trim()) {
      return { isValid: false, message: "El horario es obligatorio" };
    }
    if (!formData.instructor || !formData.instructor.trim()) {
      return { isValid: false, message: "El nombre del instructor es obligatorio" };
    }
    if (!formData.cupos_disponibles || formData.cupos_disponibles < 1) {
      return { isValid: false, message: "Debe haber al menos 1 cupo disponible" };
    }
    if (!formData.ubicacion || !formData.ubicacion.trim()) {
      return { isValid: false, message: "La ubicación es obligatoria" };
    }

    return { isValid: true };
  };

  // Filtros
  const getFilteredData = () => {
    return programas.filter((programa) => {
      const matchesSearch =
        programa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        programa.deporte.toLowerCase().includes(searchTerm.toLowerCase()) ||
        programa.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        programa.instructor.toLowerCase().includes(searchTerm.toLowerCase());

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
    setEditingPrograma(null);
    setFormData({
      nombre: "",
      deporte: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
      horario: "",
      instructor: "",
      cupos_disponibles: 30,
      ubicacion: "",
      estado: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (programa) => {
    setEditingPrograma(programa);
    setFormData({
      nombre: programa.nombre,
      deporte: programa.deporte,
      descripcion: programa.descripcion,
      fecha_inicio: programa.fecha_inicio,
      fecha_fin: programa.fecha_fin,
      horario: programa.horario,
      instructor: programa.instructor,
      cupos_disponibles: programa.cupos_disponibles,
      ubicacion: programa.ubicacion,
      estado: programa.estado,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPrograma(null);
    setFormData({
      nombre: "",
      deporte: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
      horario: "",
      instructor: "",
      cupos_disponibles: 30,
      ubicacion: "",
      estado: true,
    });
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      const programaData = {
        nombre: formData.nombre,
        deporte: formData.deporte,
        descripcion: formData.descripcion,
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        horario: formData.horario,
        instructor: formData.instructor,
        cupos_disponibles: parseInt(formData.cupos_disponibles),
        ubicacion: formData.ubicacion,
        estado: formData.estado,
      };

      if (editingPrograma) {
        console.log("Actualizando programa:", editingPrograma.programa_id, programaData);
        await programasDeportivosService.actualizar(editingPrograma.programa_id, programaData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Programa deportivo actualizado exitosamente',
          life: 3000
        });
      } else {
        console.log("Creando programa:", programaData);
        await programasDeportivosService.crear(programaData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Programa deportivo creado exitosamente',
          life: 3000
        });
      }

      // Recargar programas
      await cargarProgramas();
      handleCloseModal();
      return true;
    } catch (error) {
      console.error('Error al guardar programa:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'Error al guardar el programa. Por favor, intenta nuevamente.',
        life: 3000
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (programaId) => {
    if (window.confirm("¿Estás seguro de eliminar este programa deportivo?")) {
      try {
        setLoading(true);
        console.log("Eliminando programa:", programaId);
        await programasDeportivosService.eliminar(programaId);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Programa deportivo eliminado exitosamente',
          life: 3000
        });

        // Recargar programas
        await cargarProgramas();
      } catch (error) {
        console.error('Error al eliminar programa:', error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar el programa. Por favor, intenta nuevamente.',
          life: 3000
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleEstado = async (programaId, currentEstado) => {
    const action = currentEstado ? "desactivar" : "activar";
    if (window.confirm(`¿Estás seguro de ${action} este programa deportivo?`)) {
      try {
        setLoading(true);
        console.log(`${action} programa:`, programaId);

        // Obtener el programa completo
        const programa = programas.find((p) => p.programa_id === programaId);
        if (!programa) {
          throw new Error('Programa no encontrado');
        }

        // Actualizar solo el estado
        const programaData = {
          nombre: programa.nombre,
          deporte: programa.deporte,
          descripcion: programa.descripcion,
          fecha_inicio: programa.fecha_inicio,
          fecha_fin: programa.fecha_fin,
          horario: programa.horario,
          instructor: programa.instructor,
          cupos_disponibles: programa.cupos_disponibles,
          ubicacion: programa.ubicacion,
          estado: !currentEstado, // Invertir el estado actual
        };

        await programasDeportivosService.actualizar(programaId, programaData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: `Programa ${action}do exitosamente`,
          life: 3000
        });

        // Recargar programas
        await cargarProgramas();
      } catch (error) {
        console.error(`Error al ${action} programa:`, error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: `Error al ${action} el programa. Por favor, intenta nuevamente.`,
          life: 3000
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    searchTerm,
    currentPage,
    showModal,
    editingPrograma,
    formData,
    loading,
    toast,
    programas,

    getFilteredData,
    getPaginatedData,

    handleSearch,
    handleClearSearch,
    handlePageChange,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleToggleEstado,
  };
};
