import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { registrosAsistenciaService, eventosService } from "../../../services";
import styles from "../../../styles/adminstyles/asistencia.module.css";

const Asistencia = () => {
  const [step, setStep] = useState(1); // 1: Seleccionar Evento, 2: Listado de Asistencia, 3: Registro
  const [listadoAsistencia, setListadoAsistencia] = useState([]);
  const [nuevoAsistente, setNuevoAsistente] = useState({
    nombres_apellidos: "",
    identificacion: "",
    firma: "",
    asistencia: true,
  });

  const [evaluacion, setEvaluacion] = useState("");
  const [registrosGuardados, setRegistrosGuardados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const toast = useRef(null);
  
  // Estados para buscar eventos existentes
  const [showBuscarEvento, setShowBuscarEvento] = useState(false);
  const [showListaEventos, setShowListaEventos] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [eventosEncontrados, setEventosEncontrados] = useState([]);
  const [buscandoEventos, setBuscandoEventos] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [eventosExpandidos, setEventosExpandidos] = useState({}); // Para controlar qué eventos están expandidos
  
  // Filtros de búsqueda de eventos
  const [filtroBusquedaTitulo, setFiltroBusquedaTitulo] = useState("");
  const [filtroBusquedaDescripcion, setFiltroBusquedaDescripcion] = useState("");
  const [filtroBusquedaLugar, setFiltroBusquedaLugar] = useState("");
  const [filtroBusquedaOrganizador, setFiltroBusquedaOrganizador] = useState("");
  const [filtroBusquedaActivo, setFiltroBusquedaActivo] = useState(null); // null = por defecto (activos), true = activos, false = inactivos
  const [filtroBusquedaTodos, setFiltroBusquedaTodos] = useState(false); // Flag para saber si el usuario seleccionó "todos"
  
  // Estados para crear/editar eventos
  const [showModalEvento, setShowModalEvento] = useState(false);
  const [eventoFormData, setEventoFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    lugar: "",
    organizador: "",
    imagen_url: "",
    activo: true,
  });
  const [creandoEvento, setCreandoEvento] = useState(false);
  
  // Estados para el registro (filtros y eventos)
  const [eventos, setEventos] = useState([]);
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroOrganizador, setFiltroOrganizador] = useState("");
  const [filtroTitulo, setFiltroTitulo] = useState("");

  // Función para formatear fecha ISO a formato yyyy-MM-dd para inputs type="date"
  const formatearFechaParaInput = (fechaISO) => {
    if (!fechaISO) return "";
    try {
      const fecha = new Date(fechaISO);
      if (isNaN(fecha.getTime())) return "";
      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const dia = String(fecha.getDate()).padStart(2, '0');
      return `${año}-${mes}-${dia}`;
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "";
    }
  };

  // Cargar registros guardados y eventos al montar el componente
  useEffect(() => {
    cargarRegistrosGuardados();
    cargarEventos();
  }, []);
  
  // Cargar eventos cuando se cambia al paso 3
  useEffect(() => {
    if (step === 3) {
      cargarEventos();
      cargarRegistrosGuardados();
    }
  }, [step]);

  const cargarRegistrosGuardados = async () => {
    try {
      setLoading(true);
      const registros = await registrosAsistenciaService.obtenerTodos();
      const registrosArray = Array.isArray(registros) ? registros : [];
      
      // Agregar fecha_display para agrupación
      const registrosConDisplay = registrosArray.map((registro) => ({
        ...registro,
        fecha_display: registro.fecha 
          ? new Date(registro.fecha).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          : 'Sin fecha'
      }));
      
      setRegistrosGuardados(registrosConDisplay);
    } catch (error) {
      console.error("Error al cargar registros:", error);
      // Si hay error, intentar cargar desde localStorage como fallback
      try {
        const registros = localStorage.getItem("registrosAsistenciaDeporte");
        if (registros) {
          setRegistrosGuardados(JSON.parse(registros));
        }
      } catch (localError) {
        console.error("Error al cargar desde localStorage:", localError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Cargar eventos de la API (solo activos por defecto, igual que en el panel administrativo)
  const cargarEventos = async () => {
    try {
      const eventosData = await eventosService.obtenerTodos({
        skip: 0,
        limit: 100,
        only_active: true // Solo eventos activos por defecto
      });
      const eventosArray = Array.isArray(eventosData) ? eventosData : [];
      setEventos(eventosArray);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
    }
  };

  // Buscar eventos con múltiples filtros (igual que en el panel administrativo)
  const buscarEventos = async () => {
    // Validar que si hay fechas, la fecha inicio sea anterior a fecha fin
    if (fechaInicio && fechaFin) {
      const fechaInicioDate = new Date(fechaInicio + 'T00:00:00');
      const fechaFinDate = new Date(fechaFin + 'T23:59:59');
      
      if (fechaInicioDate > fechaFinDate) {
        toast.current?.show({
          severity: 'warn',
          summary: 'Fechas inválidas',
          detail: 'La fecha de inicio debe ser anterior a la fecha de fin',
          life: 3000
        });
        return;
      }
    }

    try {
      setBuscandoEventos(true);
      
      // Determinar si traer solo activos, solo inactivos, o todos
      // Si filtroBusquedaTodos es true, traer todos (only_active: false)
      // Si el filtro está en true (activos), traer solo activos (only_active: true)
      // Si el filtro está en false (inactivos), traer todos y filtrar después (only_active: false)
      // Si es null (por defecto), traer solo activos (only_active: true) - igual que panel administrativo
      const onlyActive = filtroBusquedaTodos ? false : (filtroBusquedaActivo === false ? false : true);
      
      // Obtener eventos de la API de eventos
      const eventos = await eventosService.obtenerTodos({
        skip: 0,
        limit: 1000,
        only_active: onlyActive
      });
      
      const eventosArray = Array.isArray(eventos) ? eventos : [];
      
      // Aplicar filtros adicionales
      let eventosFiltrados = eventosArray;
      
      // Filtro por título
      if (filtroBusquedaTitulo.trim()) {
        const term = filtroBusquedaTitulo.toLowerCase();
        eventosFiltrados = eventosFiltrados.filter((evento) => 
          (evento.titulo || '').toLowerCase().includes(term)
        );
      }
      
      // Filtro por descripción
      if (filtroBusquedaDescripcion.trim()) {
        const term = filtroBusquedaDescripcion.toLowerCase();
        eventosFiltrados = eventosFiltrados.filter((evento) => 
          (evento.descripcion || '').toLowerCase().includes(term)
        );
      }
      
      // Filtro por lugar
      if (filtroBusquedaLugar.trim()) {
        const term = filtroBusquedaLugar.toLowerCase();
        eventosFiltrados = eventosFiltrados.filter((evento) => 
          (evento.lugar || '').toLowerCase().includes(term)
        );
      }
      
      // Filtro por organizador
      if (filtroBusquedaOrganizador.trim()) {
        const term = filtroBusquedaOrganizador.toLowerCase();
        eventosFiltrados = eventosFiltrados.filter((evento) => 
          (evento.organizador || '').toLowerCase().includes(term)
        );
      }
      
      // Filtro por estado activo/inactivo
      // Si se seleccionó "inactivos", filtrar por inactivos
      if (filtroBusquedaActivo === false) {
        eventosFiltrados = eventosFiltrados.filter((evento) => 
          evento.activo === false
        );
      }
      // Si es null (por defecto) o true (activos), solo activos ya vienen de la API
      // Si filtroBusquedaTodos es true, mostrar todos (activos e inactivos) sin filtrar
      
      // Filtro por rango de fechas
      if (fechaInicio && fechaFin) {
        const fechaInicioDate = new Date(fechaInicio + 'T00:00:00');
        const fechaFinDate = new Date(fechaFin + 'T23:59:59');
        
        eventosFiltrados = eventosFiltrados.filter((evento) => {
          if (!evento.fecha) return false;
          const fechaEvento = new Date(evento.fecha);
          return fechaEvento >= fechaInicioDate && fechaEvento <= fechaFinDate;
        });
      } else if (fechaInicio) {
        const fechaInicioDate = new Date(fechaInicio + 'T00:00:00');
        eventosFiltrados = eventosFiltrados.filter((evento) => {
          if (!evento.fecha) return false;
          const fechaEvento = new Date(evento.fecha);
          return fechaEvento >= fechaInicioDate;
        });
      } else if (fechaFin) {
        const fechaFinDate = new Date(fechaFin + 'T23:59:59');
        eventosFiltrados = eventosFiltrados.filter((evento) => {
          if (!evento.fecha) return false;
          const fechaEvento = new Date(evento.fecha);
          return fechaEvento <= fechaFinDate;
        });
      }
      
      setEventosEncontrados(eventosFiltrados);
      
      if (eventosFiltrados.length === 0) {
        toast.current?.show({
          severity: 'info',
          summary: 'Sin resultados',
          detail: 'No se encontraron eventos con los filtros aplicados',
          life: 3000
        });
      }
    } catch (error) {
      console.error("Error al buscar eventos:", error);
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al buscar eventos. Por favor, intente nuevamente.',
        life: 5000
      });
      setEventosEncontrados([]);
    } finally {
      setBuscandoEventos(false);
    }
  };
  
  // Limpiar filtros de búsqueda
  const limpiarFiltrosBusqueda = () => {
    setFiltroBusquedaTitulo("");
    setFiltroBusquedaDescripcion("");
    setFiltroBusquedaLugar("");
    setFiltroBusquedaOrganizador("");
    setFiltroBusquedaActivo(null);
    setFiltroBusquedaTodos(false);
    setFechaInicio("");
    setFechaFin("");
    setEventosEncontrados([]);
  };

  // Función para alternar la expansión de un evento
  const toggleEventoExpandido = (eventoId) => {
    setEventosExpandidos(prev => ({
      ...prev,
      [eventoId]: !prev[eventoId]
    }));
  };

  // Cargar evento seleccionado para agregar asistencia
  const seleccionarEvento = (evento) => {
    setEventoSeleccionado(evento);
    setModoEdicion(false);
    setListadoAsistencia([]);
    setEvaluacion("");
    
    // Cerrar modales y avanzar al paso 2
    setShowBuscarEvento(false);
    setShowListaEventos(false);
    setStep(2);
    
    toast.current?.show({
      severity: 'success',
      summary: 'Evento seleccionado',
      detail: 'Puede agregar el listado de asistencia para este evento',
      life: 3000
    });
  };

  // Limpiar selección y volver al inicio
  const limpiarSeleccion = () => {
    setEventoSeleccionado(null);
    setModoEdicion(false);
    setListadoAsistencia([]);
    setEvaluacion("");
    setStep(1);
  };
  
  // Validar formulario de evento (igual que en el panel administrativo)
  const validarFormularioEvento = () => {
    if (!eventoFormData.titulo || !eventoFormData.titulo.trim()) {
      return { isValid: false, message: "El título es obligatorio" };
    }
    if (eventoFormData.titulo.length < 5) {
      return {
        isValid: false,
        message: "El título debe tener al menos 5 caracteres",
      };
    }

    // Validar título único
    const tituloExiste = eventos.some((evento) => {
      return evento.titulo.toLowerCase().trim() === eventoFormData.titulo.toLowerCase().trim();
    });

    if (tituloExiste) {
      return {
        isValid: false,
        message: "Ya existe un evento con este título. Por favor, elige otro título.",
      };
    }

    if (!eventoFormData.descripcion || !eventoFormData.descripcion.trim()) {
      return { isValid: false, message: "La descripción es obligatoria" };
    }
    if (eventoFormData.descripcion.length < 10) {
      return {
        isValid: false,
        message: "La descripción debe tener al menos 10 caracteres",
      };
    }
    if (!eventoFormData.fecha) {
      return { isValid: false, message: "La fecha es obligatoria" };
    }

    // Validar que la fecha sea mayor a hoy (no puede ser hoy mismo)
    const fechaSeleccionada = new Date(eventoFormData.fecha);
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

    if (!eventoFormData.organizador || !eventoFormData.organizador.trim()) {
      return { isValid: false, message: "El organizador es obligatorio" };
    }

    return { isValid: true };
  };

  // Crear nuevo evento (igual que en el panel administrativo)
  const crearEvento = async () => {
    const validation = validarFormularioEvento();

    if (!validation.isValid) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Validación',
        detail: validation.message,
        life: 3000
      });
      return;
    }

    try {
      setCreandoEvento(true);

      // Preparar datos para el backend
      const eventoData = {
        titulo: eventoFormData.titulo,
        descripcion: eventoFormData.descripcion,
        fecha: new Date(eventoFormData.fecha).toISOString(),
        lugar: eventoFormData.lugar || "",
        organizador: eventoFormData.organizador,
        imagen_url: eventoFormData.imagen_url || "",
        activo: eventoFormData.activo,
      };

      const nuevoEvento = await eventosService.crear(eventoData);
      
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Evento creado exitosamente',
        life: 3000
      });
      
      // Seleccionar el evento recién creado
      seleccionarEvento(nuevoEvento);
      setShowModalEvento(false);
      setEventoFormData({
        titulo: "",
        descripcion: "",
        fecha: "",
        lugar: "",
        organizador: "",
        imagen_url: "",
        activo: true,
      });
    } catch (error) {
      console.error("Error al crear evento:", error);
      const errorMessage = error.response?.data?.detail || error.message || "Error desconocido";
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Error al crear el evento: ${errorMessage}`,
        life: 5000
      });
    } finally {
      setCreandoEvento(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventoFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleEventoInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventoFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAgregarAsistente = () => {
    if (!nuevoAsistente.nombres_apellidos?.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Campo requerido',
        detail: 'Por favor ingrese el nombre completo de la persona',
        life: 3000
      });
      return;
    }

    if (!nuevoAsistente.identificacion?.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Campo requerido',
        detail: 'Por favor ingrese la identificación de la persona',
        life: 3000
      });
      return;
    }

    const asistenteConNumero = {
      ...nuevoAsistente,
      num_consec: listadoAsistencia.length + 1,
    };

    setListadoAsistencia([...listadoAsistencia, asistenteConNumero]);
    setNuevoAsistente({
      nombres_apellidos: "",
      identificacion: "",
      firma: "",
      asistencia: true,
    });
  };

  const handleEliminarAsistente = (index) => {
    const nuevoListado = listadoAsistencia.filter((_, i) => i !== index);
    // Reordenar los números consecutivos
    const reordenados = nuevoListado.map((a, i) => ({
      ...a,
      num_consec: i + 1,
    }));
    setListadoAsistencia(reordenados);
  };

  const toggleAsistencia = (index) => {
    const nuevoListado = [...listadoAsistencia];
    nuevoListado[index].asistencia = !nuevoListado[index].asistencia;
    setListadoAsistencia(nuevoListado);
  };

  const handleSubmit = async () => {
    // Validar que haya un evento seleccionado
    if (!eventoSeleccionado) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Evento requerido',
        detail: 'Por favor seleccione o cree un evento primero',
        life: 3000
      });
      return;
    }

    if (listadoAsistencia.length === 0) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Listado de asistencia requerido',
        detail: 'Por favor agregue al menos una persona al listado de asistencia',
        life: 3000
      });
      return;
    }

    try {
      setSaving(true);
      const totalPresentes = listadoAsistencia.filter((a) => a.asistencia).length;

      // Preparar listado de asistencia con num_consec
      const listadoConNum = listadoAsistencia.map((asistente, index) => ({
        ...asistente,
        num_consec: asistente.num_consec || index + 1,
      }));

      const eventoId = eventoSeleccionado.evento_id;

      // Preparar registro de asistencia
    const registroAsistencia = {
        evento_id: eventoId,
        institucion: eventoSeleccionado.organizador || "",
        lugar: eventoSeleccionado.lugar || "",
        grupo: eventoSeleccionado.titulo || "",
        fecha: eventoSeleccionado.fecha || new Date().toISOString(),
        tipo_evento: "",
        num_consec: 1,
        dependencia_program: "",
        asistentes: listadoConNum,
        evaluacion: evaluacion || null,
        director: eventoSeleccionado.organizador || "",
        responsable: eventoSeleccionado.organizador || "",
        observaciones: eventoSeleccionado.descripcion || null,
        total_asistentes: listadoAsistencia.length,
      total_presentes: totalPresentes,
      fecha_registro: new Date().toISOString(),
    };

      // Buscar si existe un registro de asistencia para este evento
      let registroGuardado;
      try {
        const todosLosRegistros = await registrosAsistenciaService.obtenerTodos();
        const registrosArray = Array.isArray(todosLosRegistros) ? todosLosRegistros : [];
        
        // Buscar registro que coincida con el evento_id
        const registroExistente = registrosArray.find(
          r => r.evento_id === eventoSeleccionado.evento_id
        );
        
        if (registroExistente) {
          // Combinar listado existente con el nuevo
          const listadoExistente = registroExistente.asistentes || [];
          const todoElListado = [...listadoExistente, ...listadoConNum];
          
          // Recalcular números consecutivos
          const listadoRenumerado = todoElListado.map((a, index) => ({
            ...a,
            num_consec: index + 1
          }));
          
          const registroActualizado = {
            ...registroAsistencia,
            evento_id: eventoSeleccionado.evento_id,
            asistentes: listadoRenumerado,
            total_asistentes: todoElListado.length,
            total_presentes: todoElListado.filter(a => a.asistencia).length,
          };
          
          registroGuardado = await registrosAsistenciaService.actualizar(
            registroExistente.evento_id || registroExistente.id,
            registroActualizado
          );
        } else {
          // No existe registro, crear uno nuevo asociado al evento
          registroGuardado = await registrosAsistenciaService.crear(registroAsistencia);
        }
      } catch (error) {
        console.error("Error al buscar registro existente:", error);
        // Si hay error al buscar, crear nuevo registro
        registroGuardado = await registrosAsistenciaService.crear(registroAsistencia);
      }
      
      // Agregar fecha_display para la vista
      const registroConDisplay = {
        ...registroGuardado,
        fecha_display: registroGuardado.fecha 
          ? new Date(registroGuardado.fecha).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })
          : 'Sin fecha'
      };

      // Actualizar lista de registros
      const registroExistente = registrosGuardados.find(r => 
        r.evento_id === registroConDisplay.evento_id || r.id === registroConDisplay.id
      );
      
      if (registroExistente) {
        // Actualizar el registro existente en la lista
        setRegistrosGuardados(registrosGuardados.map(r => 
          (r.evento_id === registroConDisplay.evento_id || r.id === registroConDisplay.id) 
            ? registroConDisplay 
            : r
        ));
      } else {
        // Agregar nuevo registro
        setRegistrosGuardados([registroConDisplay, ...registrosGuardados]);
      }

      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: registroExistente
          ? `Listado de asistencia actualizado exitosamente! Total: ${registroGuardado.total_asistentes}, Presentes: ${registroGuardado.total_presentes}`
          : `Asistencia registrada exitosamente! Total: ${listadoAsistencia.length}, Presentes: ${totalPresentes}`,
        life: 3000
      });
      
      // Limpiar y volver al inicio
      limpiarSeleccion();
    } catch (error) {
      console.error("Error al guardar registro:", error);
      const errorMessage = error.response?.data?.detail || error.message || "Error desconocido";
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: `Error al guardar el registro: ${errorMessage}`,
        life: 5000
      });
    } finally {
      setSaving(false);
    }
  };

  const calcularEstadisticas = () => {
    const total = listadoAsistencia.length;
    const presentes = listadoAsistencia.filter((a) => a.asistencia).length;
    const ausentes = total - presentes;
    const porcentaje = total > 0 ? ((presentes / total) * 100).toFixed(1) : 0;

    return { 
      total, 
      presentes, 
      ausentes, 
      porcentaje
    };
  };

  const stats = calcularEstadisticas();

  // Agrupar eventos con sus registros de asistencia
  const agruparEventosConRegistros = () => {
    const eventosConRegistros = {};
    
    // Primero, agregar todos los eventos
    eventos.forEach((evento) => {
      eventosConRegistros[evento.evento_id] = {
        evento: evento,
        registros: [],
      };
    });
    
    // Luego, asociar registros de asistencia con sus eventos
    registrosGuardados.forEach((registro) => {
      const eventoId = registro.evento_id;
      if (eventoId && eventosConRegistros[eventoId]) {
        eventosConRegistros[eventoId].registros.push(registro);
      } else if (!eventoId) {
        // Registros sin evento asociado (legacy)
        const fechaKey = registro.fecha_display || 
          (registro.fecha ? new Date(registro.fecha).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : 'Sin fecha');
        
        if (!eventosConRegistros[`legacy-${fechaKey}`]) {
          eventosConRegistros[`legacy-${fechaKey}`] = {
            evento: null,
            registros: [],
            fechaKey: fechaKey,
          };
        }
        eventosConRegistros[`legacy-${fechaKey}`].registros.push(registro);
      }
    });
    
    return eventosConRegistros;
  };

  // Aplicar filtros
  const eventosFiltrados = () => {
    const eventosConRegistros = agruparEventosConRegistros();
    const filtrados = {};
    
    Object.keys(eventosConRegistros).forEach((key) => {
      const item = eventosConRegistros[key];
      const evento = item.evento;
      
      // Filtro por título
      if (filtroTitulo && evento) {
        const tituloMatch = evento.titulo?.toLowerCase().includes(filtroTitulo.toLowerCase());
        if (!tituloMatch) return;
      }
      
      // Filtro por organizador
      if (filtroOrganizador && evento) {
        const organizadorMatch = evento.organizador?.toLowerCase().includes(filtroOrganizador.toLowerCase());
        if (!organizadorMatch) return;
      }
      
      // Filtro por fecha
      if (filtroFechaInicio || filtroFechaFin) {
        const fechaEvento = evento?.fecha ? new Date(evento.fecha) : null;
        if (fechaEvento) {
          if (filtroFechaInicio && fechaEvento < new Date(filtroFechaInicio)) return;
          if (filtroFechaFin) {
            const fechaFin = new Date(filtroFechaFin);
            fechaFin.setHours(23, 59, 59, 999);
            if (fechaEvento > fechaFin) return;
          }
        } else {
          // Si no hay fecha en el evento, verificar registros
          const tieneRegistroEnRango = item.registros.some(registro => {
            if (!registro.fecha) return false;
            const fechaRegistro = new Date(registro.fecha);
            if (filtroFechaInicio && fechaRegistro < new Date(filtroFechaInicio)) return false;
            if (filtroFechaFin) {
              const fechaFin = new Date(filtroFechaFin);
              fechaFin.setHours(23, 59, 59, 999);
              if (fechaRegistro > fechaFin) return false;
            }
            return true;
          });
          if (!tieneRegistroEnRango) return;
        }
      }
      
      filtrados[key] = item;
    });
    
    return filtrados;
  };

  const eventosFiltradosData = eventosFiltrados();
  const eventosOrdenados = Object.keys(eventosFiltradosData).sort((a, b) => {
    try {
      const eventoA = eventosFiltradosData[a].evento;
      const eventoB = eventosFiltradosData[b].evento;
      
      const fechaA = eventoA?.fecha ? new Date(eventoA.fecha) : new Date(0);
      const fechaB = eventoB?.fecha ? new Date(eventoB.fecha) : new Date(0);
      
      return fechaB - fechaA; // Orden descendente (más reciente primero)
    } catch {
      return 0;
    }
  });

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <div className={styles.content}>
        {/* Header con pestañas */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${step === 1 ? styles.tabActive : ""}`}
            onClick={() => setStep(1)}
          >
            <i className="pi pi-calendar"></i>
            Seleccionar Evento
          </button>
          <button
            className={`${styles.tab} ${step === 2 ? styles.tabActive : ""}`}
            onClick={() => eventoSeleccionado ? setStep(2) : null}
            disabled={!eventoSeleccionado}
            style={!eventoSeleccionado ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            <i className="pi pi-users"></i>
            Listado de Asistencia
          </button>
          <button
            className={`${styles.tab} ${step === 3 ? styles.tabActive : ""}`}
            onClick={() => {
              setStep(3);
              cargarRegistrosGuardados();
            }}
            disabled={loading}
          >
            <i className="pi pi-book"></i>
            Registro
            {loading && <i className="pi pi-spin pi-spinner" style={{ marginLeft: '8px' }}></i>}
          </button>
        </div>

        {/* Paso 1: Seleccionar Evento */}
        {step === 1 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>
              <i className="pi pi-calendar"></i>
              Seleccionar Evento
            </h2>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '24px', 
              marginTop: '32px' 
            }}>
              {/* Opción: Crear Nuevo Evento */}
              <div 
                className={styles.eventoCard}
                style={{ 
                  cursor: 'pointer', 
                  padding: '32px',
                  textAlign: 'center',
                  border: '2px dashed #3b82f6',
                  background: '#eff6ff',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setShowModalEvento(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#dbeafe';
                  e.currentTarget.style.borderColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#eff6ff';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
              >
                <i className="pi pi-plus-circle" style={{ fontSize: '3rem', color: '#3b82f6', marginBottom: '16px' }}></i>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#1e40af' }}>
                  Crear Nuevo Evento
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Cree un nuevo evento y registre su asistencia
                </p>
              </div>

              {/* Opción: Seleccionar Evento Existente */}
              <div 
                className={styles.eventoCard}
                style={{ 
                  cursor: 'pointer', 
                  padding: '32px',
                  textAlign: 'center',
                  border: '2px dashed #10b981',
                  background: '#f0fdf4',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setShowBuscarEvento(true);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#dcfce7';
                  e.currentTarget.style.borderColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.borderColor = '#10b981';
                }}
              >
                <i className="pi pi-search" style={{ fontSize: '3rem', color: '#10b981', marginBottom: '16px' }}></i>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#047857' }}>
                  Seleccionar Evento Existente
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Busque y seleccione un evento existente para registrar asistencia
                </p>
              </div>
            </div>

            {/* Mostrar evento seleccionado si existe */}
            {eventoSeleccionado && (
              <div style={{ 
                marginTop: '32px', 
                padding: '20px', 
                background: '#f0fdf4', 
                border: '2px solid #10b981', 
                borderRadius: '8px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#047857' }}>
                      Evento Seleccionado: {eventoSeleccionado.titulo}
                    </h3>
                    <p style={{ margin: '0', color: '#6b7280', fontSize: '0.875rem' }}>
                      {eventoSeleccionado.fecha ? new Date(eventoSeleccionado.fecha).toLocaleDateString('es-ES') : 'Sin fecha'} - {eventoSeleccionado.lugar || 'Sin lugar'}
                    </p>
                  </div>
                  <button
                    className={styles.btnPrimary}
                    onClick={() => setStep(2)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Continuar al Listado de Asistencia
                    <i className="pi pi-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Modal para crear evento */}
            {showModalEvento && (
              <div className={styles.modalOverlay} onClick={() => setShowModalEvento(false)}>
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}
                >
                  <div className={styles.modalHeader}>
                    <h2>Crear Nuevo Evento</h2>
                    <button className={styles.closeButton} onClick={() => setShowModalEvento(false)}>
                      ✕
                    </button>
                  </div>

                  <div className={styles.modalBody}>
            <div className={styles.formGrid}>
                      <div className={styles.formGroupFull}>
                <label>
                          Título <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                          name="titulo"
                          value={eventoFormData.titulo}
                          onChange={handleEventoInputChange}
                          placeholder="Título del evento"
                        />
                      </div>

                      <div className={styles.formGroupFull}>
                        <label>
                          Descripción <span className={styles.required}>*</span>
                        </label>
                        <textarea
                          name="descripcion"
                          value={eventoFormData.descripcion}
                          onChange={handleEventoInputChange}
                          placeholder="Descripción del evento"
                          rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                          Fecha <span className={styles.required}>*</span>
                </label>
                        <input
                          type="date"
                          name="fecha"
                          value={eventoFormData.fecha && eventoFormData.fecha.includes('T') 
                            ? formatearFechaParaInput(eventoFormData.fecha) 
                            : (eventoFormData.fecha || "")}
                          onChange={handleEventoInputChange}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label>Lugar</label>
                <input
                  type="text"
                  name="lugar"
                          value={eventoFormData.lugar}
                          onChange={handleEventoInputChange}
                          placeholder="Auditorio, sala, etc."
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                          Organizador <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                          name="organizador"
                          value={eventoFormData.organizador}
                          onChange={handleEventoInputChange}
                          placeholder="Organizador del evento"
                />
              </div>

                      <div className={styles.formGroupFull}>
                        <label>Imagen URL (Opcional)</label>
                <input
                          type="text"
                          name="imagen_url"
                          value={eventoFormData.imagen_url}
                          onChange={handleEventoInputChange}
                          placeholder="URL de la imagen del evento"
                        />
                        <small style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '4px', display: 'block' }}>
                          Ingresa la URL de la imagen del evento
                        </small>
              </div>

                      <div className={styles.formGroupFull}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            name="activo"
                            checked={eventoFormData.activo}
                            onChange={handleEventoInputChange}
                          />
                          Evento Activo
                </label>
                      </div>
                    </div>
                  </div>

                  <div className={styles.modalFooter}>
                    <button className={styles.btnClose} onClick={() => setShowModalEvento(false)}>
                      Cancelar
                    </button>
                    <button
                      className={styles.btnPrimary}
                      onClick={crearEvento}
                      disabled={creandoEvento}
                    >
                      {creandoEvento ? (
                        <>
                          <i className="pi pi-spin pi-spinner"></i>
                          Creando...
                        </>
                      ) : (
                        <>
                          <i className="pi pi-save"></i>
                          Crear Evento
                        </>
                      )}
                    </button>
              </div>
                </div>
              </div>
            )}

            {/* Modal de búsqueda de eventos */}
            {showBuscarEvento && (
              <div className={styles.modalOverlay} onClick={() => setShowBuscarEvento(false)}>
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}
                >
                  <div className={styles.modalHeader}>
                    <h2>Buscar Evento Existente</h2>
                    <button className={styles.closeButton} onClick={() => setShowBuscarEvento(false)}>
                      ✕
                    </button>
              </div>

                  <div className={styles.modalBody}>
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ marginBottom: '16px', fontSize: '1.125rem', fontWeight: '600' }}>
                        <i className="pi pi-filter" style={{ marginRight: '8px' }}></i>
                        Filtros de Búsqueda
                      </h3>
                      
                      <div className={styles.formGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className={styles.formGroup}>
                          <label>Título</label>
                <input
                  type="text"
                            value={filtroBusquedaTitulo}
                            onChange={(e) => setFiltroBusquedaTitulo(e.target.value)}
                            placeholder="Buscar por título..."
                />
              </div>

              <div className={styles.formGroup}>
                          <label>Descripción</label>
                <input
                  type="text"
                            value={filtroBusquedaDescripcion}
                            onChange={(e) => setFiltroBusquedaDescripcion(e.target.value)}
                            placeholder="Buscar por descripción..."
                />
              </div>

                        <div className={styles.formGroup}>
                          <label>Lugar</label>
                          <input
                            type="text"
                            value={filtroBusquedaLugar}
                            onChange={(e) => setFiltroBusquedaLugar(e.target.value)}
                            placeholder="Buscar por lugar..."
                />
              </div>

                        <div className={styles.formGroup}>
                          <label>Organizador</label>
                          <input
                            type="text"
                            value={filtroBusquedaOrganizador}
                            onChange={(e) => setFiltroBusquedaOrganizador(e.target.value)}
                            placeholder="Buscar por organizador..."
                          />
            </div>

                        <div className={styles.formGroup}>
                          <label>Fecha Inicio</label>
                          <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>Fecha Fin</label>
                          <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            min={fechaInicio}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label>Estado</label>
                          <select
                            value={filtroBusquedaTodos ? 'todos' : (filtroBusquedaActivo === true ? 'activos' : (filtroBusquedaActivo === false ? 'inactivos' : 'activos'))}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === 'todos') {
                                setFiltroBusquedaActivo(null);
                                setFiltroBusquedaTodos(true);
                              } else if (value === 'activos') {
                                setFiltroBusquedaActivo(true);
                                setFiltroBusquedaTodos(false);
                              } else {
                                setFiltroBusquedaActivo(false);
                                setFiltroBusquedaTodos(false);
                              }
                            }}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                          >
                            <option value="activos">Solo Activos (por defecto)</option>
                            <option value="todos">Todos</option>
                            <option value="inactivos">Solo Inactivos</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                          className={styles.btnPrimary}
                          onClick={buscarEventos}
                          disabled={buscandoEventos}
                        >
                          {buscandoEventos ? (
                            <>
                              <i className="pi pi-spin pi-spinner"></i>
                              Buscando...
                            </>
                          ) : (
                            <>
                              <i className="pi pi-search"></i>
                              Buscar Eventos
                            </>
                          )}
              </button>
                        {(filtroBusquedaTitulo || filtroBusquedaDescripcion || filtroBusquedaLugar || 
                          filtroBusquedaOrganizador || fechaInicio || fechaFin || filtroBusquedaActivo !== null || filtroBusquedaTodos) && (
                          <button
                            className={styles.btnSecondary}
                            onClick={limpiarFiltrosBusqueda}
                          >
                            <i className="pi pi-times"></i>
                            Limpiar Filtros
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Lista de eventos encontrados */}
                    {eventosEncontrados.length > 0 && (
                      <div>
                        <h3 style={{ marginBottom: '16px', fontSize: '1.125rem', fontWeight: '600' }}>
                          Eventos Encontrados ({eventosEncontrados.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                          {eventosEncontrados.map((evento, index) => (
                            <div
                              key={evento.evento_id || index}
                              className={styles.eventoCard}
                              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                              onClick={() => seleccionarEvento(evento)}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.125rem', fontWeight: '700' }}>
                                    {evento.titulo || 'Sin título'}
                                  </h4>
                                  {evento.descripcion && (
                                    <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.4' }}>
                                      {evento.descripcion.length > 100 
                                        ? `${evento.descripcion.substring(0, 100)}...` 
                                        : evento.descripcion}
                                    </p>
                                  )}
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.875rem', color: '#6b7280' }}>
                                    <span>
                                      <i className="pi pi-calendar" style={{ marginRight: '4px' }}></i>
                                      {evento.fecha ? new Date(evento.fecha).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      }) : 'Sin fecha'}
                                    </span>
                                    {evento.lugar && (
                                      <span>
                                        <i className="pi pi-map-marker" style={{ marginRight: '4px' }}></i>
                                        {evento.lugar}
                                      </span>
                                    )}
                                    {evento.organizador && (
                                      <span>
                                        <i className="pi pi-user" style={{ marginRight: '4px' }}></i>
                                        {evento.organizador}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right', marginLeft: '16px' }}>
                                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' }}>
                                    Estado
                                  </div>
                                  <div style={{ 
                                    fontSize: '0.875rem', 
                                    fontWeight: '600', 
                                    color: evento.activo ? '#10b981' : '#ef4444',
                                    padding: '4px 8px',
                                    background: evento.activo ? '#f0fdf4' : '#fef2f2',
                                    borderRadius: '4px',
                                    display: 'inline-block'
                                  }}>
                                    {evento.activo ? 'Activo' : 'Inactivo'}
                                  </div>
                                </div>
                              </div>
                              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#9ca3af' }}>
                                <i className="pi pi-info-circle" style={{ marginRight: '4px' }}></i>
                                Haga clic para registrar asistencia a este evento
                              </div>
                            </div>
                          ))}
            </div>
          </div>
        )}

                    {eventosEncontrados.length === 0 && fechaInicio && fechaFin && !buscandoEventos && (
                      <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                        <i className="pi pi-inbox" style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}></i>
                        <p>No se encontraron eventos en el rango de fechas seleccionado</p>
                      </div>
                    )}
                  </div>

                  <div className={styles.modalFooter}>
                    <button className={styles.btnClose} onClick={() => setShowBuscarEvento(false)}>
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Paso 2: Listado de Asistencia */}
        {step === 2 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>
              <i className="pi pi-users"></i>
              Listado de Asistencia
            </h2>

            {modoEdicion && eventoSeleccionado && (
              <div style={{ 
                marginBottom: '24px', 
                padding: '16px', 
                background: '#eff6ff', 
                border: '2px solid #3b82f6', 
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <i className="pi pi-info-circle" style={{ fontSize: '1.5rem', color: '#3b82f6' }}></i>
                  <strong style={{ color: '#1e40af' }}>Evento: {eventoSeleccionado.titulo || 'Sin título'}</strong>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#1e3a8a' }}>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Fecha:</strong> {eventoSeleccionado.fecha ? new Date(eventoSeleccionado.fecha).toLocaleString('es-ES') : 'Sin fecha'}
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Lugar:</strong> {eventoSeleccionado.lugar || 'Sin lugar'}
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Listado actual:</strong> {eventoSeleccionado.total_asistentes || 0} personas ({eventoSeleccionado.total_presentes || 0} presentes)
                  </p>
                </div>
              </div>
            )}

            {/* Estadísticas */}
            <div className={styles.statsGrid}>
              {modoEdicion && stats.existentes > 0 && (
                <div className={styles.statCard}>
                  <div
                    className={styles.statIcon}
                    style={{ background: "#8b5cf6" }}
                  >
                    <i className="pi pi-history"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Existentes</span>
                    <span className={styles.statValue}>{stats.existentes}</span>
                  </div>
                </div>
              )}
              {modoEdicion && stats.nuevos > 0 && (
                <div className={styles.statCard}>
                  <div
                    className={styles.statIcon}
                    style={{ background: "#06b6d4" }}
                  >
                    <i className="pi pi-plus-circle"></i>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Nuevos</span>
                    <span className={styles.statValue}>{stats.nuevos}</span>
                  </div>
                </div>
              )}
              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#3b82f6" }}
                >
                  <i className="pi pi-users"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>{modoEdicion ? 'Total Final' : 'Total'}</span>
                  <span className={styles.statValue}>{stats.total}</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#10b981" }}
                >
                  <i className="pi pi-check-circle"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Presentes</span>
                  <span className={styles.statValue}>{stats.presentes}</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#ef4444" }}
                >
                  <i className="pi pi-times-circle"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Ausentes</span>
                  <span className={styles.statValue}>{stats.ausentes}</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#f59e0b" }}
                >
                  <i className="pi pi-percentage"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Asistencia</span>
                  <span className={styles.statValue}>{stats.porcentaje}%</span>
                </div>
              </div>
            </div>

            {/* Formulario para agregar al listado */}
            <div className={styles.addAsistenteForm}>
              <h3>Agregar al Listado de Asistencia</h3>
              {eventoSeleccionado && (
                <p style={{ marginBottom: '16px', fontSize: '0.875rem', color: '#6b7280' }}>
                  Registre las personas para el evento: <strong>{eventoSeleccionado?.titulo || 'Sin título'}</strong>
                </p>
              )}
              <div className={styles.addFormGrid}>
                <input
                  type="text"
                  placeholder="Nombres y Apellidos"
                  value={nuevoAsistente.nombres_apellidos}
                  onChange={(e) =>
                    setNuevoAsistente({
                      ...nuevoAsistente,
                      nombres_apellidos: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Identificación"
                  value={nuevoAsistente.identificacion}
                  onChange={(e) =>
                    setNuevoAsistente({
                      ...nuevoAsistente,
                      identificacion: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Firma (opcional)"
                  value={nuevoAsistente.firma}
                  onChange={(e) =>
                    setNuevoAsistente({
                      ...nuevoAsistente,
                      firma: e.target.value,
                    })
                  }
                />
                <button
                  className={styles.btnAdd}
                  onClick={handleAgregarAsistente}
                >
                  <i className="pi pi-plus"></i>
                  Agregar
                </button>
              </div>
            </div>

            {/* Tabla de asistentes */}
            <div className={styles.tableContainer}>
              <table className={styles.asistenciaTable}>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Nombres y Apellidos</th>
                    <th>Identificación</th>
                    <th>Firma</th>
                    <th>Asistencia</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listadoAsistencia.length === 0 ? (
                    <tr>
                      <td colSpan="6" className={styles.emptyState}>
                        <i className="pi pi-users"></i>
                        <p>No hay personas en el listado</p>
                        <span>
                          Agregue personas al listado usando el formulario superior
                        </span>
                      </td>
                    </tr>
                  ) : (
                    listadoAsistencia.map((asistente, index) => (
                      <tr key={index}>
                        <td>{asistente.num_consec}</td>
                        <td>{asistente.nombres_apellidos}</td>
                        <td>{asistente.identificacion}</td>
                        <td>{asistente.firma || "-"}</td>
                        <td>
                          <button
                            className={`${styles.asistenciaBtn} ${
                              asistente.asistencia
                                ? styles.presente
                                : styles.ausente
                            }`}
                            onClick={() => toggleAsistencia(index)}
                          >
                            {asistente.asistencia ? (
                              <>
                                <i className="pi pi-check"></i>
                                Presente
                              </>
                            ) : (
                              <>
                                <i className="pi pi-times"></i>
                                Ausente
                              </>
                            )}
                          </button>
                        </td>
                        <td>
                          <button
                            className={styles.btnDelete}
                            onClick={() => handleEliminarAsistente(index)}
                          >
                            <i className="pi pi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Evaluación */}
            <div className={styles.evaluacionSection}>
              <label>
                <i className="pi pi-star"></i>
                Evaluación del Evento
              </label>
              <textarea
                value={evaluacion}
                onChange={(e) => setEvaluacion(e.target.value)}
                placeholder="Opinión general sobre el evento..."
                rows={4}
              />
            </div>

            {/* Acciones finales */}
            <div className={styles.stepActions}>
              <button
                className={styles.btnSecondary}
                onClick={() => setStep(1)}
              >
                <i className="pi pi-arrow-left"></i>
                Volver
              </button>
              <button 
                className={styles.btnSuccess} 
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <i className="pi pi-spin pi-spinner"></i>
                    Guardando...
                  </>
                ) : (
                  <>
                <i className="pi pi-save"></i>
                    {modoEdicion ? `Agregar ${listadoAsistencia.length} persona(s) al listado` : 'Guardar Listado de Asistencia'}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Registro - Agrupado por evento */}
        {step === 3 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>
              <i className="pi pi-book"></i>
              Registro de Asistencias por Evento
            </h2>

            {/* Filtros */}
            <div style={{ 
              marginBottom: '24px', 
              padding: '20px', 
              background: '#f9fafb', 
              borderRadius: '12px',
              border: '2px solid #e5e7eb'
            }}>
              <h3 style={{ marginBottom: '16px', fontSize: '1.125rem', fontWeight: '600' }}>
                <i className="pi pi-filter" style={{ marginRight: '8px' }}></i>
                Filtros
              </h3>
              <div className={styles.formGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div className={styles.formGroup}>
                  <label>Título del Evento</label>
                  <input
                    type="text"
                    value={filtroTitulo}
                    onChange={(e) => setFiltroTitulo(e.target.value)}
                    placeholder="Buscar por título..."
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Organizador</label>
                  <input
                    type="text"
                    value={filtroOrganizador}
                    onChange={(e) => setFiltroOrganizador(e.target.value)}
                    placeholder="Buscar por organizador..."
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Fecha Inicio</label>
                  <input
                    type="date"
                    value={filtroFechaInicio}
                    onChange={(e) => setFiltroFechaInicio(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Fecha Fin</label>
                  <input
                    type="date"
                    value={filtroFechaFin}
                    onChange={(e) => setFiltroFechaFin(e.target.value)}
                  />
                </div>
              </div>
              {(filtroTitulo || filtroOrganizador || filtroFechaInicio || filtroFechaFin) && (
                <button
                  className={styles.btnSecondary}
                  onClick={() => {
                    setFiltroTitulo("");
                    setFiltroOrganizador("");
                    setFiltroFechaInicio("");
                    setFiltroFechaFin("");
                  }}
                  style={{ marginTop: '12px' }}
                >
                  <i className="pi pi-times"></i>
                  Limpiar Filtros
                </button>
              )}
            </div>

            {loading ? (
              <div className={styles.emptyState}>
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>
                <p>Cargando registros...</p>
              </div>
            ) : eventosOrdenados.length === 0 ? (
              <div className={styles.emptyState}>
                <i className="pi pi-inbox"></i>
                <p>No hay eventos o registros de asistencia</p>
                <span>
                  Los eventos y sus registros de asistencia aparecerán aquí
                </span>
              </div>
            ) : (
              <div className={styles.registrosContainer}>
                {eventosOrdenados.map((eventoKey) => {
                  const item = eventosFiltradosData[eventoKey];
                  const evento = item.evento;
                  const registros = item.registros;
                  
                  return (
                    <div key={eventoKey} className={styles.fechaGroup}>
                      <div className={styles.fechaHeader}>
                        <i className="pi pi-calendar"></i>
                        <h3 className={styles.fechaTitle}>
                          {evento ? evento.titulo : (item.fechaKey || 'Registros sin evento')}
                        </h3>
                        <span className={styles.eventosCount}>
                          {registros.length} registro(s) de asistencia
                        </span>
                      </div>
                      
                      {evento && (
                        <div style={{ 
                          marginBottom: '16px', 
                          padding: '12px', 
                          background: '#eff6ff', 
                          borderRadius: '8px',
                          fontSize: '0.875rem'
                        }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                            {evento.fecha && (
                              <div>
                                <strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString('es-ES')}
                              </div>
                            )}
                            {evento.lugar && (
                              <div>
                                <strong>Lugar:</strong> {evento.lugar}
                              </div>
                            )}
                            {evento.organizador && (
                              <div>
                                <strong>Organizador:</strong> {evento.organizador}
                              </div>
                            )}
                            {evento.descripcion && (
                              <div style={{ gridColumn: '1 / -1' }}>
                                <strong>Descripción:</strong> {evento.descripcion}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {registros.length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
                          <i className="pi pi-info-circle" style={{ fontSize: '2rem', marginBottom: '8px', display: 'block' }}></i>
                          <p>No hay registros de asistencia para este evento</p>
                        </div>
                      ) : (
                        registros.map((registro, registroIndex) => {
                          const asistentesPresentes = registro.asistentes?.filter((a) => a.asistencia) || [];
                          const registroId = registro.evento_id || registro.id || `${eventoKey}-${registroIndex}`;
                          const estaExpandido = eventosExpandidos[registroId];
                          
                          return (
                            <div key={registroIndex} className={styles.eventoCard}>
                              <div className={styles.eventoHeader}>
                                <div className={styles.eventoInfo}>
                                  <h4 className={styles.eventoNombre}>
                                    {registro.grupo || "Registro de Asistencia"}
                                  </h4>
                                  {!estaExpandido && (
                                    <div className={styles.eventoDetalles}>
                                      <span>
                                        <i className="pi pi-map-marker"></i>
                                        {registro.lugar || "Sin lugar"}
                                      </span>
                                      <span>
                                        <i className="pi pi-tag"></i>
                                        {registro.tipo_evento || "Sin tipo"}
                                      </span>
                                      <span>
                                        <i className="pi pi-building"></i>
                                        {registro.institucion || "Sin institución"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className={styles.eventoStats}>
                                  <div className={styles.miniStat}>
                                    <span className={styles.miniStatLabel}>
                                      Total
                                    </span>
                                    <span className={styles.miniStatValue}>
                                      {registro.total_asistentes || 0}
                                    </span>
                                  </div>
                                  <div className={styles.miniStat}>
                                    <span className={styles.miniStatLabel}>
                                      Presentes
                                    </span>
                                    <span
                                      className={`${styles.miniStatValue} ${styles.presente}`}
                                    >
                                      {registro.total_presentes || 0}
                                    </span>
                                  </div>
                                  <button
                                    className={styles.btnVerMas}
                                    onClick={() => toggleEventoExpandido(registroId)}
                                    style={{ 
                                      marginTop: '8px',
                                      padding: '6px 12px',
                                      fontSize: '0.875rem',
                                      background: estaExpandido ? '#e5e7eb' : '#f3f4f6',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '6px',
                                      transition: 'all 0.2s ease',
                                      width: '100%',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    <i className={`pi ${estaExpandido ? 'pi-chevron-up' : 'pi-chevron-down'}`}></i>
                                    {estaExpandido ? 'Ver menos' : 'Ver más'}
                                  </button>
                                </div>
                              </div>

                              {estaExpandido && (
                                <>
                                  <div className={styles.eventoDetallesExpandido} style={{ 
                                    marginTop: '16px', 
                                    padding: '16px', 
                                    background: '#f9fafb', 
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb'
                                  }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                                      <div>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Lugar:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.lugar || "Sin lugar"}</p>
                                      </div>
                                      <div>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Tipo de Evento:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.tipo_evento || "Sin tipo"}</p>
                                      </div>
                                      <div>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Institución:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.institucion || "Sin institución"}</p>
                                      </div>
                                      <div>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Dependencia/Programa:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.dependencia_program || "N/A"}</p>
                                      </div>
                                      <div>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Director:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.director || "N/A"}</p>
                                      </div>
                                      <div>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Responsable:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.responsable || "N/A"}</p>
                                      </div>
                                    </div>
                                    {registro.observaciones && (
                                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Observaciones:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.observaciones}</p>
                                      </div>
                                    )}
                                    {registro.evaluacion && (
                                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                                        <strong style={{ color: '#6b7280', fontSize: '0.875rem' }}>Evaluación:</strong>
                                        <p style={{ margin: '4px 0 0 0', color: '#1a1a1a' }}>{registro.evaluacion}</p>
                                      </div>
                                    )}
                                  </div>

                                  <div className={styles.asistentesList} style={{ marginTop: '16px' }}>
                                    <h5 className={styles.asistentesTitle}>
                                      <i className="pi pi-users"></i>
                                      Lista de Asistentes (
                                      {registro.total_asistentes || registro.asistentes?.length || 0})
                                    </h5>
                                    {registro.asistentes && registro.asistentes.length > 0 ? (
                                      <div className={styles.asistentesGrid}>
                                        {registro.asistentes.map((asistente, asistIndex) => (
                                          <div
                                            key={asistIndex}
                                            className={styles.asistenteItem}
                                          >
                                            <span className={styles.asistenteNum}>
                                              {asistente.num_consec || asistIndex + 1}
                                            </span>
                                            <div className={styles.asistenteInfo}>
                                              <span className={styles.asistenteNombre}>
                                                {asistente.nombres_apellidos ||
                                                  "Sin nombre"}
                                              </span>
                                              <span className={styles.asistenteId}>
                                                ID: {asistente.identificacion || "N/A"}
                                              </span>
                                            </div>
                                            <span
                                              className={`${styles.asistenteBadge} ${
                                                asistente.asistencia
                                                  ? styles.presente
                                                  : styles.ausente
                                              }`}
                                            >
                                              {asistente.asistencia ? (
                                                <>
                                                  <i className="pi pi-check"></i>
                                                  Presente
                                                </>
                                              ) : (
                                                <>
                                                  <i className="pi pi-times"></i>
                                                  Ausente
                                                </>
                                              )}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className={styles.sinAsistentes}>
                                        <i className="pi pi-info-circle"></i>
                                        <p>No hay asistentes registrados</p>
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Asistencia;

