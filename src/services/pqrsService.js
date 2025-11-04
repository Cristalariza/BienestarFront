/**
 * Servicio de PQRS (Peticiones, Quejas, Reclamos, Sugerencias)
 * Maneja todas las operaciones CRUD de PQRS
 */

import api from './api';

const pqrsService = {
  /**
   * Crear una nueva PQRS
   * @param {Object} pqrsData - Datos de la PQRS
   * @param {string} pqrsData.tipo_solicitud - Tipo de solicitud (PETICION, QUEJA, RECLAMO, SUGERENCIA)
   * @param {string} pqrsData.asunto - Asunto de la solicitud
   * @param {string} pqrsData.descripcion - Descripción detallada
   * @param {string} pqrsData.solicitante_nombre - Nombre del solicitante
   * @param {string} pqrsData.solicitante_email - Email del solicitante
   * @param {string} pqrsData.solicitante_telefono - Teléfono del solicitante
   * @param {string} pqrsData.dependencia_relacionada - Dependencia relacionada
   * @returns {Promise<Object>} - PQRS creada
   */
  crear: async (pqrsData) => {
    try {
      const response = await api.post('/pqrs', pqrsData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las PQRS
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.skip - Número de registros a saltar (default: 0)
   * @param {number} params.limit - Máximo de registros a retornar (default: 100)
   * @param {boolean} params.only_active - Solo registros activos (default: true)
   * @returns {Promise<Array>} - Lista de PQRS
   */
  obtenerTodas: async (params = {}) => {
    try {
      const { skip = 0, limit = 100, only_active = true } = params;
      const response = await api.get('/pqrs', {
        params: { skip, limit, only_active }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una PQRS por ID
   * @param {string} pqrsId - ID de la PQRS
   * @returns {Promise<Object>} - PQRS encontrada
   */
  obtenerPorId: async (pqrsId) => {
    try {
      const response = await api.get(`/pqrs/${pqrsId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar el estado de una PQRS
   * @param {string} pqrsId - ID de la PQRS
   * @param {Object} data - Datos a actualizar
   * @param {string} data.estado - Nuevo estado (PENDIENTE, EN_PROCESO, RESUELTO, CERRADO)
   * @returns {Promise<Object>} - PQRS actualizada
   */
  actualizarEstado: async (pqrsId, data) => {
    try {
      const response = await api.put(`/pqrs/${pqrsId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Agregar respuesta a una PQRS
   * @param {string} pqrsId - ID de la PQRS
   * @param {Object} respuestaData - Datos de la respuesta
   * @param {string} respuestaData.respuesta - Texto de la respuesta
   * @param {string} respuestaData.respondido_por - Nombre de quien responde
   * @returns {Promise<Object>} - Confirmación
   */
  agregarRespuesta: async (pqrsId, respuestaData) => {
    try {
      const response = await api.post(`/pqrs/${pqrsId}/respuestas`, respuestaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una PQRS
   * @param {string} pqrsId - ID de la PQRS
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (pqrsId) => {
    try {
      const response = await api.delete(`/pqrs/${pqrsId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default pqrsService;
