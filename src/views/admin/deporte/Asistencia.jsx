import { useState } from "react";
import styles from "../../../styles/adminstyles/asistencia.module.css";

const Asistencia = () => {
  const [step, setStep] = useState(1); // 1: Datos del evento, 2: Lista de asistencia
  const [formData, setFormData] = useState({
    // Datos del evento
    institucion: "",
    lugar: "",
    grupo: "",
    fecha: "",
    tipo_evento: "",
    dependencia_program: "",
    director: "",
    responsable: "",
    observaciones: "",
  });

  const [asistentes, setAsistentes] = useState([]);
  const [nuevoAsistente, setNuevoAsistente] = useState({
    nombres_apellidos: "",
    identificacion: "",
    firma: "",
    asistencia: true,
  });

  const [evaluacion, setEvaluacion] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgregarAsistente = () => {
    if (!nuevoAsistente.nombres_apellidos || !nuevoAsistente.identificacion) {
      alert("Por favor complete nombre e identificación");
      return;
    }

    const asistenteConNumero = {
      ...nuevoAsistente,
      num_consec: asistentes.length + 1,
    };

    setAsistentes([...asistentes, asistenteConNumero]);
    setNuevoAsistente({
      nombres_apellidos: "",
      identificacion: "",
      firma: "",
      asistencia: true,
    });
  };

  const handleEliminarAsistente = (index) => {
    const nuevosAsistentes = asistentes.filter((_, i) => i !== index);
    // Reordenar los números consecutivos
    const reordenados = nuevosAsistentes.map((a, i) => ({
      ...a,
      num_consec: i + 1,
    }));
    setAsistentes(reordenados);
  };

  const toggleAsistencia = (index) => {
    const nuevosAsistentes = [...asistentes];
    nuevosAsistentes[index].asistencia = !nuevosAsistentes[index].asistencia;
    setAsistentes(nuevosAsistentes);
  };

  const handleSubmit = () => {
    const totalPresentes = asistentes.filter((a) => a.asistencia).length;

    const registroAsistencia = {
      evento_id: `EVT-${Date.now()}`,
      institucion: formData.institucion,
      lugar: formData.lugar,
      grupo: formData.grupo,
      fecha: new Date(formData.fecha).toISOString(),
      tipo_evento: formData.tipo_evento,
      dependencia_program: formData.dependencia_program,
      asistentes: asistentes,
      evaluacion: evaluacion,
      director: formData.director,
      responsable: formData.responsable,
      observaciones: formData.observaciones,
      total_asistentes: asistentes.length,
      total_presentes: totalPresentes,
      fecha_registro: new Date().toISOString(),
    };

    console.log("Registro de asistencia:", registroAsistencia);
    alert(
      `Asistencia registrada exitosamente!\nTotal: ${asistentes.length}\nPresentes: ${totalPresentes}`
    );
  };

  const calcularEstadisticas = () => {
    const total = asistentes.length;
    const presentes = asistentes.filter((a) => a.asistencia).length;
    const ausentes = total - presentes;
    const porcentaje = total > 0 ? ((presentes / total) * 100).toFixed(1) : 0;

    return { total, presentes, ausentes, porcentaje };
  };

  const stats = calcularEstadisticas();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header con pestañas */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${step === 1 ? styles.tabActive : ""}`}
            onClick={() => setStep(1)}
          >
            <i className="pi pi-calendar"></i>
            Datos del Evento
          </button>
          <button
            className={`${styles.tab} ${step === 2 ? styles.tabActive : ""}`}
            onClick={() => setStep(2)}
          >
            <i className="pi pi-users"></i>
            Lista de Asistencia
          </button>
        </div>

        {/* Paso 1: Datos del Evento */}
        {step === 1 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>
              <i className="pi pi-calendar"></i>
              Información del Evento
            </h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>
                  Institución <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="institucion"
                  value={formData.institucion}
                  onChange={handleInputChange}
                  placeholder="Nombre de la institución"
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Lugar <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="lugar"
                  value={formData.lugar}
                  onChange={handleInputChange}
                  placeholder="Ubicación del evento"
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Grupo/Equipo <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="grupo"
                  value={formData.grupo}
                  onChange={handleInputChange}
                  placeholder="Nombre del grupo"
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Fecha <span className={styles.required}>*</span>
                </label>
                <input
                  type="datetime-local"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Tipo de Evento <span className={styles.required}>*</span>
                </label>
                <select
                  name="tipo_evento"
                  value={formData.tipo_evento}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione</option>
                  <option value="presentaciones">Presentaciones</option>
                  <option value="ensayos">Ensayos</option>
                  <option value="integraciones">Integraciones</option>
                  <option value="competencia">Competencia</option>
                  <option value="entrenamiento">Entrenamiento</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>
                  Dependencia/Programa{" "}
                  <span className={styles.required}>*</span>
                </label>
                <select
                  name="dependencia_program"
                  value={formData.dependencia_program}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Estudiante">Estudiante</option>
                  <option value="Docente">Docente</option>
                  <option value="Egresado">Egresado</option>
                  <option value="Administrativo">Administrativo</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>
                  Director <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="director"
                  value={formData.director}
                  onChange={handleInputChange}
                  placeholder="Nombre del director"
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Responsable <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleInputChange}
                  placeholder="Nombre del responsable"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label>Observaciones</label>
                <textarea
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  placeholder="Observaciones generales del evento"
                  rows={3}
                />
              </div>
            </div>

            <div className={styles.stepActions}>
              <button className={styles.btnPrimary} onClick={() => setStep(2)}>
                Siguiente: Lista de Asistencia
                <i className="pi pi-arrow-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* Paso 2: Lista de Asistencia */}
        {step === 2 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>
              <i className="pi pi-users"></i>
              Registro de Asistencia
            </h2>

            {/* Estadísticas */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#3b82f6" }}
                >
                  <i className="pi pi-users"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Total</span>
                  <span className={styles.statValue}>{stats.total}</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#10b981" }}
                >
                  <i className="pi pi-check-circle"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Presentes</span>
                  <span className={styles.statValue}>{stats.presentes}</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#ef4444" }}
                >
                  <i className="pi pi-times-circle"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Ausentes</span>
                  <span className={styles.statValue}>{stats.ausentes}</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div
                  className={styles.statIcon}
                  style={{ background: "#f59e0b" }}
                >
                  <i className="pi pi-percentage"></i>
                </div>
                <div className={styles.statInfo}>
                  <span className={styles.statLabel}>Asistencia</span>
                  <span className={styles.statValue}>{stats.porcentaje}%</span>
                </div>
              </div>
            </div>

            {/* Formulario para agregar asistente */}
            <div className={styles.addAsistenteForm}>
              <h3>Agregar Asistente</h3>
              <div className={styles.addFormGrid}>
                <input
                  type="text"
                  placeholder="Nombres y Apellidos"
                  value={nuevoAsistente.nombres_apellidos}
                  onChange={(e) =>
                    setNuevoAsistente({
                      ...nuevoAsistente,
                      nombres_apellidos: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Identificación"
                  value={nuevoAsistente.identificacion}
                  onChange={(e) =>
                    setNuevoAsistente({
                      ...nuevoAsistente,
                      identificacion: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Firma (opcional)"
                  value={nuevoAsistente.firma}
                  onChange={(e) =>
                    setNuevoAsistente({
                      ...nuevoAsistente,
                      firma: e.target.value,
                    })
                  }
                />
                <button
                  className={styles.btnAdd}
                  onClick={handleAgregarAsistente}
                >
                  <i className="pi pi-plus"></i>
                  Agregar
                </button>
              </div>
            </div>

            {/* Tabla de asistentes */}
            <div className={styles.tableContainer}>
              <table className={styles.asistenciaTable}>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Nombres y Apellidos</th>
                    <th>Identificación</th>
                    <th>Firma</th>
                    <th>Asistencia</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {asistentes.length === 0 ? (
                    <tr>
                      <td colSpan="6" className={styles.emptyState}>
                        <i className="pi pi-users"></i>
                        <p>No hay asistentes registrados</p>
                        <span>
                          Agregue asistentes usando el formulario superior
                        </span>
                      </td>
                    </tr>
                  ) : (
                    asistentes.map((asistente, index) => (
                      <tr key={index}>
                        <td>{asistente.num_consec}</td>
                        <td>{asistente.nombres_apellidos}</td>
                        <td>{asistente.identificacion}</td>
                        <td>{asistente.firma || "-"}</td>
                        <td>
                          <button
                            className={`${styles.asistenciaBtn} ${
                              asistente.asistencia
                                ? styles.presente
                                : styles.ausente
                            }`}
                            onClick={() => toggleAsistencia(index)}
                          >
                            {asistente.asistencia ? (
                              <>
                                <i className="pi pi-check"></i>
                                Presente
                              </>
                            ) : (
                              <>
                                <i className="pi pi-times"></i>
                                Ausente
                              </>
                            )}
                          </button>
                        </td>
                        <td>
                          <button
                            className={styles.btnDelete}
                            onClick={() => handleEliminarAsistente(index)}
                          >
                            <i className="pi pi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Evaluación */}
            <div className={styles.evaluacionSection}>
              <label>
                <i className="pi pi-star"></i>
                Evaluación del Evento
              </label>
              <textarea
                value={evaluacion}
                onChange={(e) => setEvaluacion(e.target.value)}
                placeholder="Opinión general sobre el evento..."
                rows={4}
              />
            </div>

            {/* Acciones finales */}
            <div className={styles.stepActions}>
              <button
                className={styles.btnSecondary}
                onClick={() => setStep(1)}
              >
                <i className="pi pi-arrow-left"></i>
                Volver
              </button>
              <button className={styles.btnSuccess} onClick={handleSubmit}>
                <i className="pi pi-save"></i>
                Guardar Asistencia
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Asistencia;
