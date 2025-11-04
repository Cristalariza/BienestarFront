import { useAdminEventos } from "../../hooks/useAdminEventos";
import Table from "../../components/admin/tables/Table";
import Button from "../../components/admin/buttom/Button";
import SearchBar from "../../components/admin/buscar/SearchBar";
import styles from "../../styles/adminstyles/adminEventos.module.css";

export const AdminEventos = () => {
  const {
    searchTerm,
    currentPage,
    showModal,
    editingEvento,
    formData,
    getFilteredData,
    getPaginatedData,
    handleSearch,
    handleClearSearch,
    handlePageChange,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleDelete,
    handleToggleActivo,
  } = useAdminEventos();

  const filteredData = getFilteredData();
  const { paginatedData, totalPages } = getPaginatedData(filteredData);

  const columns = [
    {
      key: "titulo",
      label: "Título",
      sortable: true,
    },
    {
      key: "descripcion",
      label: "Descripción",
      sortable: false,
      render: (value) => <div className={styles.descripcionCell}>{value}</div>,
    },
    {
      key: "fecha",
      label: "Fecha",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString("es-CO"),
    },
    {
      key: "lugar",
      label: "Lugar",
      sortable: false,
      render: (value) => value || "No especificado",
    },
    {
      key: "organizador",
      label: "Organizador",
      sortable: true,
    },
    {
      key: "imagen_url",
      label: "Imagen",
      sortable: false,
      render: (value) => (
        <div className={styles.imagenCell}>
          {value ? (
            <i
              className="pi pi-image"
              style={{ fontSize: "1.2rem", color: "#28a745" }}
            ></i>
          ) : (
            <i
              className="pi pi-times"
              style={{ fontSize: "1.2rem", color: "#dc3545" }}
            ></i>
          )}
        </div>
      ),
    },
    {
      key: "activo",
      label: "Estado",
      sortable: true,
      render: (value) => (
        <span
          className={`${styles.estadoBadge} ${
            value ? styles.activo : styles.inactivo
          }`}
        >
          {value ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "acciones",
      label: "Acciones",
      sortable: false,
      render: (_, row) => (
        <div className={styles.accionesCell}>
          <button
            className={styles.btnAccion}
            onClick={() => handleOpenEditModal(row)}
            title="Editar"
          >
            <i className="pi pi-pencil"></i>
          </button>
          <button
            className={`${styles.btnAccion} ${
              row.activo ? styles.btnDesactivar : styles.btnActivar
            }`}
            onClick={() => handleToggleActivo(row.evento_id, row.activo)}
            title={row.activo ? "Desactivar" : "Activar"}
          >
            <i className={row.activo ? "pi pi-eye-slash" : "pi pi-eye"}></i>
          </button>
          <button
            className={`${styles.btnAccion} ${styles.btnEliminar}`}
            onClick={() => handleDelete(row.evento_id)}
            title="Eliminar"
          >
            <i className="pi pi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Administración de Eventos</h1>
        <Button
          label="Nuevo Evento"
          variant="primary"
          icon="pi pi-plus"
          onClick={handleOpenCreateModal}
        />
      </div>

      <div className={styles.searchBar}>
        <SearchBar
          value={searchTerm}
          onChange={handleSearch}
          onClear={handleClearSearch}
          placeholder="Buscar por título, descripción, lugar u organizador..."
        />
      </div>

      <div className={styles.tableContainer}>
        <Table
          columns={columns}
          data={paginatedData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingEvento ? "Editar Evento" : "Nuevo Evento"}
              </h2>
              <button className={styles.btnClose} onClick={handleCloseModal}>
                <i className="pi pi-times"></i>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label htmlFor="titulo" className={styles.label}>
                  Título <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="titulo"
                  className={styles.input}
                  value={formData.titulo}
                  onChange={(e) => handleInputChange("titulo", e.target.value)}
                  placeholder="Ingrese el título del evento"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="descripcion" className={styles.label}>
                  Descripción <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="descripcion"
                  className={styles.textarea}
                  value={formData.descripcion}
                  onChange={(e) =>
                    handleInputChange("descripcion", e.target.value)
                  }
                  placeholder="Ingrese la descripción del evento"
                  rows="4"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fecha" className={styles.label}>
                    Fecha <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="fecha"
                    className={styles.input}
                    value={formData.fecha}
                    onChange={(e) => handleInputChange("fecha", e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lugar" className={styles.label}>
                    Lugar
                  </label>
                  <input
                    type="text"
                    id="lugar"
                    className={styles.input}
                    value={formData.lugar}
                    onChange={(e) => handleInputChange("lugar", e.target.value)}
                    placeholder="Auditorio, sala, etc."
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="organizador" className={styles.label}>
                  Organizador <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="organizador"
                  className={styles.input}
                  value={formData.organizador}
                  onChange={(e) =>
                    handleInputChange("organizador", e.target.value)
                  }
                  placeholder="Facultad, departamento, etc."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="imagen_url" className={styles.label}>
                  Imagen (Opcional)
                </label>
                <input
                  type="file"
                  id="imagen_url"
                  className={styles.fileInput}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
                <small className={styles.hint}>
                  Tamaño máximo: 5MB. Formatos: JPG, PNG, WEBP
                </small>
              </div>

              {editingEvento && (
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.activo}
                      onChange={(e) =>
                        handleInputChange("activo", e.target.checked)
                      }
                    />
                    <span>Evento activo</span>
                  </label>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <Button
                label="Cancelar"
                variant="secondary"
                onClick={handleCloseModal}
              />
              <Button
                label={editingEvento ? "Actualizar" : "Crear"}
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
