import styles from "../../styles/sports.module.css";

function Hero() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.sportTitle}>Programas Deportivos</h1>
        <p className={styles.sportSubtitle}>
          Desarrolla tu potencial atlético mientras mantienes un excelente
          rendimiento académico.
        </p>
      </div>
      <div className={styles.gradientBar}></div>
    </>
  );
}
export default Hero;
