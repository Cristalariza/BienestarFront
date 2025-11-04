import styles from "../../styles/ayudaSocial.module.css";
import imagen1 from "../../assets/Ayuda_Social/Buentrato/AYUDAS-01.png";
import imagen2 from "../../assets/Ayuda_Social/Buentrato/AYUDAS-02.jpg";
import imagen3 from "../../assets/Ayuda_Social/Buentrato/AYUDAS-03.jpg";

const BuenTrato = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContent}>
        <p className={styles.description}>
          Desarrollando actividades que posibiliten un ambiente favorable que
          permita a las personas lograr las máximas realizaciones en sus
          condiciones de trabajo y estudio. Para ellos realizar acciones
          orientadas al desarrollo y estímulo de las capacitaciones humanas en
          aspectos de comunicación, valores institucionales, sentido de
          pertenencia, liderazgo, desarrollo de la autonomía y estímulo de la
          creatividad.
        </p>
        <p className={styles.description}>
          Propiciar y participar activamente en los programas institucionales
          orientados a mantener y mejorar la comunicación efectiva entre
          personas o dependencia; igualmente debe de establecer canales de
          expresión y opinión mediante los cuales los integrantes de la
          comunidad sugerencia e iniciativa acerca de cómo se vive en la
          universidad. Se debe promover y fomentar la construcción en la
          diferentes y la solución concretada y pacíficas de los conflictos.
        </p>
      </div>

      <div className={styles.imageGrid}>
        <div className={styles.imageWrapper}>
          <img
            src={imagen1}
            alt="Actividad de Buen Trato 1"
            className={styles.image}
          />
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={imagen2}
            alt="Actividad de Buen Trato 2"
            className={styles.image}
          />
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={imagen3}
            alt="Actividad de Buen Trato 3"
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.greenButton}>
          UNIVERSIDAD POPULAR DEL CESAR
        </button>
      </div>
    </div>
  );
};

export default BuenTrato;
