import { useAdminEventos } from "../../hooks/useAdminEventos";
import { Toast } from "primereact/toast";
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
    loading,
    toast,
    eventos,
    showInactive,
    setShowInactive,
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

  if (loading && eventos.length === 0) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          <p>Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

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

        {/* Checkbox para mostrar eventos inactivos */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            id="showInactiveCheckbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          <label
            htmlFor="showInactiveCheckbox"
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            Mostrar solo eventos inactivos
          </label>
        </div>

        {searchTerm && (
          <p className={styles.searchResults}>
            {filteredData.length} resultado
            {filteredData.length !== 1 ? "s" : ""} encontrado
            {filteredData.length !== 1 ? "s" : ""}
          </p>
        )}
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
                  name="titulo"
                  className={styles.input}
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ingrese el título del evento"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="descripcion" className={styles.label}>
                  Descripción <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className={styles.textarea}
                  value={formData.descripcion}
                  onChange={handleInputChange}
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
                    name="fecha"
                    className={styles.input}
                    value={formData.fecha}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lugar" className={styles.label}>
                    Lugar
                  </label>
                  <input
                    type="text"
                    id="lugar"
                    name="lugar"
                    className={styles.input}
                    value={formData.lugar}
                    onChange={handleInputChange}
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
                  name="organizador"
                  className={styles.input}
                  value={formData.organizador}
                  onChange={handleInputChange}
                  placeholder="Facultad, departamento, etc."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="imagen_url" className={styles.label}>
                  Imagen URL (Opcional)
                </label>
                <input
                  type="text"
                  id="imagen_url"
                  name="imagen_url"
                  className={styles.input}
                  value={formData.imagen_url}
                  onChange={handleInputChange}
                  placeholder="URL de la imagen del evento"
                />
                <small className={styles.hint}>
                  Ingresa la URL de la imagen del evento
                </small>
              </div>

              {editingEvento && (
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="activo"
                      checked={formData.activo}
                      onChange={handleInputChange}
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
                disabled={loading}
              />
              <Button
                label={editingEvento ? "Actualizar" : "Crear"}
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
