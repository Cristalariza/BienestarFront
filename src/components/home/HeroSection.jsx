import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import bannerImage from '../../assets/UniversidadPrincipal.jpeg';
import styles from '../../styles/home.module.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <img src={bannerImage} alt="" />
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          TU BIENESTAR ES NUESTRA <span className={styles.heroHighlight}>PRIORIDAD</span>
        </h1>
        <p className={styles.heroDescription}>
          Descubre todos los programas y servicios que la Universidad Popular del César tiene para apoyar tu desarrollo integral como estudiante.
        </p>
        <Button
          label="Bienestar Virtual"
          className={styles.heroButton}
          onClick={handleLoginRedirect}
        />
      </div>
    </section>
  );
};

export default HeroSection;
