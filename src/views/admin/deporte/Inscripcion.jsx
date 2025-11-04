import { useState, useMemo, useEffect } from "react";
import Table from "../../../components/admin/tables/Table";
import SearchBar from "../../../components/admin/buscar/SearchBar";
import styles from "../../../styles/adminstyles/adminCultura.module.css";

const Inscripcion = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInscripcion, setSelectedInscripcion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdownId &&
        !event.target.closest(`.${styles.dropdownWrapper}`)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const inscripcionesData = [
    {
      id: 1,
      nombreCompleto: "Juan Pérez García",
      numeroIdentificacion: "1234567890",
      email: "juan.perez@example.com",
      programaDeportivo: "Fútbol",
      estadoInscripcion: "PENDIENTE",
      fechaInscripcion: "2025-11-01",
      // Información Personal
      tipoIdentificacion: "CC",
      sexo: "M",
      fechaNacimiento: "2000-05-15",
      lugarNacimiento: "Bogotá",
      estadoCivil: "Soltero",
      direccion: "Calle 10 #20-30",
      barrio: "Centro",
      celular: "3001234567",
      foto: "",
      firma: "",
      // Información Académica
      colegioEgresado: "Colegio San José",
      jornadaColegio: "Mañana",
      añoEgreso: "2018",
      carrera: "Ingeniería de Sistemas",
      jornadaUniversitaria: "Diurna",
      semestre: "5",
      promedio: "4.2",
      permanencia: "Regular",
      otrosEstudios: "Curso de inglés",
      // Datos Generales
      nivelDeportivo: "Intermedio",
      torneosParticipados: "Torneo intercolegiado 2017",
      clubPertenece: "No",
      peso: "70",
      estatura: "175",
      enfermedades: "Ninguna",
      eps: "Sanitas",
      rh: "O+",
      trabaja: false,
      lugarTrabajo: "",
      cargo: "",
      // Información Familiar
      nombreMadre: "María García",
      direccionMadre: "Calle 10 #20-30",
      ciudadMadre: "Bogotá",
      celularMadre: "3009876543",
      ocupacionMadre: "Contador",
      nombrePadre: "Pedro Pérez",
      direccionPadre: "Calle 10 #20-30",
      ciudadPadre: "Bogotá",
      celularPadre: "3001122334",
      ocupacionPadre: "Ingeniero",
      // Valoración Médica
      valoracionMedicaAprobada: false,
      fechaValoracionMedica: "",
      observacionesInscripcion: "",
    },
    {
      id: 2,
      nombreCompleto: "Ana María López",
      numeroIdentificacion: "9876543210",
      email: "ana.lopez@example.com",
      programaDeportivo: "Baloncesto",
      estadoInscripcion: "APROBADA",
      fechaInscripcion: "2025-10-28",
      tipoIdentificacion: "CC",
      sexo: "F",
      fechaNacimiento: "1999-08-22",
      lugarNacimiento: "Medellín",
      estadoCivil: "Soltera",
      direccion: "Carrera 15 #45-67",
      barrio: "Poblado",
      celular: "3107654321",
      foto: "",
      firma: "",
      colegioEgresado: "Colegio Santa María",
      jornadaColegio: "Tarde",
      añoEgreso: "2017",
      carrera: "Administración de Empresas",
      jornadaUniversitaria: "Nocturna",
      semestre: "7",
      promedio: "4.5",
      permanencia: "Regular",
      otrosEstudios: "Diplomado en Marketing",
      nivelDeportivo: "Avanzado",
      torneosParticipados: "Nacional 2019, Regional 2020",
      clubPertenece: "Club Deportivo UPC",
      peso: "62",
      estatura: "168",
      enfermedades: "Ninguna",
      eps: "Compensar",
      rh: "A+",
      trabaja: true,
      lugarTrabajo: "Empresa XYZ",
      cargo: "Asistente",
      nombreMadre: "Claudia López",
      direccionMadre: "Carrera 15 #45-67",
      ciudadMadre: "Medellín",
      celularMadre: "3201234567",
      ocupacionMadre: "Docente",
      nombrePadre: "Carlos María",
      direccionPadre: "Carrera 15 #45-67",
      ciudadPadre: "Medellín",
      celularPadre: "3159876543",
      ocupacionPadre: "Empresario",
      valoracionMedicaAprobada: true,
      fechaValoracionMedica: "2025-10-30",
      observacionesInscripcion: "Aprobada con excelentes condiciones físicas",
    },
  ];

  // Filtrar inscripciones según búsqueda
  const filteredInscripciones = useMemo(() => {
    if (!searchTerm.trim()) return inscripcionesData;

    const term = searchTerm.toLowerCase();
    return inscripcionesData.filter(
      (inscripcion) =>
        inscripcion.nombreCompleto.toLowerCase().includes(term) ||
        inscripcion.numeroIdentificacion.includes(term) ||
        inscripcion.email.toLowerCase().includes(term) ||
        inscripcion.programaDeportivo.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const columns = [
    {
      key: "nombreCompleto",
      label: "Nombre",
      sortable: true,
    },
    {
      key: "numeroIdentificacion",
      label: "Cédula",
      sortable: true,
    },
    {
      key: "email",
      label: "Correo",
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
                  onClick={() => handleEstadoChange(row.id, "APROBADA")}
                >
                  <i className="pi pi-check"></i>
                  Aceptar
                </button>
                <button
                  className={`${styles.dropdownItem} ${styles.reject}`}
                  onClick={() => handleEstadoChange(row.id, "RECHAZADA")}
                >
                  <i className="pi pi-times"></i>
                  Rechazar
                </button>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    // Aquí iría la lógica para actualizar el estado en el backend
    console.log(`Cambiando estado de inscripción ${id} a ${nuevoEstado}`);
    alert(`Inscripción ${nuevoEstado.toLowerCase()}`);
    setOpenDropdownId(null);
  };

  const handleViewDetails = (inscripcion) => {
    setSelectedInscripcion(inscripcion);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInscripcion(null);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Barra de búsqueda */}
        <div className={styles.searchSection}>
          <SearchBar
            placeholder="Buscar por nombre, cédula, correo o programa..."
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={handleClearSearch}
          />
          {searchTerm && (
            <p className={styles.searchResults}>
              {filteredInscripciones.length} resultado
              {filteredInscripciones.length !== 1 ? "s" : ""} encontrado
              {filteredInscripciones.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Tabla de inscripciones */}
        <Table
          columns={columns}
          data={filteredInscripciones}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredInscripciones.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal para ver detalles */}
      {showModal && selectedInscripcion && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Detalles de Inscripción</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Información General */}
              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>📋 Información General</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Programa:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.programaDeportivo}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Estado:</span>
                    <span
                      className={`${styles.detailValue} ${styles.badge} ${
                        selectedInscripcion.estadoInscripcion === "APROBADA"
                          ? styles.badgeSuccess
                          : styles.badgePending
                      }`}
                    >
                      {selectedInscripcion.estadoInscripcion}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      Fecha Inscripción:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.fechaInscripcion}
                    </span>
                  </div>
                </div>
              </section>

              {/* Información Personal */}
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
                    <span className={styles.detailLabel}>
                      Tipo Identificación:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.tipoIdentificacion}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      No. Identificación:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.numeroIdentificacion}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Sexo:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.sexo === "M"
                        ? "Masculino"
                        : "Femenino"}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      Fecha Nacimiento:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.fechaNacimiento}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      Lugar Nacimiento:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.lugarNacimiento}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Estado Civil:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.estadoCivil}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Dirección:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.direccion}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Barrio:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.barrio}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Celular:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.celular}
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

              {/* Información Académica */}
              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  🎓 Información Académica
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      Colegio Egresado:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.colegioEgresado}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Jornada Colegio:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.jornadaColegio}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Año Egreso:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.añoEgreso}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Carrera:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.carrera}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      Jornada Universitaria:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.jornadaUniversitaria}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Semestre:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.semestre}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Promedio:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.promedio}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Permanencia:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.permanencia}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Otros Estudios:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.otrosEstudios || "N/A"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Datos Generales */}
              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  🏃 Datos Deportivos y Generales
                </h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Nivel Deportivo:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.nivelDeportivo}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      Torneos Participados:
                    </span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.torneosParticipados || "N/A"}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Club Pertenece:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.clubPertenece || "N/A"}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Peso (kg):</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.peso}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Estatura (cm):</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.estatura}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Enfermedades:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.enfermedades || "N/A"}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>EPS:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.eps}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>RH:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.rh}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Trabaja:</span>
                    <span className={styles.detailValue}>
                      {selectedInscripcion.trabaja ? "Sí" : "No"}
                    </span>
                  </div>
                  {selectedInscripcion.trabaja && (
                    <>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>
                          Lugar Trabajo:
                        </span>
                        <span className={styles.detailValue}>
                          {selectedInscripcion.lugarTrabajo}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Cargo:</span>
                        <span className={styles.detailValue}>
                          {selectedInscripcion.cargo}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Información Familiar */}
              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>👨‍👩‍👦 Información Familiar</h3>
                <div className={styles.familyGrid}>
                  <div className={styles.familyColumn}>
                    <h4>Madre</h4>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Nombre:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.nombreMadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Dirección:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.direccionMadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Ciudad:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.ciudadMadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Celular:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.celularMadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Ocupación:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.ocupacionMadre}
                      </span>
                    </div>
                  </div>
                  <div className={styles.familyColumn}>
                    <h4>Padre</h4>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Nombre:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.nombrePadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Dirección:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.direccionPadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Ciudad:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.ciudadPadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Celular:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.celularPadre}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Ocupación:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.ocupacionPadre}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Valoración Médica */}
              <section className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>🏥 Valoración Médica</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Estado:</span>
                    <span
                      className={`${styles.detailValue} ${styles.badge} ${
                        selectedInscripcion.valoracionMedicaAprobada
                          ? styles.badgeSuccess
                          : styles.badgePending
                      }`}
                    >
                      {selectedInscripcion.valoracionMedicaAprobada
                        ? "Aprobada"
                        : "Pendiente"}
                    </span>
                  </div>
                  {selectedInscripcion.valoracionMedicaAprobada && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>
                        Fecha Valoración:
                      </span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.fechaValoracionMedica}
                      </span>
                    </div>
                  )}
                  {selectedInscripcion.observacionesInscripcion && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Observaciones:</span>
                      <span className={styles.detailValue}>
                        {selectedInscripcion.observacionesInscripcion}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.btnClose} onClick={closeModal}>
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
