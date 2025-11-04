import PropTypes from "prop-types";
import styles from "../../../styles/adminstyles/activityCard.module.css";

const ActividadCard = ({
  nombre,
  participantes,
  cuposDisponibles,
  tipo,
  onMoreInfo,
}) => {
  const getIcon = () => {
    switch (tipo) {
      case "deporte":
        return "pi pi-trophy";
      case "cultura":
        return "pi pi-palette";
      default:
        return "pi pi-circle";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.title}>{nombre}</h3>
          <p className={styles.participants}>Participantes: {participantes}</p>
          <div className={styles.status}>
            <span
              className={`${styles.statusDot} ${
                cuposDisponibles ? styles.available : styles.unavailable
              }`}
            ></span>
            <span className={styles.statusText}>
              {cuposDisponibles ? "Cupos disponibles" : "Sin cupos"}
            </span>
          </div>
        </div>
        <div className={styles.iconContainer}>
          <i className={`${getIcon()} ${styles.icon}`}></i>
        </div>
      </div>
      <button className={styles.button} onClick={onMoreInfo}>
        Más Información
      </button>
    </div>
  );
};

ActividadCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  participantes: PropTypes.number.isRequired,
  cuposDisponibles: PropTypes.bool.isRequired,
  tipo: PropTypes.oneOf(["deporte", "cultura"]).isRequired,
  onMoreInfo: PropTypes.func,
};

ActividadCard.defaultProps = {
  onMoreInfo: () => {},
};

export default ActividadCard;
