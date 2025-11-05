import { useMemo, useEffect } from "react";
import { Toast } from "primereact/toast";
import Table from "../../../components/admin/tables/Table";
import SearchBar from "../../../components/admin/buscar/SearchBar";
import { useInscripcionesCulturales } from "../../../hooks/useInscripcionesCulturales";
import styles from "../../../styles/adminstyles/adminCultura.module.css";

const Inscripciones = () => {
  const {
    inscripcionesConPersona,
    loading,
    searchTerm,
    selectedInscripcion,
    showModal,
    currentPage,
    openDropdownId,
    showNoInfo,
    toast,
    setCurrentPage,
    setShowNoInfo,
    handleSearch,
    handleClearSearch,
    handleViewDetails,
    handleCloseModal,
    toggleDropdown,
    getFilteredInscripciones
  } = useInscripcionesCulturales();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdownId &&
        !event.target.closest(`.${styles.dropdownWrapper}`)
      ) {
        toggleDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  // Filtrar solo inscripciones APROBADAS
  const inscripcionesAprobadas = useMemo(() => {
    const filtered = getFilteredInscripciones();
    return filtered.filter(inscripcion => inscripcion.estado_inscripcion === "APROBADA");
  }, [getFilteredInscripciones]);

  // Mapear inscripciones del backend al formato esperado por el componente
  const inscripcionesFormateadas = useMemo(() => {
    return inscripcionesAprobadas.map((inscripcion) => ({
      id: inscripcion.inscripcion_id,
      nombreCompleto: inscripcion.nombre_completo || 'N/A',
      numeroIdentificacion: inscripcion.numero_identificacion || 'N/A',
      email: inscripcion.email || inscripcion.correo_electronico || 'N/A',
      programaCultural: inscripcion.programa_cultural?.nombre || 'N/A',
      estadoInscripcion: inscripcion.estado_inscripcion || 'APROBADA',
      fechaInscripcion: inscripcion.fecha_inscripcion || inscripcion.created_at,
      ...inscripcion
    }));
  }, [inscripcionesAprobadas]);

  const columns = [
    {
      key: "nombreCompleto",
      label: "Nombre Completo",
      sortable: true,
    },
    {
      key: "numeroIdentificacion",
      label: "Identificación",
      sortable: true,
    },
    {
      key: "programaCultural",
      label: "Programa Cultural",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "fechaInscripcion",
      label: "Fecha",
      sortable: true,
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, row) => (
        <div className={styles.actionsContainer}>
          <button
            className={styles.viewButton}
            onClick={() => handleViewDetails(row)}
          >
            Ver
          </button>
        </div>
      ),
    },
  ];

  if (loading && inscripcionesConPersona.length === 0) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          <p>Cargando inscripciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <h1 className={styles.title}>Inscripciones Culturales Aprobadas</h1>

      <div className={styles.content}>
        {/* Barra de búsqueda y filtro NO INFO */}
        <div className={styles.searchSection}>
          <SearchBar
            placeholder="Buscar por nombre, identificación, email o programa..."
            value={searchTerm}
            onChange={handleSearch}
            onClear={handleClearSearch}
          />

          {/* Checkbox NO INFO */}
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="noInfoCheckbox"
              checked={showNoInfo}
              onChange={(e) => setShowNoInfo(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label
              htmlFor="noInfoCheckbox"
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              Mostrar solo inscripciones sin información
            </label>
          </div>

          {searchTerm && (
            <p className={styles.searchResults}>
              {inscripcionesFormateadas.length} resultado
              {inscripcionesFormateadas.length !== 1 ? "s" : ""} encontrado
              {inscripcionesFormateadas.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Tabla de inscripciones */}
        <Table
          columns={columns}
          data={inscripcionesFormateadas}
          currentPage={currentPage}
          totalPages={Math.ceil(inscripcionesFormateadas.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal simplificado para mostrar detalles básicos */}
      {showModal && selectedInscripcion && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Detalles de Inscripción</h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>📋 Información General</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Programa:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.programaCultural}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Estado:</span>
                    <span
                      className={`${styles.detailValue} ${styles.badge} ${styles.badgeSuccess}`}
                    >
                      {selectedInscripcion.estadoInscripcion}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Fecha Inscripción:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.fechaInscripcion}
                    </span>
                  </div>
                </div>
              </section>

              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>👤 Información Personal</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Nombre Completo:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.nombreCompleto}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>No. Identificación:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.numeroIdentificacion}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.email}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.btnClose} onClick={handleCloseModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inscripciones;
