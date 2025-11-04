/**
 * Configuración base de Axios para la API
 * Incluye interceptores para manejar tokens y errores
 */

import axios from 'axios';

// URL base de la API - se puede configurar según el entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const status = error.response.status;
      const message = error.response.data?.detail || error.response.data?.message || 'Error en la petición';

      switch (status) {
        case 401:
          // No autenticado
          // Solo limpiar token y redirigir si NO estamos en login o registro
          const currentHash = window.location.hash;
          if (currentHash !== '#/login' && currentHash !== '#/registro') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/#/login';
          }
          // Si estamos en login, no limpiamos nada - solo lanzamos el error
          break;
        case 403:
          console.error('Sin permisos para realizar esta acción');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 409:
          console.error('Conflicto - el recurso ya existe');
          break;
        case 410:
          console.error('Usuario desactivado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error(message);
      }

      return Promise.reject({
        status,
        message,
        data: error.response.data
      });
    } else if (error.request) {
      // La petición se hizo pero no se recibió respuesta
      console.error('No se pudo conectar con el servidor');
      return Promise.reject({
        status: 503,
        message: 'No se pudo conectar con el servidor',
        data: null
      });
    } else {
      // Algo sucedió al configurar la petición
      console.error('Error al configurar la petición:', error.message);
      return Promise.reject({
        status: 0,
        message: error.message,
        data: null
      });
    }
  }
);

export default api;
