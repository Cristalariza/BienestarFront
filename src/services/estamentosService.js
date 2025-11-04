/**
 * Servicio de Estamentos
 * Maneja todas las operaciones de estamentos
 */

import api from './api';

const estamentosService = {
  /**
   * Obtener todos los estamentos
   * @returns {Promise<Array>} - Lista de estamentos (ESTUDIANTE, DOCENTE, ADMINISTRATIVO, etc.)
   */
  obtenerTodos: async () => {
    try {
      const response = await api.get('/estamentos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un estamento por ID
   * @param {string} id - ID del estamento
   * @returns {Promise<Object>} - Datos del estamento
   */
  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/estamentos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default estamentosService;
