import PQRSForm from "../../components/pqrs/PQRSForm";
import styles from "../../styles/studentstyles/studentPQRS.module.css";

const GraduatePQRS = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Crear PQRS</h1>
        <p className={styles.subtitle}>
          Envía tus peticiones, quejas, reclamos, sugerencias o felicitaciones
        </p>
      </div>

      <div className={styles.formContainer}>
        <PQRSForm />
      </div>
    </div>
  );
};

export default GraduatePQRS;
