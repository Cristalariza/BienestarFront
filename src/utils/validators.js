/**
 * Utilidades de validación
 * Funciones puras para validar datos del formulario
 */

import { UNIVERSITY_INFO } from '../constants';

/**
 * Valida si todos los campos requeridos están completos
 * @param {Object} fields - Objeto con los campos a validar
 * @returns {boolean} true si todos los campos tienen valor
 */
export const validateRequiredFields = (fields) => {
  return Object.values(fields).every(field => field && field.trim() !== '');
};

/**
 * Valida si el email pertenece al dominio institucional
 * @param {string} email - Email a validar
 * @returns {boolean} true si el email es del dominio institucional
 */
export const validateInstitutionalEmail = (email) => {
  if (!email) return false;
  return email.toLowerCase().endsWith(UNIVERSITY_INFO.emailDomain);
};

/**
 * Valida formato básico de email
 * @param {string} email - Email a validar
 * @returns {boolean} true si el formato es válido
 */
export const validateEmailFormat = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
