import styles from "../../../styles/adminstyles/adminCultura.module.css";

const Reporte = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reporte</h1>
      <div className={styles.content}>
        <p>
          debido a la falta de datos, no se puede generar un reporte en este
          momento.
        </p>
      </div>
    </div>
  );
};

export default Reporte;
