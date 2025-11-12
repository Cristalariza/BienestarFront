/**
 * Servicio de Autenticación
 * Maneja login y registro de usuarios
 */

import api from "./api";
import personasService from "./personasService";

const authService = {
  /**
   * Login de usuario
   * @param {Object} credentials - Credenciales de acceso
   * @param {string} credentials.correo_elec - Correo electrónico del usuario
   * @param {string} credentials.contrasenia - Contraseña del usuario
   * @returns {Promise<Object>} - Datos del usuario y token
   */
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, persona_id, ...userData } = response.data;

      // Guardar token en localStorage
      if (token) {
        localStorage.setItem("token", token);
      }

      // Si hay persona_id, obtener los datos completos de la persona
      if (persona_id) {
        try {
          const personaData = await personasService.obtenerPorId(persona_id);

          // Combinar datos del usuario con datos de la persona
          const fullUserData = {
            ...userData,
            persona_id,
            primer_nombre: personaData.primer_nombre,
            segundo_nombre: personaData.segundo_nombre,
            primer_apellido: personaData.primer_ape,
            segundo_apellido: personaData.segundo_ape,
            nombre_completo: `${personaData.primer_nombre} ${personaData.primer_ape}`,
            email: personaData.email,
            celular: personaData.celular,
            domicilio: personaData.domicilio,
            tipo_documento: personaData.tipo_doc,
            numero_documento: personaData.num_doc,
            sexo: personaData.sexo,
            fecha_nacimiento: personaData.fecha_nacimiento,
          };

          localStorage.setItem("user", JSON.stringify(fullUserData));

          return {
            token,
            ...fullUserData,
          };
        } catch (personaError) {
          console.error("Error al obtener datos de la persona:", personaError);
          // Si falla, guardar solo los datos básicos
          const basicUserData = { ...userData, persona_id };
          localStorage.setItem("user", JSON.stringify(basicUserData));
          return response.data;
        }
      } else {
        // Si no hay persona_id, guardar solo los datos básicos
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Registro de nuevo usuario
   * @param {Object} userData - Datos del nuevo usuario
   * @param {string} userData.estamento_id - ID del estamento (DOCENTE, ESTUDIANTE, etc.)
   * @param {string} userData.correo_elec - Correo electrónico institucional
   * @param {string} userData.contrasenia - Contraseña
   * @param {Object} userData.datos_persona - Información personal
   * @param {string} userData.datos_persona.nombre - Nombre
   * @param {string} userData.datos_persona.apellido - Apellido
   * @param {string} userData.datos_persona.tipo_documento - Tipo de documento (CC, TI, etc.)
   * @param {string} userData.datos_persona.numero_documento - Número de documento
   * @param {string} userData.datos_persona.telefono - Teléfono
   * @param {string} userData.datos_persona.fecha_nacimiento - Fecha de nacimiento (YYYY-MM-DD)
   * @param {string} userData.facultad_id - ID de la facultad
   * @param {string} userData.programa_academico_id - ID del programa académico
   * @returns {Promise<Object>} - Confirmación de registro
   */
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cierra la sesión del usuario
   */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  /**
   * Obtiene el usuario actual desde localStorage
   * @returns {Object|null} - Datos del usuario o null si no hay sesión
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error("Error al parsear datos del usuario:", error);
        return null;
      }
    }
    return null;
  },

  /**
   * Verifica si hay un usuario autenticado
   * @returns {boolean} - True si hay sesión activa
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Obtiene el token actual
   * @returns {string|null} - Token JWT o null
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Obtiene el perfil del usuario desde localStorage
   * @returns {Promise<Object>} - Datos del usuario
   */
  getProfile: async () => {
    try {
      // Obtener datos del usuario de localStorage
      const user = authService.getCurrentUser();

      if (!user) {
        throw new Error("No hay usuario autenticado");
      }

      return user;
    } catch (error) {
      console.error("Error al obtener perfil del usuario:", error);
      throw error;
    }
  },
};

export default authService;
