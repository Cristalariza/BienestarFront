import { useState, useEffect, useRef } from "react";
import { noticiasService } from "../services";

export const useAdminNoticias = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingNoticia, setEditingNoticia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noticias, setNoticias] = useState([]);
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "Académico",
    imagen: "",
    estado: true,
  });

  // Cargar noticias desde el backend
  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    try {
      setLoading(true);
      console.log('Iniciando carga de noticias...');

      const data = await noticiasService.obtenerTodas({ skip: 0, limit: 1000, only_active: false });
      console.log('Noticias cargadas del backend:', data);
      console.log('Tipo de datos recibidos:', typeof data, Array.isArray(data));

      // Si data no es un array, intentar obtener el array correcto
      let noticiasArray = Array.isArray(data) ? data : [];

      if (!Array.isArray(data)) {
        console.warn('Los datos recibidos no son un array, usando array vacío');
      }

      // Mapear datos del backend al formato del frontend
      const noticiasFormateadas = noticiasArray.map((noticia, index) => {
        console.log(`Mapeando noticia ${index}:`, noticia);
        return {
          noticia_id: noticia.noticia_id || `temp-${index}`,
          nombre: noticia.nombre || 'Sin título',
          descripcion: noticia.descripcion || 'Sin descripción',
          fecha: noticia.fecha ? new Date(noticia.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          imagen: noticia.imagen || "",
          categoria: 'General', // El backend no devuelve categoría
          estado: noticia.estado !== undefined ? noticia.estado : true,
          created_at: noticia.created_at || new Date().toISOString(),
        };
      });

      console.log('Noticias formateadas:', noticiasFormateadas);
      setNoticias(noticiasFormateadas);
      console.log('Noticias establecidas correctamente');
    } catch (error) {
      console.error('Error completo al cargar noticias:', error);
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
          detail: 'Error al cargar las noticias. Verifica la consola para más detalles.',
          life: 3000
        });
      }
      setNoticias([]);
    } finally {
      console.log('Finalizando carga de noticias');
      setLoading(false);
    }
  };

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
    if (!formData.categoria.trim()) {
      return { isValid: false, message: "La categoría es obligatoria" };
    }

    return { isValid: true };
  };

  // Filtros
  const getFilteredData = () => {
    return noticias.filter((noticia) => {
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
      categoria: "Académico",
      imagen: "",
      estado: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (noticia) => {
    setEditingNoticia(noticia);
    setFormData({
      nombre: noticia.nombre,
      descripcion: noticia.descripcion,
      categoria: noticia.categoria || "Académico",
      imagen: noticia.imagen || "",
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
      categoria: "Académico",
      imagen: "",
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
      const noticiaData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        imagen: formData.imagen || "",
        estado: formData.estado,
      };

      if (editingNoticia) {
        console.log("Actualizando noticia:", editingNoticia.noticia_id, noticiaData);
        await noticiasService.actualizar(editingNoticia.noticia_id, noticiaData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Noticia actualizada exitosamente',
          life: 3000
        });
      } else {
        console.log("Creando noticia:", noticiaData);
        await noticiasService.crear(noticiaData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Noticia creada exitosamente',
          life: 3000
        });
      }

      // Recargar noticias
      await cargarNoticias();
      handleCloseModal();
      return true;
    } catch (error) {
      console.error('Error al guardar noticia:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error?.message || 'Error al guardar la noticia. Por favor, intenta nuevamente.',
        life: 3000
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (noticiaId) => {
    if (window.confirm("¿Estás seguro de eliminar esta noticia?")) {
      try {
        setLoading(true);
        console.log("Eliminando noticia:", noticiaId);
        await noticiasService.eliminar(noticiaId);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Noticia eliminada exitosamente',
          life: 3000
        });

        // Recargar noticias
        await cargarNoticias();
      } catch (error) {
        console.error('Error al eliminar noticia:', error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar la noticia. Por favor, intenta nuevamente.',
          life: 3000
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleEstado = async (noticiaId, currentEstado) => {
    const action = currentEstado ? "desactivar" : "activar";
    if (window.confirm(`¿Estás seguro de ${action} esta noticia?`)) {
      try {
        setLoading(true);
        console.log(`${action} noticia:`, noticiaId);

        // Obtener la noticia completa
        const noticia = noticias.find((n) => n.noticia_id === noticiaId);
        if (!noticia) {
          throw new Error('Noticia no encontrada');
        }

        // Actualizar solo el estado
        const noticiaData = {
          nombre: noticia.nombre,
          descripcion: noticia.descripcion,
          fecha: noticia.fecha,
          imagen: noticia.imagen || "",
          estado: !currentEstado, // Invertir el estado actual
        };

        await noticiasService.actualizar(noticiaId, noticiaData);
        toast.current?.show({
          severity: 'success',
          summary: 'Éxito',
          detail: `Noticia ${action}da exitosamente`,
          life: 3000
        });

        // Recargar noticias
        await cargarNoticias();
      } catch (error) {
        console.error(`Error al ${action} noticia:`, error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: `Error al ${action} la noticia. Por favor, intenta nuevamente.`,
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
    editingNoticia,
    formData,
    loading,
    toast,

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
