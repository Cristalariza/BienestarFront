import { useState, useMemo } from "react";
import Table from "../../../components/admin/tables/Table";
import SearchBar from "../../../components/admin/buscar/SearchBar";
import styles from "../../../styles/adminstyles/adminCultura.module.css";

const Preinscripciones = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPreinscripcion, setSelectedPreinscripcion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo - Reemplazar con datos reales de la API
  const preinscripcionesData = [
    {
      id: 1,
      nombreCompleto: "Carlos Andrés Rodríguez",
      tipoIdentificacion: "CC",
      numeroIdentificacion: "1234567890",
      programaCultural: "Danza Folclórica",
      telefono: "3001234567",
      modalidad: "Presencial",
      email: "carlos.rodriguez@example.com",
      estado: "PENDIENTE",
      fechaPreinscripcion: "2025-11-03",
    },
    {
      id: 2,
      nombreCompleto: "María Fernanda Gómez",
      tipoIdentificacion: "CC",
      numeroIdentificacion: "9876543210",
      programaCultural: "Teatro",
      telefono: "3109876543",
      modalidad: "Virtual",
      email: "maria.gomez@example.com",
      estado: "PENDIENTE",
      fechaPreinscripcion: "2025-11-02",
    },
    {
      id: 3,
      nombreCompleto: "Jorge Luis Martínez",
      tipoIdentificacion: "CE",
      numeroIdentificacion: "5555666777",
      programaCultural: "Música - Guitarra",
      telefono: "3201122334",
      modalidad: "Presencial",
      email: "jorge.martinez@example.com",
      estado: "ACEPTADA",
      fechaPreinscripcion: "2025-11-01",
    },
    {
      id: 4,
      nombreCompleto: "Sofía Valentina Castro",
      tipoIdentificacion: "TI",
      numeroIdentificacion: "1122334455",
      programaCultural: "Pintura",
      telefono: "3154445566",
      modalidad: "Mixta",
      email: "sofia.castro@example.com",
      estado: "RECHAZADA",
      fechaPreinscripcion: "2025-10-30",
    },
    {
      id: 5,
      nombreCompleto: "Diego Alejandro Vargas",
      tipoIdentificacion: "CC",
      numeroIdentificacion: "7788990011",
      programaCultural: "Coro",
      telefono: "3187778899",
      modalidad: "Presencial",
      email: "diego.vargas@example.com",
      estado: "PENDIENTE",
      fechaPreinscripcion: "2025-11-04",
    },
  ];

  const filteredPreinscripciones = useMemo(() => {
    if (!searchTerm) return preinscripcionesData;

    const searchLower = searchTerm.toLowerCase();
    return preinscripcionesData.filter(
      (item) =>
        item.nombreCompleto.toLowerCase().includes(searchLower) ||
        item.numeroIdentificacion.includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.programaCultural.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, preinscripcionesData]);

  const handleEstadoChange = (id, nuevoEstado) => {
    console.log(`Cambiando estado de preinscripción ${id} a ${nuevoEstado}`);
    // TODO: Implementar llamada a API para actualizar estado
    // Si el estado es "ACEPTADA", debería crear la inscripción completa
  };

  const handleVerDetalles = (preinscripcion) => {
    setSelectedPreinscripcion(preinscripcion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPreinscripcion(null);
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      PENDIENTE: styles.badgePending,
      ACEPTADA: styles.badgeApproved,
      RECHAZADA: styles.badgeRejected,
    };
    return badges[estado] || styles.badgePending;
  };

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
      key: "fechaPreinscripcion",
      label: "Fecha",
      sortable: true,
    },
    {
      key: "estado",
      label: "Estado",
      sortable: true,
      render: (value) => (
        <span className={`${styles.badge} ${getEstadoBadge(value)}`}>
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, row) => (
        <div className={styles.actionsContainer}>
          <button
            className={styles.btnView}
            onClick={() => handleVerDetalles(row)}
            title="Ver detalles"
          >
            <i className="pi pi-eye"></i> Ver
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Preinscripciones Culturales</h1>

      <div className={styles.content}>
        <div className={styles.searchSection}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Buscar por nombre, identificación, email o programa..."
          />
        </div>

        <Table
          columns={columns}
          data={filteredPreinscripciones}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={10}
        />
      </div>

      {/* Modal de Detalles */}
      {showModal && selectedPreinscripcion && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Detalles de la Preinscripción</h2>
              <button className={styles.modalClose} onClick={handleCloseModal}>
                <i className="pi pi-times"></i>
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Información General */}
              <div className={styles.detailSection}>
                <h3>
                  <i className="pi pi-user"></i> Información General
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Nombre Completo:</label>
                    <span>{selectedPreinscripcion.nombreCompleto}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Tipo de Identificación:</label>
                    <span>{selectedPreinscripcion.tipoIdentificacion}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Número de Identificación:</label>
                    <span>{selectedPreinscripcion.numeroIdentificacion}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Email:</label>
                    <span>{selectedPreinscripcion.email}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Teléfono:</label>
                    <span>{selectedPreinscripcion.telefono}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Fecha de Preinscripción:</label>
                    <span>{selectedPreinscripcion.fechaPreinscripcion}</span>
                  </div>
                </div>
              </div>

              {/* Información del Programa */}
              <div className={styles.detailSection}>
                <h3>
                  <i className="pi pi-palette"></i> Programa Cultural
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <label>Programa:</label>
                    <span>{selectedPreinscripcion.programaCultural}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Modalidad:</label>
                    <span>{selectedPreinscripcion.modalidad}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <label>Estado:</label>
                    <span
                      className={`${styles.badge} ${getEstadoBadge(
                        selectedPreinscripcion.estado
                      )}`}
                    >
                      {selectedPreinscripcion.estado}
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones del Modal */}
              {selectedPreinscripcion.estado === "PENDIENTE" && (
                <div className={styles.modalActions}>
                  <button
                    className={styles.btnApprove}
                    onClick={() => {
                      handleEstadoChange(selectedPreinscripcion.id, "ACEPTADA");
                      handleCloseModal();
                    }}
                  >
                    <i className="pi pi-check"></i> Aceptar Preinscripción
                  </button>
                  <button
                    className={styles.btnReject}
                    onClick={() => {
                      handleEstadoChange(
                        selectedPreinscripcion.id,
                        "RECHAZADA"
                      );
                      handleCloseModal();
                    }}
                  >
                    <i className="pi pi-times"></i> Rechazar Preinscripción
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preinscripciones;
