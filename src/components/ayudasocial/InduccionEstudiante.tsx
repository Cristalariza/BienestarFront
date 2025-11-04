import styles from "../../styles/ayudaSocial.module.css";
import imagen1 from "../../assets/Ayuda_Social/Induccion/INDUCCION-01.png";
import imagen2 from "../../assets/Ayuda_Social/Induccion/INDUCCION-02.png";
import imagen3 from "../../assets/Ayuda_Social/Induccion/INDUCCION-03.png";

const InduccionEstudiante = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContent}>
        <p className={styles.description}>
          Dirigido a los estudiantes que ingresan a la Universidad, este trabajo
          se realizará en coordinación con el Vicerrector Académico, Directores
          de Departamentos y el decano de las distintas facultades. Este
          programa está orientado a facilitar al estudiante que ingresa a la
          universidad, con el objeto de proverle de información y motivar
          actitudes, necesarias para enfrentar con mayor efectividad los
          desafíos académicos de la enseñanza superior. Las actividades de este
          programa buscan a su vez brindar herramientas necesarias para
          relacionar a los estudiantes con su entorno institucional, conocer los
          desarrollo académicos e investigativos, la estructura administrativa
          los organismos de gobierno de la Universidad, e informándoles a acerca
          de los recursos físicos, culturales Y Los servicios que ofrece la
          Universidad de la División de Bienestar Institucional. Los objetivos
          del programa de inducción son:
        </p>
        <ul className={styles.objectivesList}>
          <li className={styles.objectiveItem}>
            a. Ampliar su percepción del mundo, a fin de alcanzar una mayor
            comprensión de la vida académica, propia de la universidad.
          </li>
          <li className={styles.objectiveItem}>
            b. Familiarizarse con el ambiente universitario y adquirir una
            actitud de mayor confianza que facilite su inclusión en la comunidad
            académica.
          </li>
          <li className={styles.objectiveItem}>
            c. Conocer los distintos organismos y servicios que prestan atención
            a los estudiantes.
          </li>
          <li className={styles.objectiveItem}>
            d. Favorecer el sentido de identidad con la Universidad.
          </li>
        </ul>
      </div>

      <div className={styles.imageGrid}>
        <div className={styles.imageWrapper}>
          <img
            src={imagen1}
            alt="Inducción Estudiantes 1"
            className={styles.image}
          />
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={imagen2}
            alt="Inducción Estudiantes 2"
            className={styles.image}
          />
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={imagen3}
            alt="Inducción Estudiantes 3"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default InduccionEstudiante;
