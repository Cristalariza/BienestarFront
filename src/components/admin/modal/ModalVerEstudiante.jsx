import React from "react";
import styles from "../../../styles/adminstyles/modalVerEstudiante.module.css";

const ModalVerEstudiante = ({ estudiante, onClose }) => {
  if (!estudiante) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Información del Estudiante</h2>

        <div className={styles.contentGrid}>
          <div>
            <p>
              <strong>Nombres y Apellidos:</strong> {estudiante.nombre}
            </p>
            <p>
              <strong>Identificación:</strong> {estudiante.codigo}
            </p>
            <p>
              <strong>Fecha y Lugar de Nacimiento:</strong>{" "}
              {estudiante.nacimiento}
            </p>
            <p>
              <strong>Estado Civil:</strong> {estudiante.estadoCivil}
            </p>
            <p>
              <strong>Dirección:</strong> {estudiante.direccion}
            </p>
          </div>

          <div>
            <p>
              <strong>Colegio Egresado:</strong> {estudiante.colegio}
            </p>
            <p>
              <strong>Carrera:</strong> {estudiante.carrera}
            </p>
            <p>
              <strong>Semestre:</strong> {estudiante.semestre}
            </p>
            <p>
              <strong>Promedio:</strong> {estudiante.promedio}
            </p>
            <p>
              <strong>Teléfono:</strong> {estudiante.telefono}
            </p>
            <p>
              <strong>Correo:</strong> {estudiante.correo}
            </p>
          </div>
        </div>

        <div className={styles.extraSection}>
          <h3>Datos Familiares</h3>
          <p>
            <strong>Nombre de la Madre:</strong> {estudiante.madre}
          </p>
          <p>
            <strong>Nombre del Padre:</strong> {estudiante.padre}
          </p>
          <p>
            <strong>Aspiraciones:</strong> {estudiante.aspiraciones}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalVerEstudiante;
