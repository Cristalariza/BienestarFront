/**
 * Servicio de Egresados
 * Maneja todas las operaciones CRUD de egresados
 */

import api from './api';

const egresadosService = {
  /**
   * Crear un nuevo egresado
   * @param {Object} egresadoData - Datos del egresado
   * @param {string} egresadoData.persona_id - ID de la persona
   * @param {string} egresadoData.programa_academico_id - ID del programa académico
   * @param {number} egresadoData.anio_egreso - Año de egreso
   * @param {string} egresadoData.titulo_obtenido - Título obtenido
   * @returns {Promise<Object>} - Egresado creado
   */
  crear: async (egresadoData) => {
    try {
      const response = await api.post('/egresados/create', egresadoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un egresado por ID
   * @param {string} egresadoId - ID del egresado
   * @returns {Promise<Object>} - Egresado encontrado
   */
  obtenerPorId: async (egresadoId) => {
    try {
      const response = await api.get(`/egresados/${egresadoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un egresado
   * @param {string} egresadoId - ID del egresado
   * @param {Object} egresadoData - Datos a actualizar
   * @returns {Promise<Object>} - Egresado actualizado
   */
  actualizar: async (egresadoId, egresadoData) => {
    try {
      const response = await api.put(`/egresados/update/${egresadoId}`, egresadoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un egresado (Soft Delete)
   * @param {string} egresadoId - ID del egresado
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (egresadoId) => {
    try {
      const response = await api.delete(`/egresados/soft-delete/${egresadoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default egresadosService;
