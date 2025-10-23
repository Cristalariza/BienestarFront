import styles from '../../styles/home.module.css';

const MissionVisionSection = () => {
  return (
    <section className={styles.missionVision}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>MISIÓN Y VISIÓN</h2>
      </div>

      <div className={styles.missionVisionGrid}>
        <div className={styles.missionVisionCard}>
          <div className={styles.missionVisionIcon}>
            <i className="pi pi-users" style={{ fontSize: '48px' }}></i>
          </div>
          <h3 className={styles.missionVisionTitle}>MISIÓN</h3>
          <p className={styles.missionVisionText}>
            Fortalecer y potenciar al ser humano, ayudando al mejoramiento de la calidad de vida de docentes,
            funcionarios administrativos, estudiantes de pregrado y egresados de Nuestra Alma Mater a través de
            un conjunto de acciones eficientes, sustentadas en los principios de integralidad, participación, racionalización,
            solidaridad y equidad.
          </p>
        </div>

        <div className={styles.missionVisionCard}>
          <div className={styles.missionVisionIcon}>
            <i className="pi pi-lightbulb" style={{ fontSize: '48px' }}></i>
          </div>
          <h3 className={styles.missionVisionTitle}>VISIÓN</h3>
          <p className={styles.missionVisionText}>
            Bienestar Institucional dispondrá los recursos humanos, logísticos y tecnológicos que contribuyan al mejoramiento
            de la calidad de vida y al desarrollo humano e impulsen procesos de construcción social, creativos y productivos
            que ayuden a fortalecer las áreas, formativa, participativa, comunicativa y de prestación de servicios de toda la
            comunidad universitaria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
