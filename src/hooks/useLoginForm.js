/**
 * Custom Hook: useLoginForm
 * Maneja la lógica del formulario de login
 * Separa la lógica de negocio de la presentación
 */

import { useState, useRef } from 'react';
import { validateRequiredFields, validateInstitutionalEmail } from '../utils/validators';
import { VALIDATION_MESSAGES } from '../constants';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  /**
   * Muestra un mensaje toast
   * @param {string} severity - Tipo de mensaje (success, error, warn, info)
   * @param {string} summary - Título del mensaje
   * @param {string} detail - Detalle del mensaje
   */
  const showToast = (severity, summary, detail) => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
        life: 3000
      });
    }
  };

  /**
   * Valida los campos del formulario
   * @returns {boolean} true si la validación es exitosa
   */
  const validate = () => {
    const fields = { email, password };

    if (!validateRequiredFields(fields)) {
      showToast('error', 'Error', VALIDATION_MESSAGES.REQUIRED_FIELDS);
      return false;
    }

    if (!validateInstitutionalEmail(email)) {
      showToast('warn', 'Advertencia', VALIDATION_MESSAGES.INVALID_EMAIL_DOMAIN);
      return false;
    }

    return true;
  };

  /**
   * Maneja el submit del formulario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Aquí iría la lógica de autenticación
      // Por ahora solo simulamos un delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      showToast('success', 'Éxito', VALIDATION_MESSAGES.LOGIN_SUCCESS);

      // TODO: Redirigir al dashboard o home
      console.log('Login exitoso:', { email });

    } catch (error) {
      showToast('error', 'Error', VALIDATION_MESSAGES.LOGIN_ERROR);
      console.error('Error en login:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpia el formulario
   */
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return {
    // Estados
    email,
    password,
    loading,
    toast,

    // Setters
    setEmail,
    setPassword,

    // Métodos
    handleSubmit,
    resetForm,
  };
};
