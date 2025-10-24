import styles from "../../styles/sports.module.css";

function ProgramsInfo() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <h2 className={styles.headerTitle}>Programas Deportivos</h2>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.programItem}>
          <h3>FORMATIVO</h3>
          <p>
            Orientar al conocimiento al conocimiento teórico y práctico del
            desarrollo corporal y la formación en las diferentes disciplinas
            deportivas. Buscando ofrecer a la comunidad universitaria un
            desarrollo integral y placentero.
          </p>
        </div>
        <div className={styles.programItem}>
          <h3>RECREATIVO</h3>
          <p>
            Orientar a la preparación y participación de los estudiantes
            deportivos, personal administrativo, docentes y directivos que
            representaran a la institución en eventos locales, regionales,
            nacionales e internacionales
          </p>
        </div>
        <div className={styles.programItem}>
          <h3>COMPETITIVO</h3>
          <p>
            Comprender el desarrollo de actividades lúdicas y deportivas que se
            realizan con el objetivo de integrar los miembros de la comunidad
            universitaria si se requiere de un gran conocimiento técnico táctico
            o entrenamiento deportivo.
          </p>
        </div>
        <div className={styles.programItem}>
          <h3>ESCENARIOS DEPORTIVOS</h3>
          <p>
            Buscar mantener administrar y mejorar los escenarios deportivos con
            que cuenta la Universidad y proponer la construcción de nuevos
            escenarios.
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProgramsInfo;
