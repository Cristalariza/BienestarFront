/**
 * Servicio de Programas Culturales
 * Maneja todas las operaciones CRUD de programas culturales
 */

import api from './api';

const programasCulturalesService = {
  /**
   * Crear un nuevo programa cultural
   * @param {Object} programaData - Datos del programa
   * @param {string} programaData.nombre - Nombre del programa
   * @param {string} programaData.descripcion - Descripción del programa
   * @param {string} programaData.fecha_inicio - Fecha de inicio (YYYY-MM-DD)
   * @param {string} programaData.fecha_fin - Fecha de fin (YYYY-MM-DD)
   * @param {string} programaData.horario - Horario del programa
   * @param {string} programaData.instructor - Instructor del programa
   * @param {number} programaData.cupos_disponibles - Cupos disponibles
   * @param {string} programaData.ubicacion - Ubicación del programa
   * @returns {Promise<Object>} - Programa creado
   */
  crear: async (programaData) => {
    try {
      const response = await api.post('/programas_culturales', programaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los programas culturales
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.skip - Número de registros a saltar (default: 0)
   * @param {number} params.limit - Máximo de registros a retornar (default: 100)
   * @param {boolean} params.only_active - Solo registros activos (default: true)
   * @returns {Promise<Array>} - Lista de programas culturales
   */
  obtenerTodos: async (params = {}) => {
    try {
      const { skip = 0, limit = 100, only_active = true } = params;
      const response = await api.get('/programas_culturales', {
        params: { skip, limit, only_active }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un programa cultural por ID
   * @param {string} programaId - ID del programa
   * @returns {Promise<Object>} - Programa encontrado
   */
  obtenerPorId: async (programaId) => {
    try {
      const response = await api.get(`/programas_culturales/${programaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un programa cultural
   * @param {string} programaId - ID del programa
   * @param {Object} programaData - Datos a actualizar
   * @returns {Promise<Object>} - Programa actualizado
   */
  actualizar: async (programaId, programaData) => {
    try {
      const response = await api.put(`/programas_culturales/${programaId}`, programaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un programa cultural
   * @param {string} programaId - ID del programa
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (programaId) => {
    try {
      const response = await api.delete(`/programas_culturales/${programaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default programasCulturalesService;
