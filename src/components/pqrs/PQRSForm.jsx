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

  const handleRedirectToOfficialSystem = () => {
    window.open(
      "https://orfeo2022.unicesar.edu.co/pqrs/frontend/web/index.php?r=site%2Findex",
      "_blank"
    );
  };

  return (
    <div className={styles.modernContentWrapper}>
      {/* Main Card with Image and Content */}
      <div className={styles.modernCard}>
        {/* Image Section */}
        <div className={styles.modernImageSection}>
          <div className={styles.imageWrapper}>
            <img
              src={muchachaImage}
              alt="Sistema de PQRS"
              className={styles.modernImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.modernContentSection}>
          <div className={styles.iconBadge}>
            <svg
              className={styles.badgeIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <h3 className={styles.modernTitle}>Sistema Oficial de PQRS</h3>

          <div className={styles.modernInfoContent}>
            <p className={styles.modernInfoText}>
              Para realizar una{" "}
              <strong>Petición, Queja, Reclamo o Sugerencia (PQRS)</strong>,
              utiliza el sistema oficial de la Universidad Popular del Cesar -
              UPC.
            </p>

            <div className={styles.featuresSection}>
              <p className={styles.featuresTitle}>
                El sistema oficial te permitirá:
              </p>

              <div className={styles.featuresGrid}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span>Registrar tu PQRS de forma segura</span>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                  </div>
                  <span>Obtener código de radicado</span>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span>Consultar estado en tiempo real</span>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>Recibir respuestas oficiales</span>
                </div>
              </div>
            </div>

            <div className={styles.modernButtonContainer}>
              <button
                type="button"
                onClick={handleRedirectToOfficialSystem}
                className={styles.modernOfficialButton}
              >
                <span className={styles.buttonText}>
                  Acceder al Sistema Oficial
                </span>
                <svg
                  className={styles.buttonIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQRSForm;
