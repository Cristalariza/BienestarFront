/**
 * Servicio de Inscripciones Culturales
 * Maneja todas las operaciones CRUD de inscripciones culturales
 */

import api from './api';

const inscripcionesCulturalesService = {
  /**
   * Obtener todas las inscripciones culturales
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.skip - Número de registros a saltar
   * @param {number} params.limit - Límite de registros
   * @param {string} params.programa_cultural_id - Filtrar por programa cultural
   * @param {string} params.estado_inscripcion - Filtrar por estado (PENDIENTE, APROBADA, RECHAZADA)
   * @returns {Promise<Array>} - Lista de inscripciones
   */
  obtenerTodas: async (params = {}) => {
    try {
      const response = await api.get('/inscripciones', { params });
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
      const response = await api.get(`/inscripciones/${inscripcionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva inscripción cultural
   * @param {Object} inscripcionData - Datos de la inscripción
   * @returns {Promise<Object>} - Inscripción creada
   */
  crear: async (inscripcionData) => {
    try {
      const response = await api.post('/inscripciones', inscripcionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una inscripción cultural
   * @param {string} inscripcionId - ID de la inscripción
   * @param {Object} inscripcionData - Datos a actualizar
   * @returns {Promise<Object>} - Inscripción actualizada
   */
  actualizar: async (inscripcionId, inscripcionData) => {
    try {
      const response = await api.put(`/inscripciones/${inscripcionId}`, inscripcionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cambiar el estado de una inscripción (PENDIENTE, APROBADA, RECHAZADA)
   * @param {string} inscripcionId - ID de la inscripción
   * @param {string} nuevoEstado - Nuevo estado
   * @returns {Promise<Object>} - Inscripción actualizada
   */
  cambiarEstado: async (inscripcionId, nuevoEstado) => {
    try {
      const response = await api.patch(`/inscripciones/${inscripcionId}/estado`, {
        estado_inscripcion: nuevoEstado
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancelar/Eliminar una inscripción cultural
   * @param {string} inscripcionId - ID de la inscripción
   * @returns {Promise<Object>} - Confirmación de cancelación
   */
  eliminar: async (inscripcionId) => {
    try {
      const response = await api.delete(`/inscripciones/${inscripcionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default inscripcionesCulturalesService;
