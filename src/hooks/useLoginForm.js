/**
 * Custom Hook: useLoginForm
 * Maneja la lógica del formulario de login
 * Separa la lógica de negocio de la presentación
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, estamentosService } from '../services';
import { validateRequiredFields, validateInstitutionalEmail } from '../utils/validators';
import { VALIDATION_MESSAGES } from '../constants';

export const useLoginForm = () => {
  const navigate = useNavigate();
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
      // Llamar al servicio de autenticación
      const credentials = {
        correo_elec: email,
        contrasenia: password
      };

      console.log('Intentando login con:', credentials);

      const response = await authService.login(credentials);

      console.log('Login exitoso:', response);

      // Verificar que realmente obtuvimos un token
      if (!response || !response.token) {
        console.error('Login sin token:', response);
        showToast('error', 'Error', 'Error en la autenticación. Intenta nuevamente.');
        setLoading(false);
        return;
      }

      showToast('success', 'Éxito', 'Inicio de sesión exitoso. Bienvenido!');

      // Determinar la ruta de redirección según el estamento
      let redirectPath = '/';

      if (response.estamento_id) {
        try {
          // Obtener información del estamento
          const estamento = await estamentosService.obtenerPorId(response.estamento_id);
          console.log('Estamento del usuario:', estamento);

          // Redirigir según el tipo de estamento
          if (estamento && estamento.nombre) {
            const nombreEstamento = estamento.nombre.toLowerCase();

            if (nombreEstamento.includes('administrativo')) {
              redirectPath = '/admin';
            } else if (nombreEstamento.includes('estudiante')) {
              redirectPath = '/student';
            } else if (nombreEstamento.includes('docente')) {
              redirectPath = '/teacher';
            } else if (nombreEstamento.includes('egresado')) {
              redirectPath = '/graduate';
            }
          }
        } catch (estamentoError) {
          console.error('Error al obtener estamento:', estamentoError);
          // Si falla, usar el email como fallback
          if (email.toLowerCase().includes('admin')) {
            redirectPath = '/admin';
          } else if (email.toLowerCase().includes('estudiante')) {
            redirectPath = '/student';
          } else if (email.toLowerCase().includes('docente')) {
            redirectPath = '/teacher';
          } else if (email.toLowerCase().includes('egresado')) {
            redirectPath = '/graduate';
          }
        }
      }

      // Redirigir después de 1 segundo
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);

    } catch (error) {
      console.error('Error completo en login:', error);
      console.error('Error status:', error?.status);
      console.error('Error message:', error?.message);

      // Determinar el tipo de error y mostrar mensaje apropiado
      const errorStatus = error?.status || error?.response?.status;
      const errorMessage = error?.message || error?.response?.data?.detail || 'Error desconocido';

      console.log('Status detectado:', errorStatus);
      console.log('Mensaje de error:', errorMessage);

      if (errorStatus === 503 || !errorStatus) {
        showToast('error', 'Error de Conexión', 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
      } else if (errorStatus === 401) {
        showToast('error', 'Credenciales Incorrectas', 'El correo o la contraseña son incorrectos. Por favor verifica tus datos.');
      } else if (errorStatus === 400) {
        showToast('error', 'Datos Inválidos', 'Por favor verifica que los datos ingresados sean correctos.');
      } else if (errorStatus === 422) {
        showToast('error', 'Error de Validación', 'Los datos ingresados no son válidos.');
      } else {
        showToast('error', 'Error', errorMessage || 'Error al iniciar sesión. Por favor intenta nuevamente.');
      }
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
