import styles from "../../styles/ayudaSocial.module.css";
import imagen1 from "../../assets/Ayuda_Social/Consejeria/PSICO-01.png";

const ConsejeriaPsicologia = () => {
  return (
    <div className={styles.container}>
      <div className={styles.horizontalLayout}>
        <div className={styles.textSection}>
          <p className={styles.descriptionBold}>
            El programa tiene que ver con la formación y consejería en el área
            psicoactiva pedagógica. Este programa pretende potencializar las
            capacidades de la comunidad universitaria ampliando sus
            conocimientos y facilitando el acercamiento a diversas técnicas y
            disciplinas que complementen su formación, así como proporcionar
            herramientas al estudiante para enfrentar de manera objetiva el
            problema de seguir o cambiar de carrera. Igualmente, a través de
            talleres de apoyo se busca fortalecer procesos de auto conocimiento
            y se brinda consejería individual y grupal para el mejoramiento de
            las relaciones consigo mismo, con los demás miembros de la comunidad
            Universitaria y con el resto de la sociedad.
          </p>
        </div>
        <div className={styles.imageSection}>
          <img
            src={imagen1}
            alt="Consejería Psicológica"
            className={styles.singleImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsejeriaPsicologia;
