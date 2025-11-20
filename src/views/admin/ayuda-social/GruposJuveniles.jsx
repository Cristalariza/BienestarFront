import React, { useState } from "react";
import styles from "../../../styles/adminstyles/gruposJuveniles.module.css";
import ModalVerEstudiante from "../../../components/admin/modal/ModalVerEstudiante";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GruposJuveniles = () => {
  const [busqueda, setBusqueda] = useState("");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  const estudiantes = [
    {
      codigo: "1065782625",
      nombre: "Andrés Castillo Ruiz",
      carrera: "Administración de Empresas",
      semestre: "6",
      promedio: "4.1",
      nacimiento: "11/01/2002 - Valledupar",
      estadoCivil: "Soltero",
      direccion: "Av. Simón Bolívar #12-45",
      colegio: "Colegio Loperena Garupal",
      telefono: "3004567890",
      correo: "andrescastillo@example.com",
      madre: "Beatriz Ruiz",
      padre: "Héctor Castillo",
      aspiraciones: "Liderar un grupo juvenil en la universidad",
    },
    {
      codigo: "1065782629",
      nombre: "María Fernanda López",
      carrera: "Derecho",
      semestre: "4",
      promedio: "4.3",
      nacimiento: "29/05/2003 - Valledupar",
      estadoCivil: "Soltera",
      direccion: "Calle 9 #6-22",
      colegio: "Colegio Rosario Pumarejo",
      telefono: "3012345678",
      correo: "marialopez@example.com",
      madre: "Sandra López",
      padre: "Jorge Fernández",
      aspiraciones: "Promover actividades juveniles sociales",
    },
  ];

  const filtrados = estudiantes.filter(
    (e) =>
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.codigo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Inscripción Grupos Juveniles</h1>

      <div className={styles.barraBusqueda}>
        <input
          type="text"
          placeholder="Buscar estudiante..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.inputBusqueda}
        />
      </div>

      <div className={styles.tablaContainer}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Estudiante</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Promedio</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((e) => (
              <tr key={e.codigo}>
                <td>{e.codigo}</td>
                <td>{e.nombre}</td>
                <td>{e.carrera}</td>
                <td>{e.semestre}</td>
                <td>{e.promedio}</td>
                <td className={styles.botones}>
                  <button
                    className={styles.botonVer}
                    onClick={() => setEstudianteSeleccionado(e)}
                  >
                    <i className="pi pi-eye"></i>
                  </button>
                  <button className={styles.botonEditar}>
                    <i className="pi pi-pencil"></i>
                  </button>
                  <button className={styles.botonEliminar}>
                    <i className="pi pi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtrados.length === 0 && (
          <p className={styles.sinResultados}>No se encontraron registros.</p>
        )}
      </div>

      {estudianteSeleccionado && (
        <ModalVerEstudiante
          estudiante={estudianteSeleccionado}
          onClose={() => setEstudianteSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default GruposJuveniles;
