import PQRSForm from '../components/pqrs/PQRSForm';
import PQRSDefinitions from '../components/pqrs/PQRSDefinitions';
import PQRSContactInfo from '../components/pqrs/PQRSContactInfo';
import styles from '../styles/pqrs.module.css';

const PQRSView = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Envíanos tu Petición, Queja, Reclamo o Sugerencia
          </h1>
          <p className={styles.heroDescription}>
            Tu opinión es muy importante para nosotros. A través de este formulario podrás hacernos llegar
            tus comentarios sobre los servicios, actividades o atención del Bienestar Universitario.
          </p>
        </div>
      </div>

      {/* Section Divider */}
      <hr className={styles.sectionDivider} />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <PQRSForm />
        </div>
      </div>

      {/* Section Divider */}
      <hr className={styles.sectionDivider} />

      {/* Definitions Section */}
      <div className={styles.definitions}>
        <PQRSDefinitions />
      </div>

      {/* Section Divider */}
      <hr className={styles.sectionDivider} />

      {/* Contact Info Section */}
      <div className={styles.contactInfo}>
        <PQRSContactInfo />
      </div>
    </div>
  );
};

export default PQRSView;
