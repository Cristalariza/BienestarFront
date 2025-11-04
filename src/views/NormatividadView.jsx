import React from "react";
import ContactSection from "../components/home/ContactSection";
import styles from "../styles/normatividad.module.css";
import { ActividadesCulturalesInicio } from "./CultureView";

const NormatividadView = () => {
  return (
    <>
           <ActividadesCulturalesInicio /> 
      <h1>Normatividad Cultural</h1>
      <p>
        Consulta las políticas y reglamentos que orientan las actividades culturales de la institución.
      </p>
       <section className={styles.docs}>
        <a href="#" className={styles.docLink}>📄 Reglamento de Grupos Culturales</a>
        <a href="#" className={styles.docLink}>📄 Política de Bienestar Universitario</a>
        <a href="#" className={styles.docLink}>📄 Código de Ética Cultural</a>
      </section>
      <section>
        <p></p>
      </section>
         <ContactSection />
    </>
  );
};

export default NormatividadView;

