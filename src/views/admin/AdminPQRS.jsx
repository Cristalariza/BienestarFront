import Table from "../../components/admin/tables/Table";
import SearchBar from "../../components/admin/buscar/SearchBar";
import Button from "../../components/admin/buttom/Button";
import { useAdminPQRS } from "../../hooks/useAdminPQRS";
import { Toast } from 'primereact/toast';
import styles from "../../styles/adminstyles/adminPQRS.module.css";

const AdminPQRS = () => {
  const {
    toast,
    searchTerm,
    selectedFilter,
    currentPage,
    selectedPQRS,
    showModal,
    respuesta,
    setRespuesta,
    getFilteredData,
    getPaginatedData,
    handleSearch,
    handleClearSearch,
    handleFilterChange,
    handlePageChange,
    handleViewDetails,
    handleCloseModal,
    handleChangeStatus,
    handleSaveResponse,
    handleExport,
    loading,
  } = useAdminPQRS();

  const itemsPerPage = 10;
  const filteredData = getFilteredData();
  const { paginatedData, totalPages } = getPaginatedData(
    filteredData,
    itemsPerPage
  );

  // Definición de columnas para la tabla
  const columns = [
    {
      key: "nombre",
      label: "Nombre",
      sortable: true,
    },
    {
      key: "correo",
      label: "Correo",
      sortable: true,
    },
    {
      key: "documento",
      label: "Documento",
      sortable: false,
    },
    {
      key: "tipoSolicitud",
      label: "Tipo",
      sortable: true,
      render: (value) => (
        <span className={`${styles.tipoBadge} ${styles[value.toLowerCase()]}`}>
          {value}
        </span>
      ),
    },
    {
      key: "dependencia",
      label: "Dependencia",
      sortable: true,
    },
    {
      key: "asunto",
      label: "Asunto",
      sortable: false,
    },
    {
      key: "descripcion",
      label: "Descripción",
      sortable: false,
      render: (value) => (
        <span className={styles.descripcionCell}>
          {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </span>
      ),
    },
    {
      key: "estado",
      label: "Estado",
      sortable: true,
      render: (value) => (
        <span
          className={`${styles.estadoBadge} ${
            styles[value.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-")]
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "acciones",
      label: "Acciones",
      sortable: false,
      render: (value, row) => (
        <button
          className={styles.verButton}
          onClick={() => handleViewDetails(row)}
        >
          <i className="pi pi-eye"></i>
          <span>Ver</span>
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de PQRS</h1>
      </div>

      <div className={styles.controls}>
        <SearchBar
          value={searchTerm}
          onChange={handleSearch}
          onClear={handleClearSearch}
          placeholder="Buscar por nombre, correo, asunto..."
        />

        <div className={styles.actions}>
          <div className={styles.filterButtons}>
            <Button
              label="Todos"
              variant={selectedFilter === "todos" ? "primary" : "outline"}
              onClick={() => handleFilterChange("todos")}
            />
            <Button
              label="Petición"
              variant={selectedFilter === "petición" ? "primary" : "outline"}
              onClick={() => handleFilterChange("petición")}
            />
            <Button
              label="Queja"
              variant={selectedFilter === "queja" ? "primary" : "outline"}
              onClick={() => handleFilterChange("queja")}
            />
            <Button
              label="Reclamo"
              variant={selectedFilter === "reclamo" ? "primary" : "outline"}
              onClick={() => handleFilterChange("reclamo")}
            />
            <Button
              label="Sugerencia"
              variant={selectedFilter === "sugerencia" ? "primary" : "outline"}
              onClick={() => handleFilterChange("sugerencia")}
            />
          </div>

          <Button
            label="Exportar"
            variant="secondary"
            icon="pi pi-file-excel"
            iconPos="left"
            onClick={handleExport}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <Table
          columns={columns}
          data={paginatedData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className={styles.stats}>
        <p>
          Total de PQRS: <strong>{filteredData.length}</strong>
        </p>
      </div>

      {/* Modal de detalles */}
      {showModal && selectedPQRS && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Detalles de PQRS</h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <i className="pi pi-times"></i>
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Tipo de Solicitud:</span>
                <span
                  className={`${styles.tipoBadge} ${
                    styles[selectedPQRS.tipoSolicitud.toLowerCase()]
                  }`}
                >
                  {selectedPQRS.tipoSolicitud}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Fecha:</span>
                <span className={styles.detailValue}>{selectedPQRS.fecha}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Estado:</span>
                <span className={styles.detailValue}>
                  {selectedPQRS.estado}
                </span>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>Cambiar Estado</h3>
                <div className={styles.statusButtons}>
                  <button
                    className={`${styles.statusButton} ${
                      selectedPQRS.estado === "En revisión"
                        ? styles.statusActive
                        : ""
                    }`}
                    onClick={() => handleChangeStatus("En revisión")}
                  >
                    En revisión
                  </button>
                  <button
                    className={`${styles.statusButton} ${
                      selectedPQRS.estado === "En trámite"
                        ? styles.statusActive
                        : ""
                    }`}
                    onClick={() => handleChangeStatus("En trámite")}
                  >
                    En trámite
                  </button>
                  <button
                    className={`${styles.statusButton} ${
                      selectedPQRS.estado === "Consulta/Respuesta"
                        ? styles.statusActive
                        : ""
                    }`}
                    onClick={() => handleChangeStatus("Consulta/Respuesta")}
                  >
                    Respuesta
                  </button>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  Información del Solicitante
                </h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Nombre:</span>
                  <span className={styles.detailValue}>
                    {selectedPQRS.nombre}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Correo:</span>
                  <span className={styles.detailValue}>
                    {selectedPQRS.correo}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Documento:</span>
                  <span className={styles.detailValue}>
                    {selectedPQRS.documento}
                  </span>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  Detalles de la Solicitud
                </h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Dependencia:</span>
                  <span className={styles.detailValue}>
                    {selectedPQRS.dependencia}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Asunto:</span>
                  <span className={styles.detailValue}>
                    {selectedPQRS.asunto}
                  </span>
                </div>
                <div className={styles.detailColumn}>
                  <span className={styles.detailLabel}>Descripción:</span>
                  <p className={styles.descripcionFull}>
                    {selectedPQRS.descripcion}
                  </p>
                </div>
              </div>

              {selectedPQRS.archivo && (
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Archivo Adjunto</h3>
                  <button className={styles.downloadButton}>
                    <i className="pi pi-download"></i>
                    Descargar {selectedPQRS.archivo}
                  </button>
                </div>
              )}

              {/* Sección de Respuesta */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>Respuesta</h3>
                <div className={styles.detailColumn}>
                  <label className={styles.detailLabel}>
                    Escribe tu respuesta:
                  </label>
                  <textarea
                    className={styles.responseTextarea}
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    placeholder="Escribe la respuesta para esta PQRS..."
                    rows="6"
                    disabled={loading}
                  />
                  <Button
                    label="Guardar Respuesta"
                    variant="primary"
                    icon="pi pi-save"
                    iconPos="left"
                    onClick={handleSaveResponse}
                    disabled={loading || !respuesta.trim()}
                  />
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <Button
                label="Cerrar"
                variant="outline"
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPQRS;
