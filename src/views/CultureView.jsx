import React, { Fragment, useState } from "react";
import ContactSection from "../components/home/ContactSection";
import PreinscripcionCulturalForm from "../components/forms/PreinscripcionCulturalForm";
import styles from "../../src/styles/culture.module.css";
import danza from "../assets/danza.png";
import teatro from "../assets/teatro.png";
import zancos from "../assets/zancos.png";
import mimos from "../assets/mimos.png";
import orquesta from "../assets/orquesta.png";
import guitarras from "../assets/guitarras.png";
import banda from "../assets/banda.png";
import tambobanda from "../assets/tambobanda.png";
import raulgomez from "../assets/raul-gomez.png";
import cine from "../assets/cine.png";
import vallenato from "../assets/vallenato.png";
import coral from "../assets/coral.png";
import {
  GiBallerinaShoes,
  GiDramaMasks,
  GiGuitarHead,
  GiMicrophone,
} from "react-icons/gi";
import { FaMusic, FaRegCalendarAlt } from "react-icons/fa";
import { MdAccessibility, MdMusicNote, MdMovie } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";

const activities = [
  {
    key: "danza",
    title2: "GRUPO DE DANZAS UPARI",
    icon: <GiBallerinaShoes />,
    image: danza,
  },
  {
    key: "teatro",
    title2: "GRUPO DE TEATRO",
    icon: <GiDramaMasks />,
    image: teatro,
  },
  {
    key: "zancos",
    title2: "ZANCOS",
    title: " ",
    icon: <MdAccessibility />,
    image: zancos,
  },
  {
    key: "mimos",
    title2: "MIMOS",
    icon: <IoIosPeople />,
    image: mimos,
  },
  {
    key: "orquesta",
    title2: "ORQUESTA",
    icon: <MdMusicNote />,
    image: orquesta,
  },
  {
    key: "guitarras",
    title2: "GUITARRAS",
    icon: <GiGuitarHead />,
    image: guitarras,
  },
  {
    key: "banda",
    title2: "BANDA PAPAYERA",
    icon: <FaMusic />,
    image: banda,
  },
  {
    key: "tambobanda",
    title2: "TAMBOBANDA",
    icon: <MdMusicNote />,
    image: tambobanda,
  },
  {
    key: "raul",
    title2: "RAÚL GÓMEZ JATTÍN",
    icon: <FaRegCalendarAlt />,
    image: raulgomez,
  },
  {
    key: "cine",
    title2: "CINE CLUB",
    icon: <MdMovie />,
    image: cine,
  },
  {
    key: "vallenato",
    title2: "CONJUNTO VALLENATO",
    icon: <FaMusic />,
    image: vallenato,
  },
  {
    key: "coral",
    title2: "CORO OPUS 4",
    icon: <GiMicrophone />,
    image: coral,
  },
];

export const ActividadesCulturalesInicio = () => {
  const actividades = [
    { titulo: "Inicio" },
    { titulo: "Grupos Artísticos Institucionales" },
    { titulo: "Cultura y academia" },
    { titulo: "Logros Obtenidos" },
    { titulo: "Normatividad" },
  ];

  return (
    <section className={styles.actividadesInicioSection2}>
      <div className={styles.actividadesGrid2}>
        {actividades.map((act, i) => (
          <div key={i} className={styles.actividadCard2}>
            <img
              src={`image${i + 1}.jpeg`}
              alt={act.titulo}
              className={styles.actividadImg2}
            />
            <button className={styles.actividadButton2}>{act.titulo}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

const TableSection = ({ onOpen }) => {
  return (
    <section className={styles.tableSection} aria-labelledby="grupos-title">
      <h2 id="grupos-title" className={styles.sectionTitle}>
        Grupos Institucionales
      </h2>

      <div className={styles.tableGrid}>
        {[
          "INSCRIBIRSE EN UN GRUPO ARTISTICO",
          "REQUISITOS Y SELECCIÓN",
          "CONVOCATORIA NUEVOS INTEGRANTES",
          "CONSULTAR HORARIOS DE ENSAYO",
        ].map((title, i) => (
          <div key={i} className={styles.tableCard}>
            <button
              className={styles.tableButton}
              onClick={() => onOpen(title)}
            >
              <span>{title}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ActivitiesGrid = () => (
  <section
    className={styles.activitiesSection}
    aria-labelledby="actividades-title"
  >
    <h2 id="actividades-title" className={styles.sectionTitle}>
      Actividades Culturales
    </h2>
    <div className={styles.activitiesGrid}>
      {activities.map((act) => (
        <div key={act.key} className={styles.activityCard}>
          <img
            src={act.image}
            alt="https://images.pexels.com/photos/10324250/pexels-photo-10324250.jpeg"
            className={styles.activityImage}
          />
          <div className={styles.activityIcon}>{act.icon}</div>
          <h4 className={styles.activityName}>{act.title2}</h4>
          <h4 className={styles.activityNam}>{act.title}</h4>
        </div>
      ))}
    </div>
  </section>
);

const CultureView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [programaSeleccionado, setProgramaSeleccionado] = useState(null);

  const openModal = (title, programa = null) => {
    setModalTitle(title);
    setProgramaSeleccionado(programa);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTitle("");
    setProgramaSeleccionado(null);
  };

  const handlePreinscripcionSubmit = async (inscripcionData) => {
    try {
      // TODO: Conectar con backend API
      console.log("Datos de preinscripción:", inscripcionData);

      // Aquí iría la llamada al backend:
      // const response = await fetch('/api/inscripciones-culturales', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(inscripcionData)
      // });

      alert("¡Preinscripción enviada exitosamente!");
      closeModal();
    } catch (error) {
      console.error("Error al enviar preinscripción:", error);
      alert("Hubo un error al enviar la preinscripción. Intente nuevamente.");
    }
  };

  return (
    <Fragment>
      <main>
        <div className={styles.container}>
          <h1 className={styles.cultureTitle}>Actividades Culturales</h1>
          <p className={styles.cultureSubtitle}>
            La sección de cultura ofrece la posibilidad de vincularse a los
            grupos culturales, como también, desarrollar aptitudes personales en
            las diferentes manifestaciones del arte y la cultura.
          </p>
          <button
            className={styles.heroButton}
            onClick={() => openModal("INSCRIPCIÓN A CULTURA")}
          >
            Inscribirme
          </button>
        </div>
        <div className={styles.gradientBar}></div>

        <ActividadesCulturalesInicio />
        <TableSection onOpen={openModal} />
        <ActivitiesGrid />
        <ContactSection />
      </main>

      {/* Modal de Preinscripción */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <PreinscripcionCulturalForm
              onSubmit={handlePreinscripcionSubmit}
              onCancel={closeModal}
              programaSeleccionado={programaSeleccionado}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CultureView;
