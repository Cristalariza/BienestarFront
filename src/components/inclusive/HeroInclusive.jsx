import styles from "../../styles/inclusive.module.css";

function HeroInclusive() {
  return (
    <div className={styles.container}>
      <h1 className={styles.infoTitle}>Educación Inclusiva</h1>
      <p className={styles.infoSubtitle}>
        Garantizamos el acceso, la participación y el respeto a la diversidad
        dentro de la comunidad universitaria.
      </p>
    </div>
  );
}
export default HeroInclusive;
