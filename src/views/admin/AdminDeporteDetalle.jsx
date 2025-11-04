import { useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/admin/buscar/SearchBar";
import Button from "../../components/admin/buttom/Button";
import Table from "../../components/admin/tables/Table";
import styles from "../../styles/adminstyles/activityDetail.module.css";

const AdminDeporteDetalle = () => {
  const { actividad } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("todos");

  // Datos de ejemplo
  const estudiantesData = [
    {
      codigo: "1065786678",
      estudiante: "Jhon Titor Jr",
      carrera: "Ingeniería de sistemas",
      semestre: 7,
      promedio: 5.0,
      asistencia: "13/1",
    },
    {
      codigo: "1065786677",
      estudiante: "Pepe Ganga",
      carrera: "Ingeniería electrónica",
      semestre: 5,
      promedio: 4.0,
      asistencia: "12/2",
    },
    {
      codigo: "1065786676",
      estudiante: "Carlos Torres",
      carrera: "Psicología",
      semestre: 6,
      promedio: 3.7,
      asistencia: "14/0",
    },
    {
      codigo: "1065786675",
      estudiante: "Jhon Titor Jr 2",
      carrera: "Música",
      semestre: 7,
      promedio: 4.1,
      asistencia: "13/1",
    },
  ];

  const columns = [
    { key: "codigo", label: "CÓDIGO", sortable: true },
    { key: "estudiante", label: "ESTUDIANTE", sortable: true },
    {
      key: "carrera",
      label: "CARRERA",
      sortable: true,
      render: (value) => <span className={styles.carreraBadge}>{value}</span>,
    },
    { key: "semestre", label: "SEMESTRE", sortable: true },
    { key: "promedio", label: "PROMEDIO", sortable: true },
    { key: "asistencia", label: "ASISTENCIA", sortable: false },
  ];

  const filteredData = estudiantesData.filter((estudiante) => {
    const matchesSearch =
      estudiante.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudiante.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudiante.carrera.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleExport = () => {
    console.log("Exportar datos...");
    // TODO: Implementar exportación
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Administración de Deportes - {actividad}
        </h1>
      </div>

      <div className={styles.controls}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm("")}
          placeholder="Buscar por nombre, código o programa..."
        />

        <div className={styles.actions}>
          <div className={styles.filterButtons}>
            <Button
              label="Carrera"
              variant={activeFilter === "carrera" ? "secondary" : "outline"}
              icon="pi pi-chevron-down"
              iconPos="right"
              onClick={() => setActiveFilter("carrera")}
            />
            <Button
              label="Activos"
              variant={activeFilter === "activos" ? "secondary" : "outline"}
              onClick={() => setActiveFilter("activos")}
            />
            <Button
              label="Inactivos"
              variant={activeFilter === "inactivos" ? "outline" : "outline"}
              onClick={() => setActiveFilter("inactivos")}
            />
          </div>
          <Button
            label="Exportar"
            variant="success"
            icon="pi pi-download"
            onClick={handleExport}
          />
        </div>
      </div>

      <div className={styles.tableSection}>
        <Table
          columns={columns}
          data={filteredData}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / 10)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AdminDeporteDetalle;
