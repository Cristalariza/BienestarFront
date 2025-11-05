/**
 * Servicio de Eventos
 * Maneja todas las operaciones CRUD de eventos
 */

import api from './api';

const eventosService = {
  /**
   * Crear un nuevo evento
   * @param {Object} eventoData - Datos del evento
   * @param {string} eventoData.titulo - Título del evento
   * @param {string} eventoData.descripcion - Descripción del evento
   * @param {string} eventoData.fecha - Fecha del evento (ISO 8601)
   * @param {string} eventoData.lugar - Lugar del evento
   * @param {string} eventoData.organizador - Organizador del evento
   * @param {string} eventoData.imagen_url - URL de la imagen
   * @param {boolean} eventoData.activo - Estado del evento
   * @returns {Promise<Object>} - Evento creado
   */
  crear: async (eventoData) => {
    try {
      const response = await api.post('/eventos', eventoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los eventos
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.skip - Número de registros a saltar (default: 0)
   * @param {number} params.limit - Máximo de registros a retornar (default: 100)
   * @param {boolean} params.only_active - Solo registros activos (default: true)
   * @returns {Promise<Array>} - Lista de eventos
   */
  obtenerTodos: async (params = {}) => {
    try {
      const { skip = 0, limit = 100, only_active = true } = params;
      const response = await api.get('/eventos', {
        params: { skip, limit, only_active }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un evento por ID
   * @param {string} eventoId - ID del evento
   * @returns {Promise<Object>} - Evento encontrado
   */
  obtenerPorId: async (eventoId) => {
    try {
      const response = await api.get(`/eventos/${eventoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un evento
   * @param {string} eventoId - ID del evento
   * @param {Object} eventoData - Datos a actualizar
   * @returns {Promise<Object>} - Evento actualizado
   */
  actualizar: async (eventoId, eventoData) => {
    try {
      const response = await api.put(`/eventos/${eventoId}`, eventoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un evento
   * @param {string} eventoId - ID del evento
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (eventoId) => {
    try {
      const response = await api.delete(`/eventos/${eventoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default eventosService;
