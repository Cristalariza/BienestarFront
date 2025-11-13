/**
 * Servicio de PQRS (Peticiones, Quejas, Reclamos, Sugerencias)
 * Maneja todas las operaciones CRUD de PQRS
 */

import api from './api';

const pqrsService = {
  /**
   * Crear una nueva PQRS
   * POST /api/v1/pqrs
   */
  crear: async (pqrsData) => {
    try {
      const response = await api.post('/pqrs', pqrsData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las PQRS con paginación
   * GET /api/v1/pqrs
   */
  obtenerTodas: async (params = {}) => {
    try {
      const { skip = 0, limit = 100, only_active = true } = params;
      const response = await api.get('/pqrs', {
        params: { skip, limit, only_active }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una PQRS por ID
   * GET /api/v1/pqrs/{pqrs_id}
   */
  obtenerPorId: async (pqrsId) => {
    try {
      const response = await api.get(`/pqrs/${pqrsId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una PQRS (estado, respuesta, etc.)
   * PUT /api/v1/pqrs/{pqrs_id}
   */
  actualizar: async (pqrsId, data) => {
    try {
      const response = await api.put(`/pqrs/${pqrsId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancelar una PQRS (soft delete)
   * DELETE /api/v1/pqrs/{pqrs_id}
   */
  cancelar: async (pqrsId) => {
    try {
      const response = await api.delete(`/pqrs/${pqrsId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Consultar PQRS por código de radicado
   * POST /api/v1/pqrs/consulta
   */
  consultarPorCodigo: async (additionalProp) => {
    try {
      const response = await api.post('/pqrs/consulta', { additionalProp });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las PQRS de un usuario específico
   * GET /api/v1/usuarios/{usuario_id}/pqrs
   */
  obtenerPorUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/usuarios/${usuarioId}/pqrs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las respuestas de una PQRS
   * GET /api/v1/pqrs/{pqrs_id}/respuestas
   */
  obtenerRespuestas: async (pqrsId) => {
    try {
      const response = await api.get(`/pqrs/${pqrsId}/respuestas`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva respuesta a una PQRS
   * POST /api/v1/pqrs/{pqrs_id}/respuestas
   */
  crearRespuesta: async (pqrsId, respuestaData) => {
    try {
      const response = await api.post(`/pqrs/${pqrsId}/respuestas`, respuestaData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener el seguimiento de cambios de una PQRS
   * GET /api/v1/pqrs/{pqrs_id}/seguimiento
   */
  obtenerSeguimiento: async (pqrsId) => {
    try {
      const response = await api.get(`/pqrs/${pqrsId}/seguimiento`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Buscar PQRS por término en asunto o descripción
   * GET /api/v1/pqrs/buscar/{termino}
   */
  buscar: async (termino) => {
    try {
      const response = await api.get(`/pqrs/buscar/${termino}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener estadísticas generales de PQRS
   * GET /api/v1/pqrs/estadisticas/general
   */
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get('/pqrs/estadisticas/general');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los tipos de PQRS disponibles
   * GET /api/v1/pqrs/enums/tipos
   */
  obtenerTipos: async () => {
    try {
      const response = await api.get('/pqrs/enums/tipos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todos los estados de PQRS disponibles
   * GET /api/v1/pqrs/enums/estados
   */
  obtenerEstados: async () => {
    try {
      const response = await api.get('/pqrs/enums/estados');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener todas las categorías de PQRS disponibles
   * GET /api/v1/pqrs/enums/categorias
   */
  obtenerCategorias: async () => {
    try {
      const response = await api.get('/pqrs/enums/categorias');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Métodos de compatibilidad con código anterior
  actualizarEstado: async (pqrsId, data) => {
    return pqrsService.actualizar(pqrsId, data);
  },

  eliminar: async (pqrsId) => {
    return pqrsService.cancelar(pqrsId);
  }
};

export default pqrsService;
