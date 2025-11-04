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
            Tu opinión es muy importante para nosotros. Para realizar una Petición, Queja, Reclamo o Sugerencia (PQRS),
            utiliza el sistema oficial de la Universidad Popular del Cesar - UPC. Haz clic en el botón para acceder al sistema.
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
