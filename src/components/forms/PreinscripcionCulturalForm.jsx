import { useState } from "react";
import styles from "./PreinscripcionCulturalForm.module.css";

const PreinscripcionCulturalForm = ({
  onSubmit,
  onCancel,
  programaSeleccionado,
}) => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    programaFk: programaSeleccionado?.id || "",
    nombrePrograma: programaSeleccionado?.nombre || "",
    telefono: "",
    modalidad: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = "El nombre completo es obligatorio";
    }

    if (!formData.tipoIdentificacion) {
      newErrors.tipoIdentificacion = "Seleccione el tipo de identificación";
    }

    if (!formData.numeroIdentificacion.trim()) {
      newErrors.numeroIdentificacion =
        "El número de identificación es obligatorio";
    }

    if (!formData.programaFk) {
      newErrors.programaFk = "Debe seleccionar un programa cultural";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{7,15}$/.test(formData.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "Teléfono inválido (7-15 dígitos)";
    }

    if (!formData.modalidad) {
      newErrors.modalidad = "Seleccione la modalidad";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Preparar datos para envío
    const inscripcionData = {
      programaFk: formData.programaFk,
      estudianteFk: formData.numeroIdentificacion, // Se puede cambiar cuando tengas el ID del estudiante
      estado: "PENDIENTE",
      pasoActual: "pre_inscripcion",
      datosPreinscripcion: {
        nombreCompleto: formData.nombreCompleto,
        tipoIdentificacion: formData.tipoIdentificacion,
        numeroIdentificacion: formData.numeroIdentificacion,
        telefono: formData.telefono,
        modalidad: formData.modalidad,
        email: formData.email,
      },
    };

    onSubmit(inscripcionData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Preinscripción Cultural</h2>
        <p className={styles.formSubtitle}>
          {programaSeleccionado?.nombre ||
            "Complete el formulario para preinscribirse"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Nombre Completo */}
          <div className={styles.formGroupFull}>
            <label htmlFor="nombreCompleto">
              Nombre Completo <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              maxLength={150}
              placeholder="Ingrese su nombre completo"
              className={errors.nombreCompleto ? styles.error : ""}
            />
            {errors.nombreCompleto && (
              <span className={styles.errorMsg}>{errors.nombreCompleto}</span>
            )}
          </div>

          {/* Tipo de Identificación */}
          <div className={styles.formGroup}>
            <label htmlFor="tipoIdentificacion">
              Tipo de Identificación <span className={styles.required}>*</span>
            </label>
            <select
              id="tipoIdentificacion"
              name="tipoIdentificacion"
              value={formData.tipoIdentificacion}
              onChange={handleChange}
              className={errors.tipoIdentificacion ? styles.error : ""}
            >
              <option value="">Seleccione</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PAS">Pasaporte</option>
            </select>
            {errors.tipoIdentificacion && (
              <span className={styles.errorMsg}>
                {errors.tipoIdentificacion}
              </span>
            )}
          </div>

          {/* Número de Identificación */}
          <div className={styles.formGroup}>
            <label htmlFor="numeroIdentificacion">
              Número de Identificación{" "}
              <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="numeroIdentificacion"
              name="numeroIdentificacion"
              value={formData.numeroIdentificacion}
              onChange={handleChange}
              maxLength={20}
              placeholder="Ej: 1234567890"
              className={errors.numeroIdentificacion ? styles.error : ""}
            />
            {errors.numeroIdentificacion && (
              <span className={styles.errorMsg}>
                {errors.numeroIdentificacion}
              </span>
            )}
          </div>

          {/* Programa Cultural */}
          <div className={styles.formGroup}>
            <label htmlFor="nombrePrograma">
              Programa Cultural <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="nombrePrograma"
              name="nombrePrograma"
              value={formData.nombrePrograma}
              disabled
              className={styles.inputDisabled}
            />
          </div>

          {/* Teléfono */}
          <div className={styles.formGroup}>
            <label htmlFor="telefono">
              Teléfono <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              maxLength={15}
              placeholder="Ej: 3001234567"
              className={errors.telefono ? styles.error : ""}
            />
            {errors.telefono && (
              <span className={styles.errorMsg}>{errors.telefono}</span>
            )}
          </div>

          {/* Modalidad */}
          <div className={styles.formGroup}>
            <label htmlFor="modalidad">
              Modalidad <span className={styles.required}>*</span>
            </label>
            <select
              id="modalidad"
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              className={errors.modalidad ? styles.error : ""}
            >
              <option value="">Seleccione</option>
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
              <option value="Mixta">Mixta</option>
            </select>
            {errors.modalidad && (
              <span className={styles.errorMsg}>{errors.modalidad}</span>
            )}
          </div>

          {/* Email */}
          <div className={styles.formGroupFull}>
            <label htmlFor="email">
              Correo Electrónico <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={100}
              placeholder="ejemplo@correo.com"
              className={errors.email ? styles.error : ""}
            />
            {errors.email && (
              <span className={styles.errorMsg}>{errors.email}</span>
            )}
          </div>
        </div>

        {/* Información adicional */}
        <div className={styles.infoBox}>
          <p>
            <strong>Nota:</strong> Esta es la preinscripción inicial. Después de
            enviar este formulario, deberá completar los siguientes pasos:
          </p>
          <ul>
            <li>Hoja de vida</li>
            <li>Valoración médica</li>
            <li>Información familiar</li>
          </ul>
        </div>

        {/* Botones */}
        <div className={styles.formActions}>
          <button type="button" onClick={onCancel} className={styles.btnCancel}>
            Cancelar
          </button>
          <button type="submit" className={styles.btnPrimary}>
            Enviar Preinscripción
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreinscripcionCulturalForm;
