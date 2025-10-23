import universidadImage from '../../assets/Universidad.png';
import styles from '../../styles/home.module.css';

const AboutSection = () => {
  return (
    <section className={styles.about}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>¿Quiénes somos?</h2>
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutImage}>
          <img src={universidadImage} alt="Campus Universidad Popular del César" />
        </div>

        <div className={styles.aboutText}>
          <p>
            <em>
              Bienestar Universitario UPC es el espacio encargado de promover el desarrollo integral de la comunidad universitaria.
              A través de programas culturales, deportivos, de apoyo social y de formación humana, busca fortalecer la calidad de vida,
              la salud física y mental, y la construcción de una comunidad participativa, solidaria y comprometida con los valores institucionales.
              Trabajamos día a día para acompañar al estudiante durante su proceso académico, brindando oportunidades de crecimiento personal y colectivo.
            </em>
          </p>

          <div className={styles.aboutBadge}>
            <span className={styles.aboutBadgeText}>UNIVERSIDAD POPULAR DEL CESAR</span>
            <span className={styles.aboutBadgeSubtext}>Comprometidos con tu desarrollo integral desde 1976</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
