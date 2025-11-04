/**
 * Servicio de Administrativos
 * Maneja todas las operaciones CRUD de administrativos
 * Requiere autenticación con token Bearer
 */

import api from './api';

const administrativosService = {
  /**
   * Crear un nuevo administrativo
   * @param {Object} administrativoData - Datos del administrativo
   * @param {string} administrativoData.persona_id - ID de la persona
   * @param {string} administrativoData.cargo - Cargo del administrativo
   * @param {string} administrativoData.departamento - Departamento
   * @param {string} administrativoData.fecha_vinculacion - Fecha de vinculación (YYYY-MM-DD)
   * @returns {Promise<Object>} - Administrativo creado
   */
  crear: async (administrativoData) => {
    try {
      const response = await api.post('/administrativos/create', administrativoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un administrativo por ID
   * @param {string} administrativoId - ID del administrativo
   * @returns {Promise<Object>} - Administrativo encontrado
   */
  obtenerPorId: async (administrativoId) => {
    try {
      const response = await api.get(`/administrativos/${administrativoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener administrativo con detalle completo
   * @param {string} administrativoId - ID del administrativo
   * @returns {Promise<Object>} - Administrativo con información detallada de persona
   */
  obtenerDetalle: async (administrativoId) => {
    try {
      const response = await api.get(`/administrativos/${administrativoId}/detalle`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener administrativo por ID de persona
   * @param {string} personaId - ID de la persona
   * @returns {Promise<Object>} - Administrativo encontrado
   */
  obtenerPorPersonaId: async (personaId) => {
    try {
      const response = await api.get(`/administrativos/by-persona/${personaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un administrativo
   * @param {string} administrativoId - ID del administrativo
   * @param {Object} administrativoData - Datos a actualizar
   * @returns {Promise<Object>} - Confirmación de actualización
   */
  actualizar: async (administrativoId, administrativoData) => {
    try {
      const response = await api.put(`/administrativos/${administrativoId}`, administrativoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Desactivar un administrativo (Soft Delete)
   * Solo administradores
   * @param {string} administrativoId - ID del administrativo
   * @param {Object} data - Datos de desactivación
   * @param {string} data.motivo - Motivo de la desactivación
   * @returns {Promise<Object>} - Confirmación de desactivación
   */
  desactivar: async (administrativoId, data) => {
    try {
      const response = await api.delete(`/administrativos/soft-delete/${administrativoId}`, { data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reactivar un administrativo
   * Solo administradores
   * @param {string} administrativoId - ID del administrativo
   * @returns {Promise<Object>} - Confirmación de reactivación
   */
  reactivar: async (administrativoId) => {
    try {
      const response = await api.post(`/administrativos/reactivar/${administrativoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar permanentemente un administrativo
   * Solo administradores
   * @param {string} administrativoId - ID del administrativo
   * @returns {Promise<Object>} - Confirmación de eliminación permanente
   */
  eliminarPermanente: async (administrativoId) => {
    try {
      const response = await api.delete(`/administrativos/delete/${administrativoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default administrativosService;
