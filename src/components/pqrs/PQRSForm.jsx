import { usePQRSForm } from "../../hooks/usePQRSForm";
import styles from "../../styles/pqrs.module.css";
import muchachaImage from "../../assets/MuCHACHA.jpg";

const PQRSForm = () => {
  const {
    formData,
    trackingCode,
    handleInputChange,
    handleSubmit,
    handleTrackingSearch,
    setTrackingCode,
  } = usePQRSForm();

  return (
    <div className={styles.contentGrid}>
      {/* Form Section */}
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          {/* Personal Information Card */}
          <div className={styles.formCard}>
            <h3 className={styles.formSectionTitle}>Información Personal</h3>

            <div className={styles.formGroup}>
              <label htmlFor="nombreCompleto" className={styles.formLabel}>
                Nombre completo *
              </label>
              <input
                type="text"
                id="nombreCompleto"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Ej: Juan Pérez"
                disabled={formData.enviarAnonimo}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="correoInstitucional" className={styles.formLabel}>
                Correo institucional *
              </label>
              <input
                type="email"
                id="correoInstitucional"
                name="correoInstitucional"
                value={formData.correoInstitucional}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Ej: juan.perez@unicesar.edu.co"
                disabled={formData.enviarAnonimo}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="documentoIdentidad" className={styles.formLabel}>
                Documento de identidad
              </label>
              <input
                type="text"
                id="documentoIdentidad"
                name="documentoIdentidad"
                value={formData.documentoIdentidad}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Ej: 12345678"
                disabled={formData.enviarAnonimo}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="enviarAnonimo"
                  name="enviarAnonimo"
                  checked={formData.enviarAnonimo}
                  onChange={handleInputChange}
                  className={styles.checkboxInput}
                />
                Deseo enviar esta PQRS de forma anónima
              </label>
            </div>
          </div>

          {/* Request Details Card */}
          <div className={styles.formCard}>
            <h3 className={styles.formSectionTitle}>
              Detalles de la Solicitud
            </h3>

            <div className={styles.formGroup}>
              <label htmlFor="tipoSolicitud" className={styles.formLabel}>
                Tipo de solicitud *
              </label>
              <select
                id="tipoSolicitud"
                name="tipoSolicitud"
                value={formData.tipoSolicitud}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="peticion">Petición</option>
                <option value="queja">Queja</option>
                <option value="reclamo">Reclamo</option>
                <option value="sugerencia">Sugerencia</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label
                htmlFor="dependenciaRelacionada"
                className={styles.formLabel}
              >
                Dependencia relacionada *
              </label>
              <select
                id="dependenciaRelacionada"
                name="dependenciaRelacionada"
                value={formData.dependenciaRelacionada}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
              >
                <option value="">Seleccione una dependencia</option>
                <option value="bienestar">Bienestar Universitario</option>
                <option value="academica">Dirección Académica</option>
                <option value="administrativa">Dirección Administrativa</option>
                <option value="financiera">Dirección Financiera</option>
                <option value="recursos-humanos">Recursos Humanos</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="asunto" className={styles.formLabel}>
                Asunto *
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="Ej: Inconveniente con horario de atención"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label
                htmlFor="descripcionDetallada"
                className={styles.formLabel}
              >
                Descripción detallada *
              </label>
              <textarea
                id="descripcionDetallada"
                name="descripcionDetallada"
                value={formData.descripcionDetallada}
                onChange={handleInputChange}
                rows="4"
                className={styles.formTextarea}
                placeholder="Describe brevemente tu solicitud o sugerencia..."
                required
              />
              <p className={styles.formHelpText}>
                Por favor, proporciona todos los detalles relevantes para que
                podamos atender tu solicitud de manera efectiva.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="archivoAdjunto" className={styles.formLabel}>
                Adjuntar archivo (opcional)
              </label>
              <div className={styles.fileInputContainer}>
                <input
                  type="file"
                  id="archivoAdjunto"
                  name="archivoAdjunto"
                  onChange={handleInputChange}
                  className={styles.fileInput}
                  accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                />
                <label
                  htmlFor="archivoAdjunto"
                  className={styles.fileInputLabel}
                >
                  <span className={styles.fileInputText}>
                    Seleccionar archivo
                  </span>
                  <span className={styles.fileInputStatus}>
                    Sin archivos seleccionados
                  </span>
                </label>
              </div>
              <p className={styles.formHelpText}>
                Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (máx. 5MB)
              </p>
            </div>

            <button type="submit" className={styles.submitButton}>
              Enviar PQRS
            </button>
          </div>
        </form>
      </div>

      {/* Tracking Section */}
      <div className={styles.trackingSection}>
        {/* Tracking Image */}
        <div className={styles.trackingImage}>
          <img
            src={muchachaImage}
            alt="Imagen ilustrativa del módulo PQRS"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tracking Card */}
        <div className={styles.trackingCard}>
          <div className={styles.trackingHeader}>
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className={styles.trackingTitle}>¿Ya enviaste una PQRS?</h3>
          </div>

          <p className={styles.trackingDescription}>
            Ingresa tu código de radicado para consultar su estado:
          </p>

          <form onSubmit={handleTrackingSearch} className={styles.trackingForm}>
            <div className={styles.trackingInputGroup}>
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className={styles.trackingInput}
                placeholder="Ej: PQRS-2025-001234"
              />
              <button type="submit" className={styles.trackingButton}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Buscar</span>
              </button>
            </div>
          </form>

          <div className={styles.statusIndicators}>
            <p className={styles.statusTitle}>Estados posibles:</p>
            <div className={styles.statusList}>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${styles.yellow}`}></div>
                <span>En revisión</span>
              </div>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${styles.blue}`}></div>
                <span>En trámite</span>
              </div>
              <div className={styles.statusItem}>
                <div className={`${styles.statusDot} ${styles.green}`}></div>
                <span>Cerrada / Respondida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQRSForm;
