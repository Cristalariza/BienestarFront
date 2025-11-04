import styles from "../../../styles/shared/hero.module.css";
import GradientBar from "../gradiente/GradientBar";

function Hero({ title, subtitle, backgroundSlider, gradientText }) {
  return (
    <>
      <div className={styles.heroWrapper}>
        {backgroundSlider && (
          <div className={styles.heroBackground}>{backgroundSlider}</div>
        )}
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.sportTitle}>{title}</h1>
            <p className={styles.sportSubtitle}>{subtitle}</p>
          </div>
        </div>
      </div>
      {gradientText && <GradientBar text={gradientText} />}
    </>
  );
}

export default Hero;
