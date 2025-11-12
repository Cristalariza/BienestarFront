import api from "./api";

const facultadesService = {
  /**
   * Obtener todas las facultades
   * @returns {Promise<Array>} - Lista de facultades
   */
  obtenerTodas: async () => {
    try {
      const response = await api.get("/facultades/");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una facultad por ID
   * @param {string} facultadId - ID de la facultad
   * @returns {Promise<Object>} - Facultad encontrada
   */
  obtenerPorId: async (facultadId) => {
    try {
      const response = await api.get(`/facultades/${facultadId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva facultad
   * @param {Object} facultadData - Datos de la facultad
   * @param {string} facultadData.nombre - Nombre de la facultad
   * @param {string} facultadData.codigo - Código de la facultad
   * @param {string} facultadData.decano - Nombre del decano
   * @returns {Promise<Object>} - Facultad creada
   */
  crear: async (facultadData) => {
    try {
      const response = await api.post("/facultades", facultadData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default facultadesService;
