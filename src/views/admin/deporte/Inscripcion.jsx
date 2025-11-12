import { useMemo, useEffect } from "react";
import { Toast } from "primereact/toast";
import Table from "../../../components/admin/tables/Table";
import SearchBar from "../../../components/admin/buscar/SearchBar";
import { useInscripcionesDeportivas } from "../../../hooks/useInscripcionesDeportivas";
import styles from "../../../styles/adminstyles/adminCultura.module.css";

const Inscripcion = () => {
  const {
    inscripciones,
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
    handleEstadoChange,
    getFilteredInscripciones
  } = useInscripcionesDeportivas();

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

  // Filtrar inscripciones según búsqueda
  const filteredInscripciones = useMemo(() => {
    return getFilteredInscripciones();
  }, [getFilteredInscripciones]);

  // Mapear inscripciones del backend al formato esperado por el componente
  const inscripcionesFormateadas = useMemo(() => {
    return filteredInscripciones.map((inscripcion) => {
      // Formatear fecha de inscripción
      const fechaInscripcion = inscripcion.fecha_inscripcion 
        ? new Date(inscripcion.fecha_inscripcion).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : inscripcion.created_at
        ? new Date(inscripcion.created_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        : 'N/A';

      return {
        id: inscripcion.formulario_dept_id || inscripcion.programa_id + '-' + inscripcion.identificacion,
        formulario_dept_id: inscripcion.formulario_dept_id, // ID principal para usar en los endpoints
        nombreCompleto: inscripcion.nombre_completo || 'N/A',
        numeroIdentificacion: inscripcion.identificacion || inscripcion.numero_identificacion || 'N/A',
        email: inscripcion.email || 'N/A',
        telefono: inscripcion.telefono || inscripcion.formulario_completo?.informacion_personal?.celular || 'N/A',
        programaDeportivo: inscripcion.programa_deportivo?.nombre || 'N/A',
        programaAcademico: inscripcion.programa_academico || inscripcion.formulario_completo?.informacion_academica?.carrera || 'N/A',
        semestre: inscripcion.semestre || inscripcion.formulario_completo?.informacion_academica?.semestre || 'N/A',
        estadoInscripcion: inscripcion.estado_inscripcion || 'pendiente',
        fechaInscripcion: fechaInscripcion,
        // Mantener todos los datos originales para el modal
        ...inscripcion
      };
    });
  }, [filteredInscripciones]);

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
      key: "email",
      label: "Correo",
      sortable: true,
    },
    {
      key: "programaDeportivo",
      label: "Programa Deportivo",
      sortable: true,
    },
    {
      key: "programaAcademico",
      label: "Programa Académico",
      sortable: true,
    },
    {
      key: "estadoInscripcion",
      label: "Estado",
      sortable: true,
      render: (value) => (
        <span
          className={`${styles.badge} ${
            value === "aprobada" || value === "APROBADA"
              ? styles.badgeSuccess
              : value === "rechazada" || value === "RECHAZADA" || value === "cancelada" || value === "CANCELADA"
              ? styles.badgeError
              : styles.badgePending
          }`}
        >
          {value?.toUpperCase() || "PENDIENTE"}
        </span>
      ),
    },
    {
      key: "fechaInscripcion",
      label: "Fecha Inscripción",
      sortable: true,
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, row) => (
        <div
          className={`${styles.actionsContainer} ${
            openDropdownId === row.id ? styles.actionsContainerActive : ""
          }`}
        >
          <button
            className={styles.viewButton}
            onClick={() => handleViewDetails(row)}
          >
            Ver
          </button>
          <div className={styles.dropdownWrapper}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown(row.id)}
            >
              Estado
              <i className="pi pi-chevron-down"></i>
            </button>
            {openDropdownId === row.id && (
              <div className={styles.dropdownMenu}>
                <button
                  className={`${styles.dropdownItem} ${styles.approve}`}
                  onClick={() => {
                    const id = row.formulario_dept_id || row.id;
                    if (!id) {
                      toast.current?.show({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: 'No se puede cambiar el estado: falta el ID de la inscripción',
                        life: 3000
                      });
                      return;
                    }
                    handleEstadoChange(id, "aprobada");
                  }}
                  disabled={!row.formulario_dept_id && !row.id}
                >
                  <i className="pi pi-check"></i>
                  Aprobar
                </button>
                <button
                  className={`${styles.dropdownItem} ${styles.reject}`}
                  onClick={() => {
                    const id = row.formulario_dept_id || row.id;
                    if (!id) {
                      toast.current?.show({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: 'No se puede cambiar el estado: falta el ID de la inscripción',
                        life: 3000
                      });
                      return;
                    }
                    handleEstadoChange(id, "rechazada");
                  }}
                  disabled={!row.formulario_dept_id && !row.id}
                >
                  <i className="pi pi-times"></i>
                  Rechazar
                </button>
                <button
                  className={`${styles.dropdownItem} ${styles.reject}`}
                  onClick={() => {
                    const id = row.formulario_dept_id || row.id;
                    if (!id) {
                      toast.current?.show({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: 'No se puede cambiar el estado: falta el ID de la inscripción',
                        life: 3000
                      });
                      return;
                    }
                    handleEstadoChange(id, "cancelada");
                  }}
                  disabled={!row.formulario_dept_id && !row.id}
                >
                  <i className="pi pi-ban"></i>
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  if (loading && inscripciones.length === 0) {
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

      <div className={styles.content}>
        {/* Barra de búsqueda y filtro NO INFO */}
        <div className={styles.searchSection}>
          <SearchBar
            placeholder="Buscar por nombre, cédula, correo o programa..."
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
                    <span className={styles.detailLabel}>Programa Deportivo:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.programaDeportivo || selectedInscripcion.programa_deportivo?.nombre || 'N/A'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Estado:</span>
                    <span
                      className={`${styles.detailValue} ${styles.badge} ${
                        selectedInscripcion.estadoInscripcion === "aprobada" || selectedInscripcion.estado_inscripcion === "aprobada"
                          ? styles.badgeSuccess
                          : selectedInscripcion.estadoInscripcion === "rechazada" || selectedInscripcion.estado_inscripcion === "rechazada" || 
                             selectedInscripcion.estadoInscripcion === "cancelada" || selectedInscripcion.estado_inscripcion === "cancelada"
                          ? styles.badgeError
                          : styles.badgePending
                      }`}
                    >
                      {(selectedInscripcion.estadoInscripcion || selectedInscripcion.estado_inscripcion || 'pendiente').toUpperCase()}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Fecha Inscripción:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.fechaInscripcion || 
                        (selectedInscripcion.fecha_inscripcion 
                          ? new Date(selectedInscripcion.fecha_inscripcion).toLocaleString('es-ES')
                          : 'N/A')}
                    </span>
                  </div>
                  {selectedInscripcion.programaAcademico && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Programa Académico:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.programaAcademico}
                      </span>
                    </div>
                  )}
                  {selectedInscripcion.semestre && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Semestre:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.semestre}
                      </span>
                    </div>
                  )}
                </div>
              </section>

              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>👤 Información Personal</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Nombre Completo:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.nombreCompleto || 
                        selectedInscripcion.formulario_completo?.informacion_personal?.nombre_completo ||
                        `${selectedInscripcion.nombres || ''} ${selectedInscripcion.apellidos || ''}`.trim() || 'N/A'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>No. Identificación:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.numeroIdentificacion || selectedInscripcion.identificacion || 'N/A'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Email:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.email || 'N/A'}
                    </span>
                  </div>
                  {(selectedInscripcion.telefono || selectedInscripcion.formulario_completo?.informacion_personal?.celular) && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Teléfono:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.telefono || selectedInscripcion.formulario_completo?.informacion_personal?.celular}
                      </span>
                    </div>
                  )}
                </div>
              </section>

              {selectedInscripcion.formulario_completo?.informacion_academica && (
                <section className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>🎓 Información Académica</h3>
                  <div className={styles.detailGrid}>
                    {selectedInscripcion.formulario_completo.informacion_academica.carrera && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Carrera:</span>
                        <span className={styles.detailValue}>
                          {selectedInscripcion.formulario_completo.informacion_academica.carrera}
                        </span>
                      </div>
                    )}
                    {selectedInscripcion.formulario_completo.informacion_academica.semestre && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Semestre:</span>
                        <span className={styles.detailValue}>
                          {selectedInscripcion.formulario_completo.informacion_academica.semestre}
                        </span>
                      </div>
                    )}
                    {selectedInscripcion.formulario_completo.informacion_academica.promedio && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Promedio:</span>
                        <span className={styles.detailValue}>
                          {selectedInscripcion.formulario_completo.informacion_academica.promedio}
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {selectedInscripcion.contacto_emergencia && (
                <section className={styles.detailSection}>
                  <h3 className={styles.sectionTitle}>📞 Contacto de Emergencia</h3>
                  <div className={styles.detailGrid}>
                    {selectedInscripcion.contacto_emergencia.madre && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Madre:</span>
                        <span className={styles.detailValue}>
                          {selectedInscripcion.contacto_emergencia.madre.nombre} - {selectedInscripcion.contacto_emergencia.madre.celular}
                        </span>
                      </div>
                    )}
                    {selectedInscripcion.contacto_emergencia.padre && (
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Padre:</span>
                        <span className={styles.detailValue}>
                          {selectedInscripcion.contacto_emergencia.padre.nombre} - {selectedInscripcion.contacto_emergencia.padre.celular}
                        </span>
                      </div>
                    )}
                  </div>
                </section>
              )}
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

export default Inscripcion;
