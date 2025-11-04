/**
 * Servicio de Programas Deportivos
 * Maneja todas las operaciones CRUD de programas deportivos e inscripciones
 */

import api from './api';

const programasDeportivosService = {
  /**
   * Crear un nuevo programa deportivo
   * @param {Object} programaData - Datos del programa deportivo
   * @param {string} programaData.nombre - Nombre del programa
   * @param {string} programaData.deporte - Tipo de deporte
   * @param {string} programaData.descripcion - Descripción del programa
   * @param {string} programaData.fecha_inicio - Fecha de inicio (YYYY-MM-DD)
   * @param {string} programaData.fecha_fin - Fecha de fin (YYYY-MM-DD)
   * @param {string} programaData.horario - Horario del programa
   * @param {string} programaData.instructor - Nombre del instructor
   * @param {number} programaData.cupos_disponibles - Cupos disponibles
   * @param {string} programaData.ubicacion - Ubicación del programa
   * @returns {Promise<Object>} - Programa deportivo creado
   */
  crear: async (programaData) => {
    try {
      const response = await api.post('/programas-deportivos', programaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los programas deportivos
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.skip - Número de registros a saltar (default: 0)
   * @param {number} params.limit - Máximo de registros a retornar (default: 100)
   * @param {boolean} params.only_active - Solo registros activos (default: true)
   * @returns {Promise<Array>} - Lista de programas deportivos
   */
  obtenerTodos: async (params = {}) => {
    try {
      const { skip = 0, limit = 100, only_active = true } = params;
      const response = await api.get('/programas-deportivos', {
        params: { skip, limit, only_active }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una inscripción deportiva
   * @param {Object} inscripcionData - Datos de la inscripción
   * @param {string} inscripcionData.programa_id - ID del programa deportivo
   * @param {string} inscripcionData.identificacion - Número de identificación
   * @param {string} inscripcionData.nombre_completo - Nombre completo del estudiante
   * @param {string} inscripcionData.email - Email del estudiante
   * @param {string} inscripcionData.telefono - Teléfono del estudiante
   * @param {string} inscripcionData.fecha_nacimiento - Fecha de nacimiento (YYYY-MM-DD)
   * @param {string} inscripcionData.tipo_programa - Tipo de programa (DEPORTIVO)
   * @returns {Promise<Object>} - Inscripción creada
   */
  crearInscripcion: async (inscripcionData) => {
    try {
      const response = await api.post('/inscripciones-deportivas', inscripcionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las inscripciones deportivas
   * @param {Object} params - Parámetros de paginación
   * @param {number} params.skip - Número de registros a saltar (default: 0)
   * @param {number} params.limit - Máximo de registros a retornar (default: 100)
   * @returns {Promise<Array>} - Lista de inscripciones deportivas
   */
  obtenerInscripciones: async (params = {}) => {
    try {
      const { skip = 0, limit = 100 } = params;
      const response = await api.get('/inscripciones-deportivas', {
        params: { skip, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener inscripciones deportivas por estudiante
   * @param {string} identificacion - Número de identificación del estudiante
   * @returns {Promise<Array>} - Lista de inscripciones del estudiante
   */
  obtenerInscripcionesPorEstudiante: async (identificacion) => {
    try {
      const response = await api.get(`/estudiantes/${identificacion}/inscripciones-deportivas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar un programa deportivo
   * @param {string} id - ID del programa deportivo
   * @param {Object} programaData - Datos a actualizar
   * @returns {Promise<Object>} - Programa deportivo actualizado
   */
  actualizar: async (id, programaData) => {
    try {
      const response = await api.put(`/programas-deportivos/${id}`, programaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar un programa deportivo (Soft Delete)
   * @param {string} id - ID del programa deportivo
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (id) => {
    try {
      const response = await api.delete(`/programas-deportivos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default programasDeportivosService;
