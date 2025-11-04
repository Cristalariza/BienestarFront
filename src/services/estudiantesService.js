/**
 * Servicio de Estudiantes
 * Maneja todas las operaciones CRUD de estudiantes
 */

import api from './api';

const estudiantesService = {
  /**
   * Crear un nuevo estudiante
   * @param {Object} estudianteData - Datos del estudiante
   * @param {string} estudianteData.persona_id - ID de la persona
   * @param {string} estudianteData.codigo_estudiantil - Código estudiantil
   * @param {string} estudianteData.programa_academico_id - ID del programa académico
   * @param {number} estudianteData.semestre_actual - Semestre actual
   * @param {string} estudianteData.estado_academico - Estado académico (ACTIVO, INACTIVO, etc.)
   * @returns {Promise<Object>} - Estudiante creado
   */
  crear: async (estudianteData) => {
    try {
      const response = await api.post('/estudiantes/create', estudianteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un estudiante por ID
   * @param {string} estudianteId - ID del estudiante
   * @returns {Promise<Object>} - Estudiante encontrado
   */
  obtenerPorId: async (estudianteId) => {
    try {
      const response = await api.get(`/estudiantes/${estudianteId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener estudiante por ID de persona
   * @param {string} personaId - ID de la persona
   * @returns {Promise<Object>} - Estudiante encontrado
   */
  obtenerPorPersonaId: async (personaId) => {
    try {
      const response = await api.get(`/estudiantes/by-persona/${personaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un estudiante
   * @param {string} estudianteId - ID del estudiante
   * @param {Object} estudianteData - Datos a actualizar
   * @returns {Promise<Object>} - Estudiante actualizado
   */
  actualizar: async (estudianteId, estudianteData) => {
    try {
      const response = await api.put(`/estudiantes/update/${estudianteId}`, estudianteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un estudiante (Soft Delete)
   * @param {string} estudianteId - ID del estudiante
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (estudianteId) => {
    try {
      const response = await api.delete(`/estudiantes/soft-delete/${estudianteId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default estudiantesService;
