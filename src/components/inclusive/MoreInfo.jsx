import styles from "../../styles/inclusive.module.css";

function MoreInfo() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <h2 className={styles.headerTitle}>¿Qué es inclusividad?</h2>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.imageGrid}>
          <img src="inclusivo/inclusividad_1.png" width={300} height={220} />
          <img src="inclusivo/inclusividad_2.png" width={300} height={220} />
          <img src="inclusivo/inclusividad_3.png" width={300} height={220} />
          <img src="inclusivo/inclusividad_4.png" width={300} height={220} />
        </div>
        <div className={styles.textContent}>
          <p>
            Uno de los principales compromisos de la Universidad Popular del
            Cesar es garantizar una educación superior accesible, equitativa y
            de calidad para todas las personas, sin distinción de género,
            origen, condición social, cultural o biológica. Desde su función
            social, la universidad promueve una formación que reconozca y valore
            la diversidad de la región y del país, impulsando políticas,
            programas y acciones que fortalezcan la participación y permanencia
            de toda la comunidad universitaria. La Educación Inclusiva en la UPC
            busca construir una cultura universitaria basada en el respeto, la
            empatía y la igualdad de oportunidades, consolidando un entorno
            donde cada estudiante pueda desarrollarse plenamente.
          </p>
          <button className={styles.button}>
            Universidad Popular del Cesar
          </button>
        </div>
      </div>
    </div>
  );
}
export default MoreInfo;
