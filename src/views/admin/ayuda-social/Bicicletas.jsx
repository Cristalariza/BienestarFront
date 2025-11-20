import React, { useState } from "react";
import styles from "../../../styles/adminstyles/bicicletas.module.css";
import ModalVerEstudiante from "../../../components/admin/modal/ModalVerEstudiante";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bicicletas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  const estudiantes = [
    {
      codigo: "1065782623",
      nombre: "Juan Pérez Gómez",
      carrera: "Ingeniería Industrial",
      semestre: "5",
      promedio: "4.2",
      nacimiento: "15/03/2003 - Valledupar",
      estadoCivil: "Soltero",
      direccion: "Cra 12 # 5-23",
      colegio: "Colegio Nacional Loperena",
      telefono: "3001234567",
      correo: "juanperez@example.com",
      madre: "María Gómez",
      padre: "Carlos Pérez",
      aspiraciones: "Graduarme y trabajar en proyectos sociales",
    },
    {
      codigo: "1065782623",
      nombre: "Laura Torres Mendoza",
      carrera: "Psicología",
      semestre: "3",
      promedio: "4.0",
      nacimiento: "22/07/2004 - Valledupar",
      estadoCivil: "Soltera",
      direccion: "Calle 7 # 8-19",
      colegio: "Inst. Educativo Sagrado Corazón",
      telefono: "3019876543",
      correo: "lauratorres@example.com",
      madre: "Rosa Mendoza",
      padre: "Luis Torres",
      aspiraciones: "Acompañar procesos de bienestar estudiantil",
    },
  ];

  const filtrados = estudiantes.filter(
    (e) =>
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.codigo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Inscripción Bicicletas</h1>

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

export default Bicicletas;
