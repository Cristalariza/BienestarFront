/**
 * Servicio de Registros de Asistencia
 * Maneja todas las operaciones CRUD de registros de asistencia
 */

import api from "./api";

const registrosAsistenciaService = {
  /**
   * Crear un nuevo registro de asistencia
   * @param {Object} registroData - Datos del registro de asistencia
   * @param {string} registroData.evento_id - ID del evento
   * @param {string} registroData.institucion - Institución
   * @param {string} registroData.lugar - Lugar del evento
   * @param {string} registroData.grupo - Grupo/Equipo
   * @param {string} registroData.fecha - Fecha del evento (ISO 8601)
   * @param {string} registroData.tipo_evento - Tipo de evento
   * @param {number} registroData.num_consec - Número consecutivo
   * @param {string} registroData.dependencia_program - Dependencia/Programa
   * @param {Array} registroData.asistentes - Lista de asistentes
   * @param {string} registroData.evaluacion - Evaluación del evento
   * @param {string} registroData.director - Director
   * @param {string} registroData.responsable - Responsable
   * @param {string} registroData.observaciones - Observaciones
   * @param {number} registroData.total_asistentes - Total de asistentes
   * @param {number} registroData.total_presentes - Total de presentes
   * @param {string} registroData.fecha_registro - Fecha de registro (ISO 8601)
   * @returns {Promise<Object>} - Registro de asistencia creado
   */
  crear: async (registroData) => {
    try {
      const response = await api.post("/registros-asistencia", registroData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los registros de asistencia con filtros opcionales
   * @param {Object} params - Parámetros de consulta
   * @param {string} params.grupo - Filtrar por grupo
   * @param {string} params.tipo_evento - Filtrar por tipo de evento
   * @param {string} params.fecha_inicio - Fecha de inicio (ISO 8601)
   * @param {string} params.fecha_fin - Fecha de fin (ISO 8601)
   * @returns {Promise<Array>} - Lista de registros de asistencia
   */
  obtenerTodos: async (params = {}) => {
    try {
      const response = await api.get("/registros-asistencia", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un registro de asistencia por ID
   * @param {string} registroId - ID del registro
   * @returns {Promise<Object>} - Registro de asistencia encontrado
   */
  obtenerPorId: async (registroId) => {
    try {
      const response = await api.get(`/registros-asistencia/${registroId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un registro de asistencia existente
   * @param {string} registroId - ID del registro
   * @param {Object} registroData - Datos a actualizar
   * @returns {Promise<Object>} - Registro actualizado
   */
  actualizar: async (registroId, registroData) => {
    try {
      const response = await api.put(`/registros-asistencia/${registroId}`, registroData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default registrosAsistenciaService;

