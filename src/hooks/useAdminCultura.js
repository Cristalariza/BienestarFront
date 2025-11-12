import { useState, useEffect, useRef } from "react";
import { programasCulturalesService } from "../services";

export const useAdminCultura = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPrograma, setEditingPrograma] = useState(null);
  const [loading, setLoading] = useState(false);
  const [programas, setProgramas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("activos");
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    horario: "",
    instructor: "",
    cupos_totales: 30,
    cupos_disponibles: 30,
    ubicacion: "",
    estado: true,
  });

  useEffect(() => {
    cargarProgramas();
  }, [estadoFiltro]);

  const cargarProgramas = async () => {
    try {
      setLoading(true);

      // Determinar los parámetros según el filtro
      let params = { skip: 0 };
      if (estadoFiltro === "activos") {
        params.only_active = true;
      } else if (estadoFiltro === "eliminados") {
        params.only_active = false;
      }
      const data = await programasCulturalesService.obtenerTodos(params);
      let programasArray = Array.isArray(data) ? data : [];

      if (!Array.isArray(data)) {
        console.warn("Los datos recibidos no son un array, usando array vacío");
      }

      const programasFormateados = programasArray.map((programa, index) => {
        return {
          programa_id: programa.programa_id || `temp-${index}`,
          nombre: programa.nombre || "Sin nombre",
          descripcion: programa.descripcion || "Sin descripción",
          fecha_inicio: programa.fecha_inicio || "",
          fecha_fin: programa.fecha_fin || "",
          horario: programa.horario || "",
          instructor: programa.instructor || "",
          cupos_disponibles: programa.cupos_disponibles || 0,
          cupos_totales: programa.cupos_totales || 0,
          ubicacion: programa.ubicacion || "",
          estado:
            programa.estado !== undefined
              ? programa.estado
              : programa.activo !== undefined
              ? programa.activo
              : true,
          created_at: programa.created_at || new Date().toISOString(),
        };
      });

      let filtrados = programasFormateados;
      if (estadoFiltro === "eliminados") {
        filtrados = programasFormateados.filter((p) => p.estado === false);
      }
      setProgramas(filtrados);
    } catch (error) {
      console.error("Error completo al cargar programas:", error);
      console.error("Detalles del error:", {
        message: error.message,
        status: error.status,
        data: error.data,
      });

      if (error.status !== 503) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:
            "Error al cargar los programas culturales. Verifica la consola para más detalles.",
          life: 3000,
        });
      }
      setProgramas([]);
    } finally {
      setLoading(false);
    }
  };

  // Validaciones
  const validateForm = () => {
    if (!formData.nombre || !formData.nombre.trim()) {
      return {
        isValid: false,
        message: "El nombre del programa es obligatorio",
      };
    }
    if (formData.nombre.length < 3) {
      return {
        isValid: false,
        message: "El nombre del programa debe tener al menos 3 caracteres",
      };
    }

    // Validar nombre único
    const nombreExiste = programas.some((programa) => {
      if (
        editingPrograma &&
        programa.programa_id === editingPrograma.programa_id
      ) {
        return false;
      }
      return (
        programa.nombre.toLowerCase().trim() ===
        formData.nombre.toLowerCase().trim()
      );
    });

    if (nombreExiste) {
      return {
        isValid: false,
        message:
          "Ya existe un programa con este nombre. Por favor, elige otro nombre.",
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
    if (!formData.cupos_totales || formData.cupos_totales < 1) {
      return { isValid: false, message: "Debe haber al menos 1 cupo total" };
    }
    if (!formData.horario || !formData.horario.trim()) {
      return { isValid: false, message: "El horario es obligatorio" };
    }
    if (!formData.instructor || !formData.instructor.trim()) {
      return {
        isValid: false,
        message: "El nombre del instructor es obligatorio",
      };
    }
    if (formData.instructor.length < 3) {
      return {
        isValid: false,
        message: "El nombre del instructor debe tener al menos 3 caracteres",
      };
    }
    if (!formData.fecha_inicio) {
      return { isValid: false, message: "La fecha de inicio es obligatoria" };
    }
    if (!formData.fecha_fin) {
      return { isValid: false, message: "La fecha de fin es obligatoria" };
    }
    if (new Date(formData.fecha_fin) < new Date(formData.fecha_inicio)) {
      return {
        isValid: false,
        message: "La fecha de fin debe ser posterior a la fecha de inicio",
      };
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
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
      horario: "",
      instructor: "",
      cupos_totales: 30,
      cupos_disponibles: 30,
      ubicacion: "",
      estado: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = async (programa) => {
    try {
      setLoading(true);

      console.log("Consultando programa:", programa.programa_id);
      const programaActualizado = await programasCulturalesService.obtenerPorId(
        programa.programa_id
      );
      console.log("Programa obtenido del backend:", programaActualizado);

      setEditingPrograma(programaActualizado);

      const formatearFecha = (fechaISO) => {
        if (!fechaISO) return "";
        const fecha = new Date(fechaISO);
        return fecha.toISOString().split("T")[0];
      };

      setFormData({
        nombre: programaActualizado.nombre || "",
        descripcion: programaActualizado.descripcion || "",
        fecha_inicio: formatearFecha(programaActualizado.fecha_inicio),
        fecha_fin: formatearFecha(programaActualizado.fecha_fin),
        horario: programaActualizado.horario || "",
        instructor: programaActualizado.instructor || "",
        cupos_totales: programaActualizado.cupos_totales || 30,
        cupos_disponibles: programaActualizado.cupos_disponibles || 0,
        ubicacion: programaActualizado.ubicacion || "",
        estado:
          programaActualizado.activo !== undefined
            ? programaActualizado.activo
            : programaActualizado.estado,
      });

      setShowModal(true);
    } catch (error) {
      console.error("Error al cargar el programa para editar:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo cargar la información del programa",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPrograma(null);
    setFormData({
      nombre: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
      horario: "",
      instructor: "",
      cupos_totales: 30,
      cupos_disponibles: 30,
      ubicacion: "",
      estado: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const validation = validateForm();

    if (!validation.isValid) {
      toast.current?.show({
        severity: "warn",
        summary: "Validación",
        detail: validation.message,
        life: 3000,
      });
      return false;
    }

    try {
      setLoading(true);

      // Preparar datos para el backend
      const programaData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        fecha_inicio: formData.fecha_inicio,
        fecha_fin: formData.fecha_fin,
        horario: formData.horario,
        instructor: formData.instructor,
        cupos_totales: parseInt(formData.cupos_totales),
        cupos_disponibles: parseInt(formData.cupos_disponibles),
        ubicacion: formData.ubicacion,
        estado: formData.estado,
      };

      if (editingPrograma) {
        console.log(
          "Actualizando programa:",
          editingPrograma.programa_id,
          programaData
        );
        await programasCulturalesService.actualizar(
          editingPrograma.programa_id,
          programaData
        );
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Programa cultural actualizado exitosamente",
          life: 3000,
        });
      } else {
        console.log("Creando programa:", programaData);
        await programasCulturalesService.crear(programaData);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Programa cultural creado exitosamente",
          life: 3000,
        });
      }

      // Recargar programas
      await cargarProgramas();
      handleCloseModal();
      return true;
    } catch (error) {
      console.error("Error al guardar programa:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail:
          error?.message ||
          "Error al guardar el programa. Por favor, intenta nuevamente.",
        life: 3000,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (programaId) => {
    if (window.confirm("¿Estás seguro de eliminar este programa cultural?")) {
      try {
        setLoading(true);
        console.log("Eliminando programa:", programaId);
        await programasCulturalesService.eliminar(programaId);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Programa cultural eliminado exitosamente",
          life: 3000,
        });

        // Recargar programas
        await cargarProgramas();
      } catch (error) {
        console.error("Error al eliminar programa:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:
            "Error al eliminar el programa. Por favor, intenta nuevamente.",
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleEstado = async (programaId, currentEstado) => {
    const action = currentEstado ? "desactivar" : "activar";
    if (window.confirm(`¿Estás seguro de ${action} este programa cultural?`)) {
      try {
        setLoading(true);
        console.log(`${action} programa:`, programaId);

        // Obtener el programa completo
        const programa = programas.find((p) => p.programa_id === programaId);
        if (!programa) {
          throw new Error("Programa no encontrado");
        }

        // Actualizar solo el estado
        const programaData = {
          nombre: programa.nombre,
          descripcion: programa.descripcion,
          fecha_inicio: programa.fecha_inicio,
          fecha_fin: programa.fecha_fin,
          horario: programa.horario,
          instructor: programa.instructor,
          cupos_totales: programa.cupos_totales,
          cupos_disponibles: programa.cupos_disponibles,
          ubicacion: programa.ubicacion,
          estado: !currentEstado,
        };

        await programasCulturalesService.actualizar(programaId, programaData);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: `Programa ${action}do exitosamente`,
          life: 3000,
        });

        // Recargar programas
        await cargarProgramas();
      } catch (error) {
        console.error(`Error al ${action} programa:`, error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: `Error al ${action} el programa. Por favor, intenta nuevamente.`,
          life: 3000,
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
    estadoFiltro,
    setEstadoFiltro,

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
