/**
 * Servicio de Podcasts
 * Maneja todas las operaciones CRUD de podcasts
 */

import api from './api';

const podcastsService = {
  /**
   * Crear un nuevo podcast
   * @param {Object} podcastData - Datos del podcast
   * @param {string} podcastData.titulo - Título del podcast
   * @param {string} podcastData.descripcion - Descripción del podcast
   * @param {string} podcastData.audio_url - URL del audio
   * @param {number} podcastData.duracion - Duración en segundos
   * @param {string} podcastData.categoria - Categoría del podcast
   * @param {string} podcastData.presentador - Presentador del podcast
   * @returns {Promise<Object>} - Podcast creado
   */
  crear: async (podcastData) => {
    try {
      const response = await api.post('/podcasts', podcastData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los podcasts
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.skip - Número de registros a saltar (default: 0)
   * @param {number} params.limit - Máximo de registros a retornar (default: 100)
   * @param {boolean} params.only_active - Solo registros activos (default: true)
   * @returns {Promise<Array>} - Lista de podcasts
   */
  obtenerTodos: async (params = {}) => {
    try {
      const { skip = 0, limit = 100, only_active = true } = params;
      const response = await api.get('/podcasts', {
        params: { skip, limit, only_active }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un podcast por ID
   * @param {string} podcastId - ID del podcast
   * @returns {Promise<Object>} - Podcast encontrado
   */
  obtenerPorId: async (podcastId) => {
    try {
      const response = await api.get(`/podcasts/${podcastId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un podcast
   * @param {string} podcastId - ID del podcast
   * @param {Object} podcastData - Datos a actualizar
   * @returns {Promise<Object>} - Podcast actualizado
   */
  actualizar: async (podcastId, podcastData) => {
    try {
      const response = await api.put(`/podcasts/${podcastId}`, podcastData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un podcast
   * @param {string} podcastId - ID del podcast
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (podcastId) => {
    try {
      const response = await api.delete(`/podcasts/${podcastId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default podcastsService;
