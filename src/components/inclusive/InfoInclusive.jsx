import styles from "../../styles/inclusive.module.css";

function InfoInclusive() {
  return (
    <>
      <h2 className={styles.title}>Grupos Insitucionales</h2>
      <div className={styles.container}>
        <div className={styles.card}>
          <p>Acciones de Inclusión Educativa</p>
        </div>
        <div className={styles.card}>
          <p>Requisitos para acceder a los Apoyos</p>
        </div>
        <div className={styles.card}>
          <p>Convocatorias y Actividades de Sensibilizacion</p>
        </div>
        <div className={styles.card}>
          <p>Recursos de Apoyo y material Accesible</p>
        </div>
      </div>
    </>
  );
}
export default InfoInclusive;
