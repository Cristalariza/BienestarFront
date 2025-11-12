import PropTypes from "prop-types";
import styles from "../../../styles/adminstyles/activityCard.module.css";

const ActividadCard = ({
  nombre,
  participantes,
  cuposDisponibles,
  tipo,
  onMoreInfo,
  onEdit,
  onDelete,
  onToggleEstado,
  estado,
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

  // Determinar si cuposDisponibles es un número o boolean
  const cuposNumero =
    typeof cuposDisponibles === "number" ? cuposDisponibles : null;
  const tieneCupos = cuposNumero !== null ? cuposNumero > 0 : cuposDisponibles;

  return (
    <div className={`${styles.card} ${!estado ? styles.inactive : ""}`}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.title}>{nombre}</h3>
          <p className={styles.participants}>Participantes: {participantes}</p>
          <div className={styles.status}>
            <span
              className={`${styles.statusDot} ${
                tieneCupos ? styles.available : styles.unavailable
              }`}
            ></span>
            <span className={styles.statusText}>
              {cuposNumero !== null
                ? `Cupos disponibles: ${cuposNumero}`
                : tieneCupos
                ? "Cupos disponibles"
                : "Sin cupos"}
            </span>
          </div>
          {estado !== undefined && (
            <div className={styles.estadoBadge}>
              <span className={estado ? styles.activo : styles.inactivo}>
                {estado ? "Activo" : "Inactivo"}
              </span>
            </div>
          )}
        </div>
        <div className={styles.iconContainer}>
          <i className={`${getIcon()} ${styles.icon}`}></i>
        </div>
      </div>

      {/* Acciones administrativas */}
      {(onEdit || onDelete || onToggleEstado) && (
        <div className={styles.actions}>
          {onEdit && (
            <button
              className={`${styles.actionBtn} ${styles.editBtn}`}
              onClick={onEdit}
              title="Editar"
            >
              <i className="pi pi-pencil"></i>
            </button>
          )}
          {onDelete && (
            <button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={onDelete}
              title="Eliminar"
            >
              <i className="pi pi-trash"></i>
            </button>
          )}
        </div>
      )}

      <button className={styles.button} onClick={onMoreInfo}>
        Más Información
      </button>
    </div>
  );
};

ActividadCard.propTypes = {
  nombre: PropTypes.string.isRequired,
  participantes: PropTypes.number.isRequired,
  cuposDisponibles: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
    .isRequired,
  tipo: PropTypes.oneOf(["deporte", "cultura"]).isRequired,
  onMoreInfo: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleEstado: PropTypes.func,
  estado: PropTypes.bool,
};

ActividadCard.defaultProps = {
  onMoreInfo: () => {},
  onEdit: null,
  onDelete: null,
  onToggleEstado: null,
  estado: undefined,
};

export default ActividadCard;
