import { useNavigate } from "react-router-dom";
import { useAdminDeporte } from "../../hooks/useAdminDeporte";
import ActividadCard from "../../components/admin/card/ActividadCard";
import Button from "../../components/admin/buttom/Button";
import { Toast } from "primereact/toast";
import styles from "../../styles/adminstyles/adminCultura.module.css";
import modalStyles from "../../styles/adminstyles/adminNoticias.module.css";

const AdminDeporte = () => {
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
  } = useAdminDeporte();

  const handleMoreInfo = (nombre) => {
    navigate(`/admin/deporte/${encodeURIComponent(nombre)}`);
  };

  if (loading && programas.length === 0) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          <p>Cargando programas deportivos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <div className={styles.header}>
        <h1 className={styles.title}>Programas Deportivos</h1>
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
            cuposDisponibles={programa.cupos_disponibles > 0}
            tipo="deporte"
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
            No hay programas deportivos creados. Crea uno nuevo haciendo clic en "Nuevo Programa".
          </p>
        </div>
      )}

      {showModal && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modal}>
            <div className={modalStyles.modalHeader}>
              <h2 className={modalStyles.modalTitle}>
                {editingPrograma ? "Editar Programa Deportivo" : "Nuevo Programa Deportivo"}
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
                  className={modalStyles.input}
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ej: Fútbol Masculino, Voleibol Femenino"
                />
              </div>

              <div className={modalStyles.formGroup}>
                <label htmlFor="deporte" className={modalStyles.label}>
                  Tipo de Deporte <span className={modalStyles.required}>*</span>
                </label>
                <select
                  id="deporte"
                  className={modalStyles.input}
                  value={formData.deporte}
                  onChange={(e) => handleInputChange("deporte", e.target.value)}
                >
                  <option value="">Seleccione un deporte</option>
                  <option value="Fútbol">Fútbol</option>
                  <option value="Voleibol">Voleibol</option>
                  <option value="Baloncesto">Baloncesto</option>
                  <option value="Atletismo">Atletismo</option>
                  <option value="Natación">Natación</option>
                  <option value="Tenis">Tenis</option>
                  <option value="Ciclismo">Ciclismo</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className={modalStyles.formGroup}>
                <label htmlFor="descripcion" className={modalStyles.label}>
                  Descripción <span className={modalStyles.required}>*</span>
                </label>
                <textarea
                  id="descripcion"
                  className={modalStyles.textarea}
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  placeholder="Describe el programa deportivo"
                  rows="4"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={modalStyles.formGroup}>
                  <label htmlFor="fecha_inicio" className={modalStyles.label}>
                    Fecha de Inicio <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="fecha_inicio"
                    className={modalStyles.input}
                    value={formData.fecha_inicio}
                    onChange={(e) => handleInputChange("fecha_inicio", e.target.value)}
                  />
                </div>

                <div className={modalStyles.formGroup}>
                  <label htmlFor="fecha_fin" className={modalStyles.label}>
                    Fecha de Fin <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="fecha_fin"
                    className={modalStyles.input}
                    value={formData.fecha_fin}
                    onChange={(e) => handleInputChange("fecha_fin", e.target.value)}
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
                  className={modalStyles.input}
                  value={formData.horario}
                  onChange={(e) => handleInputChange("horario", e.target.value)}
                  placeholder="Ej: Lunes y Miércoles 6:00 PM - 8:00 PM"
                />
              </div>

              <div className={modalStyles.formGroup}>
                <label htmlFor="instructor" className={modalStyles.label}>
                  Instructor <span className={modalStyles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="instructor"
                  className={modalStyles.input}
                  value={formData.instructor}
                  onChange={(e) => handleInputChange("instructor", e.target.value)}
                  placeholder="Nombre del instructor"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={modalStyles.formGroup}>
                  <label htmlFor="cupos_disponibles" className={modalStyles.label}>
                    Cupos Disponibles <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    id="cupos_disponibles"
                    className={modalStyles.input}
                    value={formData.cupos_disponibles}
                    onChange={(e) => handleInputChange("cupos_disponibles", e.target.value)}
                    min="1"
                  />
                </div>

                <div className={modalStyles.formGroup}>
                  <label htmlFor="ubicacion" className={modalStyles.label}>
                    Ubicación <span className={modalStyles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="ubicacion"
                    className={modalStyles.input}
                    value={formData.ubicacion}
                    onChange={(e) => handleInputChange("ubicacion", e.target.value)}
                    placeholder="Ej: Cancha Principal"
                  />
                </div>
              </div>

              {editingPrograma && (
                <div className={modalStyles.formGroup}>
                  <label className={modalStyles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.estado}
                      onChange={(e) => handleInputChange("estado", e.target.checked)}
                    />
                    <span>Programa activo</span>
                  </label>
                </div>
              )}
            </div>

            <div className={modalStyles.modalFooter}>
              <Button
                label="Cancelar"
                variant="secondary"
                onClick={handleCloseModal}
              />
              <Button
                label={editingPrograma ? "Actualizar" : "Crear"}
                variant="primary"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeporte;
