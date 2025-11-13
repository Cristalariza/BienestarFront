import Table from "../../components/admin/tables/Table";
import SearchBar from "../../components/admin/buscar/SearchBar";
import Button from "../../components/admin/buttom/Button";
import { useStudentPQRS } from "../../hooks/useStudentPQRS";
import { Toast } from 'primereact/toast';
import styles from "../../styles/studentstyles/myPQRS.module.css";

const MyPQRS = () => {
  const {
    toast,
    searchTerm,
    selectedFilter,
    currentPage,
    selectedPQRS,
    showModal,
    pqrsData,
    loading,
    getFilteredData,
    getPaginatedData,
    handleSearch,
    handleClearSearch,
    handleFilterChange,
    handlePageChange,
    handleViewDetails,
    handleCloseModal,
  } = useStudentPQRS();

  const itemsPerPage = 10;
  const filteredData = getFilteredData();
  const { paginatedData, totalPages } = getPaginatedData(
    filteredData,
    itemsPerPage
  );

  // Definición de columnas para la tabla
  const columns = [
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
      key: "fecha",
      label: "Fecha",
      sortable: true,
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
        <h1 className={styles.title}>Mis PQRS</h1>
        <p className={styles.subtitle}>
          Consulta el estado y respuestas de tus solicitudes
        </p>
      </div>

      <div className={styles.controls}>
        <SearchBar
          value={searchTerm}
          onChange={handleSearch}
          onClear={handleClearSearch}
          placeholder="Buscar por asunto, tipo..."
        />

        <div className={styles.filterButtons}>
          <Button
            label="Todas"
            variant={selectedFilter === "todos" ? "primary" : "outline"}
            onClick={() => handleFilterChange("todos")}
          />
          <Button
            label="En revisión"
            variant={selectedFilter === "en revisión" ? "primary" : "outline"}
            onClick={() => handleFilterChange("en revisión")}
          />
          <Button
            label="En trámite"
            variant={selectedFilter === "en trámite" ? "primary" : "outline"}
            onClick={() => handleFilterChange("en trámite")}
          />
          <Button
            label="Respondidas"
            variant={selectedFilter === "consulta/respuesta" ? "primary" : "outline"}
            onClick={() => handleFilterChange("consulta/respuesta")}
          />
          <Button
            label="Cerradas"
            variant={selectedFilter === "cerrada" ? "primary" : "outline"}
            onClick={() => handleFilterChange("cerrada")}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
            <p>Cargando tus PQRS...</p>
          </div>
        ) : paginatedData.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="pi pi-inbox" style={{ fontSize: '3rem', color: '#999' }}></i>
            <h3>No hay PQRS para mostrar</h3>
            <p>Aún no has creado ninguna solicitud</p>
          </div>
        ) : (
          <Table
            columns={columns}
            data={paginatedData}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <div className={styles.stats}>
        <p>
          Total de mis PQRS: <strong>{filteredData.length}</strong>
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
              <h2 className={styles.modalTitle}>Detalles de mi PQRS</h2>
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
                <span
                  className={`${styles.estadoBadge} ${
                    styles[selectedPQRS.estado.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-")]
                  }`}
                >
                  {selectedPQRS.estado}
                </span>
              </div>

              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>Detalles de la Solicitud</h3>
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

              {selectedPQRS.respuesta && (
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>Respuesta</h3>
                  <div className={styles.respuestaContainer}>
                    <p className={styles.respuestaText}>{selectedPQRS.respuesta}</p>
                    {selectedPQRS.respondidoPor && (
                      <div className={styles.respuestaFooter}>
                        <i className="pi pi-user"></i>
                        <span>Respondido por: {selectedPQRS.respondidoPor}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

export default MyPQRS;
