import styles from "../../styles/ayudaSocial.module.css";
import imagen1 from "../../assets/Ayuda_Social/Trabajo_Social/TRAB-01.png";

const ServicioTrabajoSocial = () => {
  return (
    <div className={styles.container}>
      <div className={styles.horizontalLayout}>
        <div className={styles.textSection}>
          <p className={styles.descriptionBold}>
            Encargado de adelantar de manera precisa estudios socioeconómicos de
            los beneficiarios, realizando a su vez visitas domiciliarias que nos
            permitan conocer las necesidades reales de los estudiantes más
            vulnerables en busca de una solución viable a su situación
            socioeconómica, buscando transformar las condiciones que
            obstaculicen el logro de una mejor calidad de vida ya sea en el
            ámbito individual o familiar, apoyando la sostenibilidad económica
            del estudiante.
          </p>
        </div>
        <div className={styles.imageSection}>
          <img
            src={imagen1}
            alt="Servicio de Trabajo Social"
            className={styles.singleImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicioTrabajoSocial;
