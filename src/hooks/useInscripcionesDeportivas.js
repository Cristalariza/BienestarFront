import { useState, useEffect, useRef } from "react";
import { inscripcionesDeportivasService, personasService } from "../services";

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

      // Cargar inscripciones
      const inscripcionesData = await inscripcionesDeportivasService.obtenerTodas({
        skip: 0,
        limit: 1000
      });

      console.log('Inscripciones cargadas:', inscripcionesData);
      const inscripcionesArray = Array.isArray(inscripcionesData) ? inscripcionesData : [];
      setInscripciones(inscripcionesArray);

      // Cargar todas las personas
      console.log('Cargando personas...');
      const personasData = await personasService.obtenerTodas();
      console.log('Personas cargadas:', personasData);
      const personasArray = Array.isArray(personasData) ? personasData : [];

      // Hacer el cruce entre inscripciones y personas
      const inscripcionesConInfo = inscripcionesArray.map((inscripcion) => {
        // Buscar la persona por num_doc que coincida con identificacion
        const persona = personasArray.find(
          (p) => p.num_doc === inscripcion.identificacion
        );

        if (persona) {
          return {
            ...inscripcion,
            persona: persona,
            nombre_completo: `${persona.primer_nombre || ''} ${persona.segundo_nombre || ''} ${persona.primer_ape || ''} ${persona.segundo_ape || ''}`.trim(),
            numero_identificacion: persona.num_doc,
            email: persona.email,
            tiene_info: true
          };
        } else {
          return {
            ...inscripcion,
            persona: null,
            nombre_completo: 'N/A',
            numero_identificacion: inscripcion.identificacion,
            email: 'N/A',
            tiene_info: false
          };
        }
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

      await inscripcionesDeportivasService.cambiarEstado(inscripcionId, nuevoEstado);

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
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cambiar el estado de la inscripción',
        life: 3000
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
      const numeroDoc = inscripcion.numero_identificacion || '';
      const email = inscripcion.email || '';
      const programa = inscripcion.programa_deportivo?.nombre || '';

      return (
        nombre.toLowerCase().includes(term) ||
        numeroDoc.includes(term) ||
        email.toLowerCase().includes(term) ||
        programa.toLowerCase().includes(term)
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
