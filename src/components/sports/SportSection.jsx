import { useState } from "react";
import styles from "../../styles/sports.module.css";
import { programs } from "../../constants/sports";
import { InscripcionDeportivaForm } from "../forms";

function SportSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleInscribirse = (program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  const handleSubmitInscripcion = (formData) => {
    console.log("Datos de inscripción:", {
      programa: selectedProgram,
      ...formData,
    });
    // Aquí enviarías los datos al backend
    alert("¡Inscripción enviada exitosamente!");
    handleCloseModal();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.grid}>
          {programs.map((program) => (
            <div key={program.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img
                  src={program.image}
                  alt={program.title}
                  className={styles.image}
                />
                <span className={styles.badge}>Bienestar</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{program.title}</h3>
                <div className={styles.info}>
                  <div className={styles.infoItem}>
                    <i className="fa-solid fa-clock"></i>
                    <span>{program.schedule}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <i className="fa-solid fa-user"></i>
                    <span>{program.enrolled} inscritos</span>
                  </div>
                </div>
                <div className={styles.requirementsSection}>
                  <h4 className={styles.requirementsTitle}>Requisitos:</h4>
                  <div className={styles.requirementsList}>
                    {program.requirements.map((req, idx) => (
                      <div key={idx} className={styles.requirementItem}>
                        <svg
                          className={styles.checkIcon}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className={styles.requirementText}>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className={styles.button}
                  onClick={() => handleInscribirse(program)}
                >
                  Inscribirme Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal del formulario de inscripción */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={handleCloseModal}>
              <i className="pi pi-times"></i>
            </button>
            <InscripcionDeportivaForm
              programaSeleccionado={selectedProgram}
              onSubmit={handleSubmitInscripcion}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default SportSection;
