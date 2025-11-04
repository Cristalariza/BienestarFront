import React from "react";

import styles from "../styles/requisitosSeleccion.module.css";
import ContactSection from "../components/home/ContactSection";
import { ActividadesCulturalesInicio } from "./CultureView";
import {TableSection} from "./CultureView";

const RequisitosSeleccionView = () => {
  return (
   
      <>
        <ActividadesCulturalesInicio />
        <TableSection />

        <div className={styles.container}>
          <h1 className={styles.title}>REQUISITOS Y SELECCIÓN</h1>

          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Requisitos</h2>
              <div className={styles.cardBody}>
                <p>
                  Para la conformación de estos grupos culturales se requiere
                  que los aspirantes cumplan los siguientes requisitos:
                </p>
                <ul>
                  <li>Pertenecer a la comunidad universitaria.</li>
                  <li>Diligenciar planilla en la sección de cultura.</li>
                    <li>Promedio sobre 3.5.</li>
                  <li>
                    Tener propósito de desarrollar una actividad permanente en
                    alguna de las expresiones culturales, así como demostrar las
                    dotes artísticas necesarias para tal fin.
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Selección</h2>
              <div className={styles.cardBody}>
                <p>
                  Los procesos de selección se realizan bajo criterios de
                  evaluación artística y compromiso institucional:
                </p>
                <ul>
                  <li>
                    Presentar audición o muestra artística según el grupo al que
                    aspira.
                  </li>
                  <li>Asistir puntualmente al proceso de selección.</li>
                  <li>
                    Demostrar habilidades escénicas, técnicas o expresivas según
                    el área cultural.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    
        <section className={styles.section}>
          <ContactSection />
        </section>
      </>
    
  );
};

export default RequisitosSeleccionView;
