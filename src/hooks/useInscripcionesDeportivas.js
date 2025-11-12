import { useState, useEffect, useRef } from "react";
import { inscripcionesDeportivasService, personasService, programasDeportivosService } from "../services";

export const useInscripcionesDeportivas = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [inscripcionesConPersona, setInscripcionesConPersona] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInscripcion, setSelectedInscripcion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showNoInfo, setShowNoInfo] = useState(false);
  const toast = useRef(null);

  // Cargar inscripciones desde el backend
  useEffect(() => {
    cargarInscripciones();
  }, []);

  const cargarInscripciones = async () => {
    try {
      setLoading(true);
      console.log('Cargando inscripciones deportivas...');

      // Cargar inscripciones y programas deportivos en paralelo
      const [inscripcionesData, programasData] = await Promise.all([
        inscripcionesDeportivasService.obtenerTodas({
          skip: 0,
          limit: 1000
        }),
        programasDeportivosService.obtenerTodos({
          skip: 0,
          limit: 1000,
          only_active: false
        })
      ]);

      console.log('Inscripciones cargadas:', inscripcionesData);
      console.log('Programas deportivos cargados:', programasData);
      
      const inscripcionesArray = Array.isArray(inscripcionesData) ? inscripcionesData : [];
      const programasArray = Array.isArray(programasData) ? programasData : [];
      
      // Crear un mapa de programas por ID para búsqueda rápida
      const programasMap = {};
      programasArray.forEach(programa => {
        programasMap[programa.programa_deportivo_id || programa.id] = programa;
      });

      setInscripciones(inscripcionesArray);

      // Mapear inscripciones con la estructura de la API
      const inscripcionesConInfo = inscripcionesArray.map((inscripcion) => {
        // Obtener nombre completo desde la API (nombres + apellidos) o desde formulario_completo
        const nombreCompleto = inscripcion.nombres && inscripcion.apellidos
          ? `${inscripcion.nombres} ${inscripcion.apellidos}`
          : inscripcion.formulario_completo?.informacion_personal?.nombre_completo
          ? inscripcion.formulario_completo.informacion_personal.nombre_completo
          : 'N/A';

        // Obtener email desde la API o desde formulario_completo
        const email = inscripcion.email || 
          inscripcion.formulario_completo?.informacion_personal?.email || 
          'N/A';

        // Obtener información del programa deportivo
        const programaId = inscripcion.programa_id || inscripcion.formulario_completo?.programa_deportivo_id;
        const programa = programaId ? programasMap[programaId] : null;
        const programaNombre = programa?.nombre || 
          inscripcion.formulario_completo?.deporte?.nombre || 
          'Programa no especificado';

        // Determinar si tiene información completa
        const tieneInfo = !!(inscripcion.nombres && inscripcion.apellidos && inscripcion.email) ||
          !!(inscripcion.formulario_completo?.informacion_personal);

        return {
          ...inscripcion,
          nombre_completo: nombreCompleto,
          numero_identificacion: inscripcion.identificacion,
          email: email,
          programa_deportivo: {
            id: programaId,
            nombre: programaNombre
          },
          tiene_info: tieneInfo
        };
      });

      console.log('Inscripciones con información cruzada:', inscripcionesConInfo);
      setInscripcionesConPersona(inscripcionesConInfo);
    } catch (error) {
      console.error('Error al cargar inscripciones:', error);

      if (error.status !== 503) {
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las inscripciones deportivas',
          life: 3000
        });
      }
      setInscripciones([]);
      setInscripcionesConPersona([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleViewDetails = (inscripcion) => {
    setSelectedInscripcion(inscripcion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInscripcion(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleEstadoChange = async (inscripcionId, nuevoEstado) => {
    try {
      setLoading(true);
      console.log(`Cambiando estado de inscripción ${inscripcionId} a ${nuevoEstado}`);

      // Usar los endpoints específicos según el estado
      let resultado;
      switch (nuevoEstado.toLowerCase()) {
        case 'aprobada':
        case 'aprobado':
          resultado = await inscripcionesDeportivasService.aprobar(inscripcionId);
          break;
        case 'rechazada':
        case 'rechazado':
          resultado = await inscripcionesDeportivasService.rechazar(inscripcionId);
          break;
        case 'cancelada':
        case 'cancelado':
          resultado = await inscripcionesDeportivasService.cancelar(inscripcionId);
          break;
        default:
          throw new Error(`Estado no válido: ${nuevoEstado}`);
      }

      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: `Inscripción ${nuevoEstado.toLowerCase()} exitosamente`,
        life: 3000
      });

      setOpenDropdownId(null);
      await cargarInscripciones();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Error desconocido';
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Error al cambiar el estado: ${errorMessage}`,
        life: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredInscripciones = () => {
    // Primero filtrar por tiene_info según el checkbox
    let resultado = inscripcionesConPersona.filter((inscripcion) => {
      if (showNoInfo) {
        // Si el checkbox está activo, mostrar SOLO las que NO tienen info
        return inscripcion.tiene_info === false;
      } else {
        // Si el checkbox está inactivo, mostrar SOLO las que SÍ tienen info
        return inscripcion.tiene_info === true;
      }
    });

    // Luego aplicar filtro de búsqueda si existe
    if (!searchTerm.trim()) return resultado;

    const term = searchTerm.toLowerCase();
    return resultado.filter((inscripcion) => {
      const nombre = inscripcion.nombre_completo || '';
      const numeroDoc = inscripcion.identificacion || inscripcion.numero_identificacion || '';
      const email = inscripcion.email || '';
      const programa = inscripcion.programa_deportivo?.nombre || '';
      const programaAcademico = inscripcion.programa_academico || '';

      return (
        nombre.toLowerCase().includes(term) ||
        numeroDoc.includes(term) ||
        email.toLowerCase().includes(term) ||
        programa.toLowerCase().includes(term) ||
        programaAcademico.toLowerCase().includes(term)
      );
    });
  };

  return {
    inscripciones,
    inscripcionesConPersona,
    loading,
    searchTerm,
    selectedInscripcion,
    showModal,
    currentPage,
    openDropdownId,
    showNoInfo,
    toast,
    setCurrentPage,
    setShowNoInfo,
    handleSearch,
    handleClearSearch,
    handleViewDetails,
    handleCloseModal,
    toggleDropdown,
    handleEstadoChange,
    getFilteredInscripciones,
    cargarInscripciones
  };
};
