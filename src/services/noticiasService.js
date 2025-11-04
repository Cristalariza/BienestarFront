/**
 * Servicio de Noticias
 * Maneja todas las operaciones CRUD de noticias
 */

import api from './api';

const noticiasService = {
  /**
   * Crear una nueva noticia
   * @param {Object} noticiaData - Datos de la noticia
   * @param {string} noticiaData.titulo - Título de la noticia
   * @param {string} noticiaData.contenido - Contenido de la noticia
   * @param {string} noticiaData.imagen_url - URL de la imagen
   * @param {string} noticiaData.categoria - Categoría de la noticia
   * @param {string} noticiaData.autor - Autor de la noticia
   * @returns {Promise<Object>} - Noticia creada
   */
  crear: async (noticiaData) => {
    try {
      const response = await api.post('/noticias', noticiaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las noticias
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.skip - Número de registros a saltar (default: 0)
   * @param {number} params.limit - Máximo de registros a retornar (default: 100)
   * @param {boolean} params.only_active - Solo registros activos (default: true)
   * @returns {Promise<Array>} - Lista de noticias
   */
  obtenerTodas: async (params = {}) => {
    try {
      const { skip = 0, limit = 100, only_active = true } = params;
      const response = await api.get('/noticias', {
        params: { skip, limit, only_active }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una noticia por ID
   * @param {string} id - ID de la noticia
   * @returns {Promise<Object>} - Noticia encontrada
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/noticias/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una noticia
   * @param {string} id - ID de la noticia
   * @param {Object} noticiaData - Datos a actualizar
   * @returns {Promise<Object>} - Noticia actualizada
   */
  actualizar: async (id, noticiaData) => {
    try {
      const response = await api.put(`/noticias/${id}`, noticiaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una noticia (Soft Delete)
   * @param {string} id - ID de la noticia
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/noticias/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default noticiasService;
