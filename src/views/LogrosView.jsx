import React from "react";

import ContactSection from "../components/home/ContactSection";
import styles from "../styles/logros.module.css";
import { ActividadesCulturalesInicio } from "./CultureView";

const LogrosView = () => {
  return (
    <>
      <ActividadesCulturalesInicio />

      <section className={styles.logrosSection}>
        <h1 className={styles.logrosTitle}>LOGROS CULTURALES</h1>

        <div className={styles.logrosContainer}>
          <div className={styles.logroCard}>
            <h3>Grupo de Danzas “Uparí”</h3>
            <ul>
              <li>1999 — Primer puesto en el Festival Artístico Cultural Estudiantil, Valledupar.</li>
              <li>2002 — Primer puesto en el II Festival Departamental de Danzas Folclóricas por parejas, Valledupar.</li>
              <li>2002 — Primer puesto en la muestra Regional e Internacional “Caribe Baila”, Riohacha.</li>
              <li>2003 — Clasifica para representar al Cesar en el III Festival “Cesar Baila”.</li>
              <li>2004 — Primer puesto en el Festival Regional Universitario de Danzas Folclóricas del Caribe, Montería.</li>
              <li>2005 — Segundo puesto en el Festival Nacional de Danzas Universitarias, Barranquilla.</li>
              <li>2006 — Segundo puesto y mejor trabajo de investigación, Ocaña.</li>
              <li>2008 — Reconocimiento al mejor trabajo de investigación, Santa Marta.</li>
              <li>2008 — Tercer puesto en Ocaña.</li>
              <li>2009 — Segundo puesto y mejor trabajo de investigación, Santa Marta.</li>
              <li>2009 — Reconocimiento mejor pareja, Santander.</li>
              <li>2009 — Reconocimiento en el Encuentro de Danzas, Casanare.</li>
              <li>2010 — Representación de Colombia en el III Forum de las Culturas, Valparaíso (Chile).</li>
            </ul>
          </div>

          <div className={styles.logroCard}>
            <h3>Grupo de Teatro “La Carreta”</h3>
            <ul>
              <li>1999 — Primer puesto en la muestra regional de Teatro Universitario, Valledupar.</li>
              <li>1999 — Mejor dramaturgia, Universidad de Santiago de Cali.</li>
              <li>2000 — Primer puesto en el III Festival de Arte Universitario, Cartagena.</li>
              <li>2002 — Primer puesto en el V Festival Regional, Santa Marta.</li>
              <li>2002 — Premio al mejor trabajo de dramaturgia y grupo de actores, Cali.</li>
              <li>2003 — Segundo puesto en el VI Festival Regional, Montería.</li>
              <li>2003 — Mejor director y nominaciones a mejor actriz y dramaturgia, Cali.</li>
              <li>2004 — Primer puesto en el VI Festival Regional, Santa Marta.</li>
              <li>2005 — Mejor actor y mérito artístico, Cali.</li>
              <li>2006 — Mejor grupo, escenografía y dirección, Sincelejo.</li>
              <li>2007 — Mejor iluminación y actriz, Cartagena.</li>
              <li>2007 — Mejor grupo universitario, Cali.</li>
              <li>2008 — Mejor obra “Verónica es Tebas”, Barranquilla.</li>
              <li>2009 — Mejor puesta en escena, Santa Marta.</li>
              <li>2009 — Mejor obra “Hamlet en este País de Ratas Retóricas”.</li>
              <li>2010 — Mejor obra y mejor actriz, Festival Nacional.</li>
              <li>2011 — Mejor actriz y mejor obra “Antígona”.</li>
            </ul>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default LogrosView;


