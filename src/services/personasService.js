/**
 * Servicio de Personas
 * Maneja todas las operaciones CRUD de personas
 */

import api from './api';

const personasService = {
  /**
   * Crear una nueva persona
   * @param {Object} personaData - Datos de la persona
   * @param {string} personaData.nombre - Nombre de la persona
   * @param {string} personaData.apellido - Apellido de la persona
   * @param {string} personaData.tipo_documento - Tipo de documento (CC, TI, etc.)
   * @param {string} personaData.numero_documento - Número de documento
   * @param {string} personaData.fecha_nacimiento - Fecha de nacimiento (YYYY-MM-DD)
   * @param {string} personaData.genero - Género (M, F, etc.)
   * @param {string} personaData.telefono - Teléfono
   * @param {string} personaData.correo_electronico - Correo electrónico
   * @returns {Promise<Object>} - Persona creada
   */
  crear: async (personaData) => {
    try {
      const response = await api.post('/personas', personaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las personas
   * @returns {Promise<Array>} - Lista de personas
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get('/personas/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una persona por ID
   * @param {string} personaId - ID de la persona
   * @returns {Promise<Object>} - Persona encontrada
   */
  obtenerPorId: async (personaId) => {
    try {
      const response = await api.get(`/personas/${personaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una persona
   * @param {string} personaId - ID de la persona
   * @param {Object} personaData - Datos a actualizar
   * @returns {Promise<Object>} - Persona actualizada
   */
  actualizar: async (personaId, personaData) => {
    try {
      const response = await api.put(`/personas/${personaId}`, personaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una persona
   * @param {string} personaId - ID de la persona
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (personaId) => {
    try {
      const response = await api.delete(`/personas/${personaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default personasService;
