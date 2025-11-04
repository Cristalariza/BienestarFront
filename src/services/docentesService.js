/**
 * Servicio de Docentes
 * Maneja todas las operaciones CRUD de docentes
 */

import api from './api';

const docentesService = {
  /**
   * Crear un nuevo docente
   * @param {Object} docenteData - Datos del docente
   * @param {string} docenteData.persona_id - ID de la persona
   * @param {string} docenteData.facultad_id - ID de la facultad
   * @param {string} docenteData.programa_academico_id - ID del programa académico
   * @param {string} docenteData.categoria - Categoría del docente (Tiempo Completo, etc.)
   * @param {string} docenteData.departamento - Departamento
   * @returns {Promise<Object>} - Docente creado
   */
  crear: async (docenteData) => {
    try {
      const response = await api.post('/docentes/create', docenteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un docente por ID
   * @param {string} docenteId - ID del docente
   * @returns {Promise<Object>} - Docente encontrado
   */
  obtenerPorId: async (docenteId) => {
    try {
      const response = await api.get(`/docentes/${docenteId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un docente
   * @param {string} docenteId - ID del docente
   * @param {Object} docenteData - Datos a actualizar
   * @returns {Promise<Object>} - Docente actualizado
   */
  actualizar: async (docenteId, docenteData) => {
    try {
      const response = await api.put(`/docentes/update/${docenteId}`, docenteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un docente (Soft Delete)
   * @param {string} docenteId - ID del docente
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (docenteId) => {
    try {
      const response = await api.delete(`/docentes/soft-delete/${docenteId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default docentesService;
