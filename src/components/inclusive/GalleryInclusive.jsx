import styles from "../../styles/inclusive.module.css";

function GalleryInclusive() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.item}>
          <img src="inclusivo/ed_1.png" width={200} className={styles.image} />
          <p className={`${styles.label} ${styles.labelDefault}`}>Inicio</p>
        </div>
        <div className={styles.item}>
          <img src="inclusivo/ed_2.png" width={200} className={styles.image} />
          <p className={styles.label}>Servicios o Apoyos Disponibles</p>
        </div>
        <div className={styles.item}>
          <img src="inclusivo/ed_3.png" width={200} className={styles.image} />
          <p className={`${styles.label} ${styles.labelMedium}`}>
            Canales de Contacto
          </p>
        </div>
        <div className={styles.item}>
          <img src="inclusivo/ed_4.png" width={200} className={styles.image} />
          <p className={`${styles.label} ${styles.labelDefault}`}>
            Normatividad
          </p>
        </div>
      </div>
    </div>
  );
}
export default GalleryInclusive;
