import React from "react";

import styles from "../styles/academia.module.css";
import ContactSection from "../components/home/ContactSection";
import { ActividadesCulturalesInicio } from "./CultureView";
import danza from "../assets/danza.png";
import actuar from "../assets/actuar.jpg"; 

const AcademiaView = () => {
  return (
    <>
        <ActividadesCulturalesInicio /> 
    <section className={styles.container}>
          <h1>Cultura y Academia</h1>

        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src={danza} alt="Grupos culturales" />
          </div>
          <div className={styles.text}>
            <p>
              La sección de cultura es la encargada de coordinar las actividades
              de la Universidad Popular del Cesar, tendientes a la investigación,
              rescate y proyección de los valores culturales de nuestra región y
              la nación, fomentando y apoyando las manifestaciones culturales,
              artísticas y folclóricas que contribuyan al desarrollo integral de
              los miembros que forman parte de la comunidad universitaria, a
              través de grupos que representen a la Universidad Popular del Cesar
              en los diferentes eventos y concursos locales, regionales,
              nacionales e internacionales.
            </p>
            <p>
              La sección de cultura ofrece la posibilidad de vincularse a los
              grupos culturales, como también, desarrollar aptitudes personales
              en las diferentes manifestaciones del arte y la cultura.
            </p>
            <p>
              Actualmente, la sección cuenta con nueve (9) grupos culturales
              conformados por estudiantes, egresados, docentes y administrativos.
              Estos grupos tienen una gran trayectoria y han logrado triunfos en
              el ámbito local, regional y nacional, contribuyendo a la difusión
              de nuestros valores culturales.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.container}>
        <h2 className={styles.title}>PROGRAMACIÓN CULTURAL</h2>

        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              En este constante proceso de mejorar y proyectar las artes en el
              ámbito universitario, la sección de cultura ha desarrollado una
              programación mensual cultural, en concordancia con todos los
              directores de los grupos culturales quienes elaboran una ficha
              mensual con las actividades a desarrollar.
            </p>
            <p>
              Las actividades se desarrollan en las tres sedes de la Universidad,
              con la participación de todos los grupos culturales y grupos
              invitados; también se apoyan los eventos sociales, religiosos y
              culturales programados por las diferentes dependencias de esta
              institución y se hace presencia en otras instituciones en sus
              actividades.
            </p>
            <p>
              Los grupos culturales participan semestralmente en los eventos
              competitivos programados por la RED DE UNIVERSIDADES DEL CARIBE
              COLOMBIANO y por otras instituciones a nivel regional y nacional.
            </p>
          </div>

          <div className={styles.imageContainer}>
            <img src={actuar} alt="Programación cultural" />
          </div>
        </div>
      </section>

       <ContactSection />
    </>
  );
};

export default AcademiaView;
