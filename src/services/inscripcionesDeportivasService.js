/**
 * Servicio de Inscripciones Deportivas
 * Maneja todas las operaciones CRUD de inscripciones deportivas
 */

import api from "./api";

const inscripcionesDeportivasService = {
  /**
   * Obtener todas las inscripciones deportivas
   * @param {Object} params - Parámetros de consulta
   * @param {number} params.skip - Número de registros a saltar
   * @param {number} params.limit - Límite de registros
   * @param {string} params.programa_deportivo_id - Filtrar por programa deportivo
   * @param {string} params.estado_inscripcion - Filtrar por estado (PENDIENTE, APROBADA, RECHAZADA)
   * @returns {Promise<Array>} - Lista de inscripciones
   */
  obtenerTodas: async (params = {}) => {
    try {
      const response = await api.get("/inscripciones-deportivas", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una inscripción por ID
   * @param {string} inscripcionId - ID de la inscripción
   * @returns {Promise<Object>} - Inscripción encontrada
   */
  obtenerPorId: async (inscripcionId) => {
    try {
      const response = await api.get(
        `/inscripciones-deportivas/${inscripcionId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva inscripción deportiva
   * @param {Object} inscripcionData - Datos de la inscripción
   * @returns {Promise<Object>} - Inscripción creada
   */
  crear: async (inscripcionData) => {
    try {
      const response = await api.post(
        "/inscripciones-deportivas",
        inscripcionData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una inscripción deportiva
   * @param {string} inscripcionId - ID de la inscripción
   * @param {Object} inscripcionData - Datos a actualizar
   * @returns {Promise<Object>} - Inscripción actualizada
   */
  actualizar: async (inscripcionId, inscripcionData) => {
    try {
      const response = await api.put(
        `/inscripciones-deportivas/${inscripcionId}`,
        inscripcionData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cambiar el estado de una inscripción (PENDIENTE, APROBADA, RECHAZADA)
   * @param {string} inscripcionId - ID de la inscripción
   * @param {string} nuevoEstado - Nuevo estado
   * @returns {Promise<Object>} - Inscripción actualizada
   */
  cambiarEstado: async (inscripcionId, nuevoEstado) => {
    try {
      const response = await api.patch(
        `/inscripciones-deportivas/${inscripcionId}/estado`,
        {
          estado_inscripcion: nuevoEstado,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una inscripción deportiva
   * @param {string} inscripcionId - ID de la inscripción
   * @returns {Promise<Object>} - Confirmación de eliminación
   */
  eliminar: async (inscripcionId) => {
    try {
      const response = await api.delete(
        `/inscripciones-deportivas/${inscripcionId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default inscripcionesDeportivasService;
