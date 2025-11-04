import React, { useState } from "react";
 import styles from "../styles/PreInscribirseGrupo.module.css"; 
 import ContactSection from "../components/home/ContactSection"; 
 import { ActividadesCulturalesInicio } from "./CultureView"; 
 import {TableSection} from "./CultureView";

const PreInscribirseGrupoView = () => {
  const programas = [
    "Administración de Empresas", "Contaduría Pública", "Economía", "Comercio Internacional",
    "Hotelería y Turismo", "Ingeniería de Sistemas", "Ingeniería Agroindustrial",
    "Ingeniería Ambiental y Sanitaria", "Ingeniería Electrónica", "Enfermería",
    "Instrumentación Quirúrgica", "Microbiología", "Fisioterapia", "Derecho",
    "Sociología", "Psicología", "Licenciatura en Educación Física, Recreación y Deportes",
    "Licenciatura en Lengua Castellana e Idiomas", "Licenciatura en Matemáticas y Física",
    "Licenciatura en Ciencias Naturales y Educación Ambiental", "Licenciatura en Arte, Folclor y Cultura"
  ];

  const modalidades = [
    "DANZA", "TEATRO", "ZANCOS", "MIMOS", "MÚSICA VALLENATA", "ORQUESTA", "GUITARRAS",
    "BANDA PAPAYERA", "TAMBOBANDA", "CORAL Opus 4", "RAÚL GÓMEZ JATTÍN", "CINE CLUB Ojo pelao"
  ];

  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    programa: '',
    telefono: '',
    modalidad: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones específicas
    if (name === "identificacion") {
      if (!/^\d*$/.test(value)) return; // Solo números
      if (value.length > 11) return; // Máximo 11 dígitos
    }

    if (name === "telefono") {
      if (!/^\d*$/.test(value)) return; // Solo números
      if (value.length > 10) return; // Máximo 10 dígitos
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Formulario enviado correctamente");
  };

  return (
     <>
            <ActividadesCulturalesInicio />
            <TableSection />
    
    <div className={styles.formContainer}>
      <h2>Formulario de Pre-Inscripción</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nombres y Apellidos:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Identificación:
          <input
            type="text"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            required
            placeholder="Ej: 12345678901"
          />
        </label>

        <label>
          Programa:
          <select
            name="programa"
            value={formData.programa}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            {programas.map((prog, i) => (
              <option key={i} value={prog}>{prog}</option>
            ))}
          </select>
        </label>

        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            placeholder="Ej: 3001234567"
          />
        </label>

        <label>
          Modalidad:
          <select
            name="modalidad"
            value={formData.modalidad}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione...</option>
            {modalidades.map((mod, i) => (
              <option key={i} value={mod}>{mod}</option>
            ))}
          </select>
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
      <p>

      </p>
       <section className={styles.section}>
          <ContactSection />
        </section>
      </>
    
  );
};

export default PreInscribirseGrupoView;
