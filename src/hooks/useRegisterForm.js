/**
 * Custom Hook: useRegisterForm
 * Maneja la lógica del formulario de registro
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, facultadesService, programasAcademicosService, estamentosService } from '../services';
import { validateRequiredFields, validateInstitutionalEmail } from '../utils/validators';
import { VALIDATION_MESSAGES } from '../constants';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const toast = useRef(null);

  // Estados del formulario
  const [formData, setFormData] = useState({
    // Datos de autenticación
    correo_elec: '',
    contrasenia: '',
    rol: null,
    facultad_id: null,
    programa_academico_id: null,

    // Datos de persona
    tipo_documento: 'CC',
    numero_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    sexo: 'M',
    orientacion_sexual: '',
    fecha_nacimiento: '',
    domicilio: '',
    celular: ''
  });

  // Estados para datos del servidor
  const [facultades, setFacultades] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [estamentos, setEstamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  /**
   * Cargar datos iniciales (facultades, programas, estamentos)
   */
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoadingData(true);

        // Intentar cargar facultades
        try {
          const facultadesData = await facultadesService.obtenerTodas();
          setFacultades(facultadesData || []);
        } catch (error) {
          console.error('Error cargando facultades:', error);
          setFacultades([]);
        }

        // Intentar cargar programas
        try {
          const programasData = await programasAcademicosService.obtenerTodos();
          setProgramas(programasData || []);
        } catch (error) {
          console.error('Error cargando programas:', error);
          setProgramas([]);
        }

        // Intentar cargar estamentos
        try {
          const estamentosData = await estamentosService.obtenerTodos();
          setEstamentos(estamentosData || []);
        } catch (error) {
          console.error('Error cargando estamentos:', error);
          // Datos por defecto si no se pueden cargar
          setEstamentos([
            { estamento_id: 'ESTUDIANTE', nombre: 'Estudiante' },
            { estamento_id: 'DOCENTE', nombre: 'Docente' },
            { estamento_id: 'ADMINISTRATIVO', nombre: 'Administrativo' },
            { estamento_id: 'EGRESADO', nombre: 'Egresado' }
          ]);
        }

      } catch (error) {
        console.error('Error general cargando datos:', error);
      } finally {
        setLoadingData(false);
      }
    };

    cargarDatos();
  }, []);

  /**
   * Muestra un mensaje toast
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
   * Maneja cambios en los campos del formulario
   */
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Valida los campos del formulario
   */
  const validate = () => {
    const requiredFields = {
      primer_nombre: formData.primer_nombre,
      primer_apellido: formData.primer_apellido,
      rol: formData.rol,
      correo_elec: formData.correo_elec,
      facultad_id: formData.facultad_id,
      tipo_documento: formData.tipo_documento,
      numero_documento: formData.numero_documento,
      sexo: formData.sexo,
      celular: formData.celular,
      domicilio: formData.domicilio,
      contrasenia: formData.contrasenia
    };

    if (!validateRequiredFields(requiredFields)) {
      showToast('error', 'Error', VALIDATION_MESSAGES.REQUIRED_FIELDS);
      return false;
    }

    if (!validateInstitutionalEmail(formData.correo_elec)) {
      showToast('warn', 'Advertencia', VALIDATION_MESSAGES.INVALID_EMAIL_DOMAIN);
      return false;
    }

    if (formData.contrasenia.length < 6) {
      showToast('warn', 'Advertencia', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    return true;
  };

  /**
   * Maneja el submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para el backend según la API
      const userData = {
        estamento_id: formData.rol,
        correo_elec: formData.correo_elec,
        contrasenia: formData.contrasenia,
        datos_persona: {
          tipo_doc: formData.tipo_documento,
          num_doc: formData.numero_documento,
          primer_nombre: formData.primer_nombre,
          segundo_nombre: formData.segundo_nombre || '',
          primer_ape: formData.primer_apellido,
          segundo_ape: formData.segundo_apellido || '',
          sexo: formData.sexo,
          orientacion_sex: formData.orientacion_sexual || '',
          fecha_nacimiento: formData.fecha_nacimiento || '',
          domicilio: formData.domicilio,
          email: formData.correo_elec,
          celular: formData.celular
        },
        facultad_id: formData.facultad_id,
        programa_academico_id: formData.programa_academico_id || null
      };

      console.log('Enviando datos de registro:', userData);

      const response = await authService.register(userData);

      showToast('success', 'Éxito', 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.');

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      const errorMessage = error.message || 'Error al registrar usuario';

      console.error('Error completo:', error);

      if (error.status === 503) {
        showToast('error', 'Error', 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
      } else if (error.status === 409) {
        showToast('error', 'Error', 'El usuario ya existe con ese correo electrónico');
      } else if (error.status === 400) {
        showToast('error', 'Error', 'Datos inválidos. Por favor verifica la información.');
      } else {
        showToast('error', 'Error', 'No se pudo completar el registro. El servicio puede no estar implementado aún.');
      }

    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpia el formulario
   */
  const resetForm = () => {
    setFormData({
      // Datos de autenticación
      correo_elec: '',
      contrasenia: '',
      rol: null,
      facultad_id: null,
      programa_academico_id: null,

      // Datos de persona
      tipo_documento: 'CC',
      numero_documento: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      sexo: 'M',
      orientacion_sexual: '',
      fecha_nacimiento: '',
      domicilio: '',
      celular: ''
    });
  };

  return {
    // Estados
    formData,
    facultades,
    programas,
    estamentos,
    loading,
    loadingData,
    toast,

    // Métodos
    handleChange,
    handleSubmit,
    resetForm,
  };
};
