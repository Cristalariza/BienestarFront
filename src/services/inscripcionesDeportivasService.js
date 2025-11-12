/**
 * Servicio de Inscripciones Deportivas
 * Maneja todas las operaciones CRUD de inscripciones deportivas
 */

import api from "./api";

const inscripcionesDeportivasService = {
  /**
   * Obtener todas las inscripciones deportivas
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.skip - Número de registros a saltar
   * @param {number} params.limit - Límite de registros
   * @param {string} params.programa_deportivo_id - Filtrar por programa deportivo
   * @param {string} params.estado_inscripcion - Filtrar por estado (PENDIENTE, APROBADA, RECHAZADA)
   * @returns {Promise<Array>} - Lista de inscripciones
   */
  obtenerTodas: async (params = {}) => {
    try {
      const response = await api.get("/inscripciones-deportivas", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una inscripción por ID
   * @param {string} inscripcionId - ID de la inscripción
   * @returns {Promise<Object>} - Inscripción encontrada
   */
  obtenerPorId: async (inscripcionId) => {
    try {
      const response = await api.get(
        `/inscripciones-deportivas/${inscripcionId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva inscripción deportiva
   * @param {Object} inscripcionData - Datos de la inscripción
   * @returns {Promise<Object>} - Inscripción creada
   */
  crear: async (inscripcionData) => {
    try {
      const response = await api.post(
        "/inscripciones-deportivas",
        inscripcionData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una inscripción deportiva
   * @param {string} inscripcionId - ID de la inscripción
   * @param {Object} inscripcionData - Datos a actualizar
   * @returns {Promise<Object>} - Inscripción actualizada
   */
  actualizar: async (inscripcionId, inscripcionData) => {
    try {
      const response = await api.put(
        `/inscripciones-deportivas/${inscripcionId}`,
        inscripcionData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Aprobar una inscripción deportiva
   * @param {string} formularioDeptId - ID de la inscripción (formulario_dept_id)
   * @returns {Promise<Object>} - Respuesta de la aprobación
   */
  aprobar: async (formularioDeptId) => {
    try {
      const response = await api.post(
        `/inscripciones-deportivas/${formularioDeptId}/aprobar`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Rechazar una inscripción deportiva
   * @param {string} formularioDeptId - ID de la inscripción (formulario_dept_id)
   * @param {string} motivo - Motivo del rechazo (opcional)
   * @returns {Promise<Object>} - Respuesta del rechazo
   */
  rechazar: async (formularioDeptId, motivo = null) => {
    try {
      const params = motivo ? { motivo } : {};
      const response = await api.post(
        `/inscripciones-deportivas/${formularioDeptId}/rechazar`,
        null,
        { params }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancelar una inscripción deportiva
   * @param {string} formularioDeptId - ID de la inscripción (formulario_dept_id)
   * @param {string} motivo - Motivo de la cancelación (opcional)
   * @returns {Promise<Object>} - Respuesta de la cancelación
   */
  cancelar: async (formularioDeptId, motivo = null) => {
    try {
      const params = motivo ? { motivo } : {};
      const response = await api.post(
        `/inscripciones-deportivas/${formularioDeptId}/cancelar`,
        null,
        { params }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener el estado de una inscripción deportiva
   * @param {string} formularioDeptId - ID de la inscripción (formulario_dept_id)
   * @returns {Promise<Object>} - Estado de la inscripción
   */
  obtenerEstado: async (formularioDeptId) => {
    try {
      const response = await api.get(
        `/inscripciones-deportivas/${formularioDeptId}/estado`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener inscripciones por programa deportivo
   * @param {string} programaDeportivoId - ID del programa deportivo
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.skip - Número de registros a saltar
   * @param {number} params.limit - Límite de registros
   * @returns {Promise<Array>} - Lista de inscripciones del programa
   */
  obtenerPorPrograma: async (programaDeportivoId, params = {}) => {
    try {
      const response = await api.get(
        `/inscripciones-deportivas/${programaDeportivoId}/inscripciones-deportivas`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener inscripciones por estado
   * @param {string} estado - Estado de la inscripción (pendiente, aprobada, rechazada, cancelada)
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.skip - Número de registros a saltar
   * @param {number} params.limit - Límite de registros
   * @returns {Promise<Array>} - Lista de inscripciones filtradas por estado
   */
  obtenerPorEstado: async (estado, params = {}) => {
    try {
      const response = await api.get(
        `/inscripciones-deportivas/por-estado/${estado}`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener inscripciones por estudiante
   * @param {string} identificacion - Identificación del estudiante
   * @returns {Promise<Array>} - Lista de inscripciones del estudiante
   */
  obtenerPorEstudiante: async (identificacion) => {
    try {
      const response = await api.get(
        `/inscripciones-deportivas/${identificacion}/inscripciones-deportivas`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una inscripción deportiva
   * @param {string} inscripcionId - ID de la inscripción
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (inscripcionId) => {
    try {
      const response = await api.delete(
        `/inscripciones-deportivas/${inscripcionId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default inscripcionesDeportivasService;
