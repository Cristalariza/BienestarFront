import { useAdminNoticias } from "../../hooks/useAdminNoticias";
import Table from "../../components/admin/tables/Table";
import Button from "../../components/admin/buttom/Button";
import SearchBar from "../../components/admin/buscar/SearchBar";
import { Toast } from "primereact/toast";
import styles from "../../styles/adminstyles/adminNoticias.module.css";

export const AdminNoticias = () => {
  console.log('Renderizando AdminNoticias...');

  const {
    searchTerm,
    currentPage,
    showModal,
    editingNoticia,
    formData,
    loading,
    toast,
    getFilteredData,
    getPaginatedData,
    handleSearch,
    handleClearSearch,
    handlePageChange,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleToggleEstado,
  } = useAdminNoticias();

  console.log('Hook useAdminNoticias cargado, loading:', loading);

  let filteredData = [];
  let paginatedData = [];
  let totalPages = 0;

  try {
    filteredData = getFilteredData();
    console.log('Datos filtrados:', filteredData);

    const paginationResult = getPaginatedData(filteredData);
    paginatedData = paginationResult.paginatedData;
    totalPages = paginationResult.totalPages;
    console.log('Datos paginados:', paginatedData, 'Total páginas:', totalPages);
  } catch (error) {
    console.error('Error al procesar datos:', error);
  }

  if (loading && paginatedData.length === 0) {
    console.log('Mostrando loading...');
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          <p>Cargando noticias...</p>
        </div>
      </div>
    );
  }

  console.log('Renderizando contenido principal...');

  // Función para formatear fecha sin problemas de zona horaria
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const dateStr = fecha.split('T')[0]; // Obtener YYYY-MM-DD
    const [year, month, day] = dateStr.split('-').map(num => parseInt(num));
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("es-CO");
  };

  const columns = [
    {
      key: "nombre",
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
      render: (value) => formatearFecha(value),
    },
    {
      key: "imagen",
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
      key: "estado",
      label: "Estado",
      sortable: true,
      render: (value, row) => (
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
              row.estado ? styles.btnDesactivar : styles.btnActivar
            }`}
            onClick={() => handleToggleEstado(row.noticia_id, row.estado)}
            title={row.estado ? "Desactivar" : "Activar"}
          >
            <i className={row.estado ? "pi pi-eye-slash" : "pi pi-eye"}></i>
          </button>
          <button
            className={`${styles.btnAccion} ${styles.btnEliminar}`}
            onClick={() => handleDelete(row.noticia_id)}
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
      <Toast ref={toast} />
      <div className={styles.header}>
        <h1 className={styles.title}>Administración de Noticias</h1>
        <Button
          label="Nueva Noticia"
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
          placeholder="Buscar por título o descripción..."
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
                {editingNoticia ? "Editar Noticia" : "Nueva Noticia"}
              </h2>
              <button className={styles.btnClose} onClick={handleCloseModal}>
                <i className="pi pi-times"></i>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre" className={styles.label}>
                  Título <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  className={styles.input}
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ingrese el título de la noticia"
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
                  placeholder="Ingrese la descripción de la noticia"
                  rows="4"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="categoria" className={styles.label}>
                  Categoría <span className={styles.required}>*</span>
                </label>
                <select
                  id="categoria"
                  className={styles.input}
                  value={formData.categoria}
                  onChange={(e) => handleInputChange("categoria", e.target.value)}
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="Académico">Académico</option>
                  <option value="Deportivo">Deportivo</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Bienestar">Bienestar</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="imagen" className={styles.label}>
                  URL de Imagen (Opcional)
                </label>
                <input
                  type="text"
                  id="imagen"
                  className={styles.input}
                  value={formData.imagen}
                  onChange={(e) => handleInputChange("imagen", e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <small className={styles.hint}>
                  Ingrese la URL completa de la imagen
                </small>
              </div>

              {editingNoticia && (
                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.estado}
                      onChange={(e) =>
                        handleInputChange("estado", e.target.checked)
                      }
                    />
                    <span>Noticia activa</span>
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
                label={editingNoticia ? "Actualizar" : "Crear"}
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
