import { useState, useEffect } from "react";
import styles from "./InscripcionDeportivaForm.module.css";

const InscripcionDeportivaForm = ({
  programaSeleccionado,
  onSubmit,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    // INSCRIPCIÓN PROGRAMA DEPORTIVO
    programaDeportivoFk: "",
    estadoInscripcion: "PENDIENTE",
    valoracionMedicaAprobada: false,
    fechaValoracionMedica: "",
    observacionesInscripcion: "",

    // INFORMACIÓN PERSONAL
    nombreCompleto: "",
    tipoIdentificacion: "",
    numeroIdentificacion: "",
    sexo: "",
    fechaNacimiento: "",
    lugarNacimiento: "",
    estadoCivil: "",
    direccion: "",
    direccion_tipo: "",
    direccion_numero1: "",
    direccion_numero2: "",
    direccion_numero3: "",
    barrio: "",
    celular: "",
    email: "",
    foto: "",
    firma: "",

    // INFORMACIÓN ACADÉMICA
    colegioEgresado: "",
    jornadaColegio: "",
    añoEgreso: "",
    carrera: "",
    jornadaUniversitaria: "",
    semestre: "",
    promedio: "",
    permanencia: "",
    otrosEstudios: "",

    // DATOS GENERALES
    nivelDeportivo: "",
    torneosParticipados: "",
    clubPertenece: "",
    peso: "",
    estatura: "",
    enfermedades: "",
    eps: "",
    rh: "",
    trabaja: false,
    lugarTrabajo: "",
    cargo: "",

    // INFORMACIÓN FAMILIAR
    nombreMadre: "",
    direccionMadre: "",
    direccionMadre_tipo: "",
    direccionMadre_numero1: "",
    direccionMadre_numero2: "",
    direccionMadre_numero3: "",
    ciudadMadre: "",
    celularMadre: "",
    ocupacionMadre: "",
    nombrePadre: "",
    direccionPadre: "",
    direccionPadre_tipo: "",
    direccionPadre_numero1: "",
    direccionPadre_numero2: "",
    direccionPadre_numero3: "",
    ciudadPadre: "",
    celularPadre: "",
    ocupacionPadre: "",
    observacionesFamiliares: "",

    // VALORACIÓN MÉDICA
    fechaValoracion: "",
    profesionalMedico: "",
    observacionesMedicas: "",
    estadoValoracion: "PENDIENTE",

    // INFORMACIÓN IMPORTANTE
    nombreFirmante: "",
    firmaDigital: "",
    fechaFirma: "",
  });

  const [errors, setErrors] = useState({});

  // Efecto para pre-llenar el programa seleccionado
  useEffect(() => {
    if (programaSeleccionado) {
      setFormData((prev) => ({
        ...prev,
        programaDeportivoFk: programaSeleccionado.title || "",
      }));
    }
  }, [programaSeleccionado]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Construir dirección personal completa
      if (name.startsWith("direccion_") || name === "direccion_tipo") {
        const tipo = name === "direccion_tipo" ? value : prev.direccion_tipo;
        const num1 =
          name === "direccion_numero1" ? value : prev.direccion_numero1;
        const num2 =
          name === "direccion_numero2" ? value : prev.direccion_numero2;
        const num3 =
          name === "direccion_numero3" ? value : prev.direccion_numero3;

        if (tipo && num1 && num2 && num3) {
          updated.direccion = `${tipo} ${num1} #${num2}-${num3}`;
        }
      }

      // Construir dirección de la madre completa
      if (name.startsWith("direccionMadre_")) {
        const tipo =
          name === "direccionMadre_tipo" ? value : prev.direccionMadre_tipo;
        const num1 =
          name === "direccionMadre_numero1"
            ? value
            : prev.direccionMadre_numero1;
        const num2 =
          name === "direccionMadre_numero2"
            ? value
            : prev.direccionMadre_numero2;
        const num3 =
          name === "direccionMadre_numero3"
            ? value
            : prev.direccionMadre_numero3;

        if (tipo && num1 && num2 && num3) {
          updated.direccionMadre = `${tipo} ${num1} #${num2}-${num3}`;
        }
      }

      // Construir dirección del padre completa
      if (name.startsWith("direccionPadre_")) {
        const tipo =
          name === "direccionPadre_tipo" ? value : prev.direccionPadre_tipo;
        const num1 =
          name === "direccionPadre_numero1"
            ? value
            : prev.direccionPadre_numero1;
        const num2 =
          name === "direccionPadre_numero2"
            ? value
            : prev.direccionPadre_numero2;
        const num3 =
          name === "direccionPadre_numero3"
            ? value
            : prev.direccionPadre_numero3;

        if (tipo && num1 && num2 && num3) {
          updated.direccionPadre = `${tipo} ${num1} #${num2}-${num3}`;
        }
      }

      return updated;
    });

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Información del Programa
        if (!formData.programaDeportivoFk)
          newErrors.programaDeportivoFk = "Seleccione un programa deportivo";
        break;

      case 2: // Información Personal
        if (!formData.nombreCompleto)
          newErrors.nombreCompleto = "El nombre completo es obligatorio";
        if (!formData.tipoIdentificacion)
          newErrors.tipoIdentificacion = "Seleccione el tipo de identificación";
        if (!formData.numeroIdentificacion)
          newErrors.numeroIdentificacion =
            "El número de identificación es obligatorio";
        if (!formData.sexo) newErrors.sexo = "Seleccione el sexo";
        if (!formData.fechaNacimiento)
          newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
        if (!formData.lugarNacimiento)
          newErrors.lugarNacimiento = "El lugar de nacimiento es obligatorio";
        if (!formData.estadoCivil)
          newErrors.estadoCivil = "Seleccione el estado civil";
        if (
          !formData.direccion_tipo ||
          !formData.direccion_numero1 ||
          !formData.direccion_numero2 ||
          !formData.direccion_numero3
        )
          newErrors.direccion = "Complete todos los campos de la dirección";
        if (!formData.barrio) newErrors.barrio = "El barrio es obligatorio";
        if (!formData.celular) newErrors.celular = "El celular es obligatorio";
        if (!formData.email) newErrors.email = "El email es obligatorio";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = "Email inválido";
        break;

      case 3: // Información Académica
        if (!formData.colegioEgresado)
          newErrors.colegioEgresado = "El colegio de egreso es obligatorio";
        if (!formData.jornadaColegio)
          newErrors.jornadaColegio = "Seleccione la jornada del colegio";
        if (!formData.añoEgreso)
          newErrors.añoEgreso = "El año de egreso es obligatorio";
        if (!formData.carrera) newErrors.carrera = "La carrera es obligatoria";
        if (!formData.jornadaUniversitaria)
          newErrors.jornadaUniversitaria =
            "Seleccione la jornada universitaria";
        if (!formData.semestre)
          newErrors.semestre = "El semestre es obligatorio";
        if (!formData.promedio)
          newErrors.promedio = "El promedio es obligatorio";
        if (!formData.permanencia)
          newErrors.permanencia = "La permanencia es obligatoria";
        break;

      case 4: // Datos Generales
        if (!formData.nivelDeportivo)
          newErrors.nivelDeportivo = "Seleccione el nivel deportivo";
        break;

      case 5: // Información Familiar
        if (!formData.nombreMadre)
          newErrors.nombreMadre = "El nombre de la madre es obligatorio";
        if (
          !formData.direccionMadre_tipo ||
          !formData.direccionMadre_numero1 ||
          !formData.direccionMadre_numero2 ||
          !formData.direccionMadre_numero3
        )
          newErrors.direccionMadre =
            "Complete todos los campos de la dirección";
        if (!formData.ciudadMadre)
          newErrors.ciudadMadre = "La ciudad de la madre es obligatoria";
        if (!formData.celularMadre)
          newErrors.celularMadre = "El celular de la madre es obligatorio";
        if (!formData.ocupacionMadre)
          newErrors.ocupacionMadre = "La ocupación de la madre es obligatoria";
        if (!formData.nombrePadre)
          newErrors.nombrePadre = "El nombre del padre es obligatorio";
        if (
          !formData.direccionPadre_tipo ||
          !formData.direccionPadre_numero1 ||
          !formData.direccionPadre_numero2 ||
          !formData.direccionPadre_numero3
        )
          newErrors.direccionPadre =
            "Complete todos los campos de la dirección";
        if (!formData.ciudadPadre)
          newErrors.ciudadPadre = "La ciudad del padre es obligatoria";
        if (!formData.celularPadre)
          newErrors.celularPadre = "El celular del padre es obligatorio";
        if (!formData.ocupacionPadre)
          newErrors.ocupacionPadre = "La ocupación del padre es obligatoria";
        break;

      case 6: // Valoración Médica
        if (!formData.fechaValoracion)
          newErrors.fechaValoracion = "La fecha de valoración es obligatoria";
        if (!formData.profesionalMedico)
          newErrors.profesionalMedico = "El profesional médico es obligatorio";
        break;

      case 7: // Información Importante
        if (!formData.nombreFirmante)
          newErrors.nombreFirmante = "El nombre del firmante es obligatorio";
        if (!formData.fechaFirma)
          newErrors.fechaFirma = "La fecha de firma es obligatoria";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className={styles.stepIndicator}>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`${styles.stepDot} ${
              step === currentStep ? styles.active : ""
            } ${step < currentStep ? styles.completed : ""}`}
          >
            <span>{step}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderStep1 = () => (
    <div className={styles.stepContent}>
      <h2>Información del Programa Deportivo</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="programaDeportivoFk">
            Programa Deportivo <span className={styles.required}>*</span>
          </label>
          <select
            id="programaDeportivoFk"
            name="programaDeportivoFk"
            value={formData.programaDeportivoFk}
            onChange={handleChange}
            className={errors.programaDeportivoFk ? styles.error : ""}
          >
            <option value="">Seleccione un programa</option>
            <option value="futbol">Fútbol</option>
            <option value="voleibol">Voleibol</option>
            <option value="baloncesto">Baloncesto</option>
            <option value="natacion">Natación</option>
            <option value="atletismo">Atletismo</option>
          </select>
          {errors.programaDeportivoFk && (
            <span className={styles.errorMsg}>
              {errors.programaDeportivoFk}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="estadoInscripcion">Estado de Inscripción</label>
          <input
            type="text"
            id="estadoInscripcion"
            name="estadoInscripcion"
            value={formData.estadoInscripcion}
            disabled
          />
        </div>

        <div className={styles.formGroupFull}>
          <label htmlFor="observacionesInscripcion">Observaciones</label>
          <textarea
            id="observacionesInscripcion"
            name="observacionesInscripcion"
            value={formData.observacionesInscripcion}
            onChange={handleChange}
            maxLength={500}
            rows={4}
            placeholder="Ingrese observaciones adicionales (opcional)"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.stepContent}>
      <h2>Información Personal</h2>
      <div className={styles.formGrid}>
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
            className={errors.nombreCompleto ? styles.error : ""}
          />
          {errors.nombreCompleto && (
            <span className={styles.errorMsg}>{errors.nombreCompleto}</span>
          )}
        </div>

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
            <option value="PEP">PEP</option>
            <option value="RC">Registro Civil</option>
          </select>
          {errors.tipoIdentificacion && (
            <span className={styles.errorMsg}>{errors.tipoIdentificacion}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numeroIdentificacion">
            Número de Identificación <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="numeroIdentificacion"
            name="numeroIdentificacion"
            value={formData.numeroIdentificacion}
            onChange={handleChange}
            maxLength={20}
            className={errors.numeroIdentificacion ? styles.error : ""}
          />
          {errors.numeroIdentificacion && (
            <span className={styles.errorMsg}>
              {errors.numeroIdentificacion}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sexo">
            Sexo <span className={styles.required}>*</span>
          </label>
          <select
            id="sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className={errors.sexo ? styles.error : ""}
          >
            <option value="">Seleccione</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          {errors.sexo && (
            <span className={styles.errorMsg}>{errors.sexo}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fechaNacimiento">
            Fecha de Nacimiento <span className={styles.required}>*</span>
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className={errors.fechaNacimiento ? styles.error : ""}
          />
          {errors.fechaNacimiento && (
            <span className={styles.errorMsg}>{errors.fechaNacimiento}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lugarNacimiento">
            Lugar de Nacimiento <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="lugarNacimiento"
            name="lugarNacimiento"
            value={formData.lugarNacimiento}
            onChange={handleChange}
            maxLength={100}
            className={errors.lugarNacimiento ? styles.error : ""}
          />
          {errors.lugarNacimiento && (
            <span className={styles.errorMsg}>{errors.lugarNacimiento}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="estadoCivil">
            Estado Civil <span className={styles.required}>*</span>
          </label>
          <select
            id="estadoCivil"
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleChange}
            className={errors.estadoCivil ? styles.error : ""}
          >
            <option value="">Seleccione</option>
            <option value="Soltero/a">Soltero/a</option>
            <option value="Casado/a">Casado/a</option>
            <option value="Unión Libre">Unión Libre</option>
            <option value="Viudo/a">Viudo/a</option>
          </select>
          {errors.estadoCivil && (
            <span className={styles.errorMsg}>{errors.estadoCivil}</span>
          )}
        </div>

        <div className={styles.formGroupFull}>
          <label>
            Dirección <span className={styles.required}>*</span>
          </label>
          <div className={styles.addressGrid}>
            <select
              name="direccion_tipo"
              value={formData.direccion_tipo || ""}
              onChange={handleChange}
              className={errors.direccion ? styles.error : ""}
            >
              <option value="">Tipo de vía</option>
              <option value="Calle">Calle</option>
              <option value="Carr.">Carrera</option>
              <option value="Diag.">Diagonal</option>
              <option value="Transv.">Transversal</option>
              <option value="Av.">Avenida</option>
            </select>
            <input
              type="text"
              name="direccion_numero1"
              value={formData.direccion_numero1 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccion ? styles.error : ""}
            />
            <span className={styles.addressSeparator}>#</span>
            <input
              type="text"
              name="direccion_numero2"
              value={formData.direccion_numero2 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccion ? styles.error : ""}
            />
            <span className={styles.addressSeparator}>-</span>
            <input
              type="text"
              name="direccion_numero3"
              value={formData.direccion_numero3 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccion ? styles.error : ""}
            />
          </div>
          {errors.direccion && (
            <span className={styles.errorMsg}>{errors.direccion}</span>
          )}
          <small className={styles.helperText}>Ejemplo: Carr. 7 #40-62</small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="barrio">
            Barrio <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="barrio"
            name="barrio"
            value={formData.barrio}
            onChange={handleChange}
            maxLength={100}
            className={errors.barrio ? styles.error : ""}
          />
          {errors.barrio && (
            <span className={styles.errorMsg}>{errors.barrio}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="celular">
            Celular <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            maxLength={15}
            className={errors.celular ? styles.error : ""}
          />
          {errors.celular && (
            <span className={styles.errorMsg}>{errors.celular}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
            className={errors.email ? styles.error : ""}
          />
          {errors.email && (
            <span className={styles.errorMsg}>{errors.email}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.stepContent}>
      <h2>Información Académica</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroupFull}>
          <label htmlFor="colegioEgresado">
            Colegio de Egreso <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="colegioEgresado"
            name="colegioEgresado"
            value={formData.colegioEgresado}
            onChange={handleChange}
            maxLength={150}
            className={errors.colegioEgresado ? styles.error : ""}
          />
          {errors.colegioEgresado && (
            <span className={styles.errorMsg}>{errors.colegioEgresado}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="jornadaColegio">
            Jornada del Colegio <span className={styles.required}>*</span>
          </label>
          <select
            id="jornadaColegio"
            name="jornadaColegio"
            value={formData.jornadaColegio}
            onChange={handleChange}
            className={errors.jornadaColegio ? styles.error : ""}
          >
            <option value="">Seleccione</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Nocturna">Nocturna</option>
            <option value="Completa">Completa</option>
            <option value="Única">Única</option>
          </select>
          {errors.jornadaColegio && (
            <span className={styles.errorMsg}>{errors.jornadaColegio}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="añoEgreso">
            Año de Egreso <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            id="añoEgreso"
            name="añoEgreso"
            value={formData.añoEgreso}
            onChange={handleChange}
            min="1950"
            max={new Date().getFullYear()}
            className={errors.añoEgreso ? styles.error : ""}
          />
          {errors.añoEgreso && (
            <span className={styles.errorMsg}>{errors.añoEgreso}</span>
          )}
        </div>

        <div className={styles.formGroupFull}>
          <label htmlFor="carrera">
            Carrera Universitaria <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="carrera"
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
            maxLength={150}
            className={errors.carrera ? styles.error : ""}
          />
          {errors.carrera && (
            <span className={styles.errorMsg}>{errors.carrera}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="jornadaUniversitaria">
            Jornada Universitaria <span className={styles.required}>*</span>
          </label>
          <select
            id="jornadaUniversitaria"
            name="jornadaUniversitaria"
            value={formData.jornadaUniversitaria}
            onChange={handleChange}
            className={errors.jornadaUniversitaria ? styles.error : ""}
          >
            <option value="">Seleccione</option>
            <option value="Diurna">Diurna</option>
            <option value="Nocturna">Nocturna</option>
            <option value="Fin de Semana">Fin de Semana</option>
            <option value="Virtual">Virtual</option>
          </select>
          {errors.jornadaUniversitaria && (
            <span className={styles.errorMsg}>
              {errors.jornadaUniversitaria}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="semestre">
            Semestre Actual <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            id="semestre"
            name="semestre"
            value={formData.semestre}
            onChange={handleChange}
            min="1"
            max="12"
            className={errors.semestre ? styles.error : ""}
          />
          {errors.semestre && (
            <span className={styles.errorMsg}>{errors.semestre}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="promedio">
            Promedio Académico <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            id="promedio"
            name="promedio"
            value={formData.promedio}
            onChange={handleChange}
            step="0.01"
            min="0"
            max="5"
            className={errors.promedio ? styles.error : ""}
          />
          {errors.promedio && (
            <span className={styles.errorMsg}>{errors.promedio}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="permanencia">
            Permanencia <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="permanencia"
            name="permanencia"
            value={formData.permanencia}
            onChange={handleChange}
            maxLength={100}
            placeholder="Ej: Regular - 5 semestres"
            className={errors.permanencia ? styles.error : ""}
          />
          {errors.permanencia && (
            <span className={styles.errorMsg}>{errors.permanencia}</span>
          )}
        </div>

        <div className={styles.formGroupFull}>
          <label htmlFor="otrosEstudios">Otros Estudios</label>
          <textarea
            id="otrosEstudios"
            name="otrosEstudios"
            value={formData.otrosEstudios}
            onChange={handleChange}
            maxLength={300}
            rows={3}
            placeholder="Cursos, diplomados, certificaciones (opcional)"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className={styles.stepContent}>
      <h2>Datos Generales - Deportivos</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="nivelDeportivo">
            Nivel Deportivo <span className={styles.required}>*</span>
          </label>
          <select
            id="nivelDeportivo"
            name="nivelDeportivo"
            value={formData.nivelDeportivo}
            onChange={handleChange}
            className={errors.nivelDeportivo ? styles.error : ""}
          >
            <option value="">Seleccione</option>
            <option value="ninguno">Ninguno</option>
            <option value="recreativo">Recreativo</option>
            <option value="competitivo">Competitivo</option>
          </select>
          {errors.nivelDeportivo && (
            <span className={styles.errorMsg}>{errors.nivelDeportivo}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="clubPertenece">Club Deportivo</label>
          <input
            type="text"
            id="clubPertenece"
            name="clubPertenece"
            value={formData.clubPertenece}
            onChange={handleChange}
            maxLength={100}
            placeholder="Ej: Club Deportivo UPC"
          />
        </div>

        <div className={styles.formGroupFull}>
          <label htmlFor="torneosParticipados">Torneos Participados</label>
          <textarea
            id="torneosParticipados"
            name="torneosParticipados"
            value={formData.torneosParticipados}
            onChange={handleChange}
            maxLength={500}
            rows={3}
            placeholder="Liste los torneos en los que ha participado (opcional)"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="peso">Peso (kg)</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            step="0.1"
            min="0"
            placeholder="75.5"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="estatura">Estatura (m)</label>
          <input
            type="number"
            id="estatura"
            name="estatura"
            value={formData.estatura}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="1.75"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rh">Tipo de Sangre (RH)</label>
          <select id="rh" name="rh" value={formData.rh} onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="eps">EPS</label>
          <select
            id="eps"
            name="eps"
            value={formData.eps}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="famisanar">Famisanar</option>
            <option value="colsanitas">Colsanitas</option>
            <option value="nuevaeps">Nueva EPS</option>
            <option value="sanidad">Sanidad</option>
          </select>
        </div>

        <div className={styles.formGroupFull}>
          <label htmlFor="enfermedades">
            Enfermedades o Condiciones Médicas
          </label>
          <textarea
            id="enfermedades"
            name="enfermedades"
            value={formData.enfermedades}
            onChange={handleChange}
            maxLength={500}
            rows={3}
            placeholder="Describa cualquier enfermedad o condición médica relevante (opcional)"
          />
        </div>

        <div className={styles.formGroupFull}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="trabaja"
              checked={formData.trabaja}
              onChange={handleChange}
            />
            <span>¿Trabaja actualmente?</span>
          </label>
        </div>

        {formData.trabaja && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="lugarTrabajo">Lugar de Trabajo</label>
              <input
                type="text"
                id="lugarTrabajo"
                name="lugarTrabajo"
                value={formData.lugarTrabajo}
                onChange={handleChange}
                maxLength={150}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cargo">Cargo</label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                maxLength={100}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className={styles.stepContent}>
      <h2>Información Familiar</h2>

      <h3 className={styles.sectionTitle}>Información de la Madre</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroupFull}>
          <label htmlFor="nombreMadre">
            Nombre Completo <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="nombreMadre"
            name="nombreMadre"
            value={formData.nombreMadre}
            onChange={handleChange}
            maxLength={150}
            className={errors.nombreMadre ? styles.error : ""}
          />
          {errors.nombreMadre && (
            <span className={styles.errorMsg}>{errors.nombreMadre}</span>
          )}
        </div>

        <div className={styles.formGroupFull}>
          <label>
            Dirección <span className={styles.required}>*</span>
          </label>
          <div className={styles.addressGrid}>
            <select
              name="direccionMadre_tipo"
              value={formData.direccionMadre_tipo || ""}
              onChange={handleChange}
              className={errors.direccionMadre ? styles.error : ""}
            >
              <option value="">Tipo de vía</option>
              <option value="Calle">Calle</option>
              <option value="Carr.">Carrera</option>
              <option value="Diag.">Diagonal</option>
              <option value="Transv.">Transversal</option>
              <option value="Av.">Avenida</option>
            </select>
            <input
              type="text"
              name="direccionMadre_numero1"
              value={formData.direccionMadre_numero1 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccionMadre ? styles.error : ""}
            />
            <span className={styles.addressSeparator}>#</span>
            <input
              type="text"
              name="direccionMadre_numero2"
              value={formData.direccionMadre_numero2 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccionMadre ? styles.error : ""}
            />
            <span className={styles.addressSeparator}>-</span>
            <input
              type="text"
              name="direccionMadre_numero3"
              value={formData.direccionMadre_numero3 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccionMadre ? styles.error : ""}
            />
          </div>
          {errors.direccionMadre && (
            <span className={styles.errorMsg}>{errors.direccionMadre}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ciudadMadre">
            Ciudad <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="ciudadMadre"
            name="ciudadMadre"
            value={formData.ciudadMadre}
            onChange={handleChange}
            maxLength={100}
            className={errors.ciudadMadre ? styles.error : ""}
          />
          {errors.ciudadMadre && (
            <span className={styles.errorMsg}>{errors.ciudadMadre}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="celularMadre">
            Celular <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="celularMadre"
            name="celularMadre"
            value={formData.celularMadre}
            onChange={handleChange}
            maxLength={15}
            className={errors.celularMadre ? styles.error : ""}
          />
          {errors.celularMadre && (
            <span className={styles.errorMsg}>{errors.celularMadre}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ocupacionMadre">
            Ocupación <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="ocupacionMadre"
            name="ocupacionMadre"
            value={formData.ocupacionMadre}
            onChange={handleChange}
            maxLength={100}
            className={errors.ocupacionMadre ? styles.error : ""}
          />
          {errors.ocupacionMadre && (
            <span className={styles.errorMsg}>{errors.ocupacionMadre}</span>
          )}
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Información del Padre</h3>
      <div className={styles.formGrid}>
        <div className={styles.formGroupFull}>
          <label htmlFor="nombrePadre">
            Nombre Completo <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="nombrePadre"
            name="nombrePadre"
            value={formData.nombrePadre}
            onChange={handleChange}
            maxLength={150}
            className={errors.nombrePadre ? styles.error : ""}
          />
          {errors.nombrePadre && (
            <span className={styles.errorMsg}>{errors.nombrePadre}</span>
          )}
        </div>

        <div className={styles.formGroupFull}>
          <label>
            Dirección <span className={styles.required}>*</span>
          </label>
          <div className={styles.addressGrid}>
            <select
              name="direccionPadre_tipo"
              value={formData.direccionPadre_tipo || ""}
              onChange={handleChange}
              className={errors.direccionPadre ? styles.error : ""}
            >
              <option value="">Tipo de vía</option>
              <option value="Calle">Calle</option>
              <option value="Carr.">Carrera</option>
              <option value="Diag.">Diagonal</option>
              <option value="Transv.">Transversal</option>
              <option value="Av.">Avenida</option>
            </select>
            <input
              type="text"
              name="direccionPadre_numero1"
              value={formData.direccionPadre_numero1 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccionPadre ? styles.error : ""}
            />
            <span className={styles.addressSeparator}>#</span>
            <input
              type="text"
              name="direccionPadre_numero2"
              value={formData.direccionPadre_numero2 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccionPadre ? styles.error : ""}
            />
            <span className={styles.addressSeparator}>-</span>
            <input
              type="text"
              name="direccionPadre_numero3"
              value={formData.direccionPadre_numero3 || ""}
              onChange={handleChange}
              placeholder="Número"
              maxLength={10}
              className={errors.direccionPadre ? styles.error : ""}
            />
          </div>
          {errors.direccionPadre && (
            <span className={styles.errorMsg}>{errors.direccionPadre}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ciudadPadre">
            Ciudad <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="ciudadPadre"
            name="ciudadPadre"
            value={formData.ciudadPadre}
            onChange={handleChange}
            maxLength={100}
            className={errors.ciudadPadre ? styles.error : ""}
          />
          {errors.ciudadPadre && (
            <span className={styles.errorMsg}>{errors.ciudadPadre}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="celularPadre">
            Celular <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="celularPadre"
            name="celularPadre"
            value={formData.celularPadre}
            onChange={handleChange}
            maxLength={15}
            className={errors.celularPadre ? styles.error : ""}
          />
          {errors.celularPadre && (
            <span className={styles.errorMsg}>{errors.celularPadre}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ocupacionPadre">
            Ocupación <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="ocupacionPadre"
            name="ocupacionPadre"
            value={formData.ocupacionPadre}
            onChange={handleChange}
            maxLength={100}
            className={errors.ocupacionPadre ? styles.error : ""}
          />
          {errors.ocupacionPadre && (
            <span className={styles.errorMsg}>{errors.ocupacionPadre}</span>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formGroupFull}>
          <label htmlFor="observacionesFamiliares">Observaciones</label>
          <textarea
            id="observacionesFamiliares"
            name="observacionesFamiliares"
            value={formData.observacionesFamiliares}
            onChange={handleChange}
            maxLength={500}
            rows={3}
            placeholder="Observaciones adicionales sobre información familiar (opcional)"
          />
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className={styles.stepContent}>
      <h2>Valoración Médica</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="fechaValoracion">
            Fecha de Valoración <span className={styles.required}>*</span>
          </label>
          <input
            type="date"
            id="fechaValoracion"
            name="fechaValoracion"
            value={formData.fechaValoracion}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className={errors.fechaValoracion ? styles.error : ""}
          />
          {errors.fechaValoracion && (
            <span className={styles.errorMsg}>{errors.fechaValoracion}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="profesionalMedico">
            Profesional Médico <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="profesionalMedico"
            name="profesionalMedico"
            value={formData.profesionalMedico}
            onChange={handleChange}
            maxLength={150}
            placeholder="Dr. Nombre Apellido"
            className={errors.profesionalMedico ? styles.error : ""}
          />
          {errors.profesionalMedico && (
            <span className={styles.errorMsg}>{errors.profesionalMedico}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="estadoValoracion">Estado de Valoración</label>
          <select
            id="estadoValoracion"
            name="estadoValoracion"
            value={formData.estadoValoracion}
            onChange={handleChange}
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="APROBADA">Aprobada</option>
            <option value="RECHAZADA">Rechazada</option>
          </select>
        </div>

        <div className={styles.formGroupFull}>
          <label htmlFor="observacionesMedicas">Observaciones Médicas</label>
          <textarea
            id="observacionesMedicas"
            name="observacionesMedicas"
            value={formData.observacionesMedicas}
            onChange={handleChange}
            maxLength={1000}
            rows={4}
            placeholder="Ingrese observaciones médicas relevantes (opcional)"
          />
        </div>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className={styles.stepContent}>
      <h2>Información Importante y Firma</h2>
      <div className={styles.formGrid}>
        <div className={styles.formGroupFull}>
          <label htmlFor="nombreFirmante">
            Nombre del Firmante <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="nombreFirmante"
            name="nombreFirmante"
            value={formData.nombreFirmante}
            onChange={handleChange}
            maxLength={150}
            className={errors.nombreFirmante ? styles.error : ""}
          />
          {errors.nombreFirmante && (
            <span className={styles.errorMsg}>{errors.nombreFirmante}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fechaFirma">
            Fecha de Firma <span className={styles.required}>*</span>
          </label>
          <input
            type="date"
            id="fechaFirma"
            name="fechaFirma"
            value={formData.fechaFirma}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
            className={errors.fechaFirma ? styles.error : ""}
          />
          {errors.fechaFirma && (
            <span className={styles.errorMsg}>{errors.fechaFirma}</span>
          )}
        </div>

        <div className={styles.formGroupFull}>
          <div className={styles.infoBox}>
            <p>
              <strong>Declaración:</strong> Declaro que la información
              proporcionada en este formulario es verdadera y completa. Entiendo
              que cualquier falsedad u omisión puede resultar en la cancelación
              de mi inscripción al programa deportivo.
            </p>
          </div>
        </div>

        <div className={styles.formGroupFull}>
          <div className={styles.summaryBox}>
            <h3>Resumen de la Inscripción</h3>
            <p>
              <strong>Programa:</strong> {formData.programaDeportivoFk || "N/A"}
            </p>
            <p>
              <strong>Estudiante:</strong> {formData.nombreCompleto || "N/A"}
            </p>
            <p>
              <strong>Identificación:</strong>{" "}
              {formData.tipoIdentificacion || "N/A"} -{" "}
              {formData.numeroIdentificacion || "N/A"}
            </p>
            <p>
              <strong>Nivel Deportivo:</strong>{" "}
              {formData.nivelDeportivo || "N/A"}
            </p>
            <p>
              <strong>Estado:</strong> {formData.estadoInscripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h1>Inscripción Programa Deportivo</h1>
        <p className={styles.stepInfo}>
          Paso {currentStep} de {totalSteps}
        </p>
      </div>

      {renderStepIndicator()}

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
        {currentStep === 7 && renderStep7()}

        <div className={styles.formActions}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className={styles.btnSecondary}
            >
              Anterior
            </button>
          )}

          <button type="button" onClick={onCancel} className={styles.btnCancel}>
            Cancelar
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className={styles.btnPrimary}
            >
              Siguiente
            </button>
          ) : (
            <button type="submit" className={styles.btnSuccess}>
              Enviar Inscripción
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InscripcionDeportivaForm;
