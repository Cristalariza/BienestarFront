/**
 * Servicio de Programas Académicos
 * Maneja todas las operaciones de programas académicos
 */

import api from "./api";

const programasAcademicosService = {
  /**
   * Obtener todos los programas académicos
   * @returns {Promise<Array>} - Lista de programas académicos
   */
  obtenerTodos: async () => {
    try {
      const response = await api.get("/programas/");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener un programa académico por ID
   * @param {string} programaId - ID del programa académico
   * @returns {Promise<Object>} - Programa académico encontrado
   */
  obtenerPorId: async (programaId) => {
    try {
      const response = await api.get(`/programas/${programaId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear un nuevo programa académico
   * @param {Object} programaData - Datos del programa académico
   * @param {string} programaData.nombre - Nombre del programa
   * @param {string} programaData.codigo - Código del programa
   * @param {string} programaData.facultad_id - ID de la facultad
   * @param {number} programaData.duracion_semestres - Duración en semestres
   * @returns {Promise<Object>} - Programa académico creado
   */
  crear: async (programaData) => {
    try {
      const response = await api.post("/programas", programaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default programasAcademicosService;
