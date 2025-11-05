import { useNavigate } from "react-router-dom";
import { useAdminCultura } from "../../../hooks/useAdminCultura";
import ActividadCard from "../../../components/admin/card/ActividadCard";
import Button from "../../../components/admin/buttom/Button";
import { Toast } from "primereact/toast";
import styles from "../../../styles/adminstyles/adminCultura.module.css";
import modalStyles from "../../../styles/adminstyles/adminNoticias.module.css";

const GruposCulturales = () => {
  const navigate = useNavigate();

  const {
    showModal,
    editingPrograma,
    formData,
    loading,
    toast,
    programas,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleToggleEstado,
  } = useAdminCultura();

  const handleMoreInfo = (nombre) => {
    navigate(`/admin/cultura/grupos/${encodeURIComponent(nombre)}`);
  };

  if (loading && programas.length === 0) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          <p>Cargando programas culturales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <div className={styles.header}>
        <h1 className={styles.title}>Grupos Culturales</h1>
        <Button
          label="Nuevo Programa"
          variant="primary"
          icon="pi pi-plus"
          onClick={handleOpenCreateModal}
        />
      </div>

      <div className={styles.grid}>
        {programas.map((programa) => (
          <ActividadCard
            key={programa.programa_id}
            nombre={programa.nombre}
            participantes={0} // TODO: Integrar con inscripciones
            cuposDisponibles={programa.cupos_disponibles}
            tipo="cultura"
            onMoreInfo={() => handleMoreInfo(programa.nombre)}
            onEdit={() => handleOpenEditModal(programa)}
            onDelete={() => handleDelete(programa.programa_id)}
            onToggleEstado={() => handleToggleEstado(programa.programa_id, programa.estado)}
            estado={programa.estado}
          />
        ))}
      </div>

      {programas.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <i className="pi pi-info-circle" style={{ fontSize: '3rem', color: '#6b7280' }}></i>
          <p style={{ color: '#6b7280', marginTop: '1rem' }}>
            No hay programas culturales creados. Crea uno nuevo haciendo clic en "Nuevo Programa".
          </p>
        </div>
      )}

      {showModal && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modal}>
            <div className={modalStyles.modalHeader}>
              <h2 className={modalStyles.modalTitle}>
                {editingPrograma ? "Editar Programa Cultural" : "Nuevo Programa Cultural"}
              </h2>
              <button className={modalStyles.btnClose} onClick={handleCloseModal}>
                <i className="pi pi-times"></i>
              </button>
            </div>

            <div className={modalStyles.modalBody}>
              <div className={modalStyles.formGroup}>
                <label htmlFor="nombre" className={modalStyles.label}>
                  Nombre del Programa <span className={modalStyles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className={modalStyles.input}
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Danza Folclórica, Teatro, Música"
                  required
                />
              </div>

              <div className={modalStyles.formGroup}>
                <label htmlFor="descripcion" className={modalStyles.label}>
                  Descripción <span className={modalStyles.required}>*</span>
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className={modalStyles.textarea}
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe el programa cultural..."
                  rows="4"
                  required
                />
              </div>

              <div className={modalStyles.formRow}>
                <div className={modalStyles.formGroup}>
                  <label htmlFor="cupos_totales" className={modalStyles.label}>
                    Cupos Totales <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    id="cupos_totales"
                    name="cupos_totales"
                    className={modalStyles.input}
                    value={formData.cupos_totales}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>

                <div className={modalStyles.formGroup}>
                  <label htmlFor="instructor" className={modalStyles.label}>
                    Instructor <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="instructor"
                    name="instructor"
                    className={modalStyles.input}
                    value={formData.instructor}
                    onChange={handleInputChange}
                    placeholder="Nombre del instructor"
                    required
                  />
                </div>
              </div>

              <div className={modalStyles.formGroup}>
                <label htmlFor="horario" className={modalStyles.label}>
                  Horario <span className={modalStyles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="horario"
                  name="horario"
                  className={modalStyles.input}
                  value={formData.horario}
                  onChange={handleInputChange}
                  placeholder="Ej: Lunes y Miércoles 2:00 PM - 4:00 PM"
                  required
                />
              </div>

              <div className={modalStyles.formRow}>
                <div className={modalStyles.formGroup}>
                  <label htmlFor="fecha_inicio" className={modalStyles.label}>
                    Fecha de Inicio <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="fecha_inicio"
                    name="fecha_inicio"
                    className={modalStyles.input}
                    value={formData.fecha_inicio}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={modalStyles.formGroup}>
                  <label htmlFor="fecha_fin" className={modalStyles.label}>
                    Fecha de Fin <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="fecha_fin"
                    name="fecha_fin"
                    className={modalStyles.input}
                    value={formData.fecha_fin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={modalStyles.formGroup}>
                <label htmlFor="ubicacion" className={modalStyles.label}>
                  Ubicación <span className={modalStyles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  className={modalStyles.input}
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  placeholder="Ej: Auditorio Principal, Sala de Artes"
                  required
                />
              </div>
            </div>

            <div className={modalStyles.modalFooter}>
              <Button
                label="Cancelar"
                variant="secondary"
                onClick={handleCloseModal}
                disabled={loading}
              />
              <Button
                label={editingPrograma ? "Actualizar" : "Crear"}
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GruposCulturales;
