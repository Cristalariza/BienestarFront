import React, { Fragment, useState } from "react";
import ContactSection from "../components/home/ContactSection";
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
import {GiBallerinaShoes,GiDramaMasks,GiGuitarHead,GiMicrophone,} from "react-icons/gi";
import { FaMusic, FaRegCalendarAlt } from "react-icons/fa";
import { MdAccessibility, MdMusicNote, MdMovie } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import GruposCulturaView from "./GruposCulturaView";


// ======================= COMPONENTES SECUNDARIOS =======================

export const ActividadesCulturalesInicio = () => {
  const navigate = useNavigate();

  const actividades = [
    { titulo: "Inicio", ruta: "/CultureView" },
    { titulo: "Grupos Artísticos Institucionales", ruta: "/GruposCulturaView" },
    { titulo: "Cultura y academia", ruta: "/academia" },
    { titulo: "Logros Obtenidos", ruta: "/logros" },
    { titulo: "Normatividad", ruta: "/normatividad" },
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
            <button
              className={styles.actividadButton2}
              onClick={() => navigate(act.ruta)} // 👈 Aquí ocurre la navegación
            >
              {act.titulo}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const TableSection = ({ onOpen }) => (
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
          <div className={styles.tableHeader}></div>
          <button className={styles.tableButton} onClick={() => onOpen(title)}>
            {title}
          </button>
        </div>
      ))}
    </div>
  </section>
);

 const activities = [
  {
    key: "danza",
    title: "DANZA",
    icon: <GiBallerinaShoes />,
    image: danza,
  },
  {
    key: "teatro",
    title: "TEATRO",
    icon: <GiDramaMasks />,
    image: teatro,
  },
  {
    key: "zancos",
    title: "ZANCOS",
    icon: <MdAccessibility />,
    image: zancos,
  },
  {
    key: "mimos",
    title: "MIMOS",
    icon: <IoIosPeople />,
    image: mimos,
  },
  {
    key: "orquesta",
    title: "ORQUESTA",
    icon: <MdMusicNote />,
    image: orquesta,
  },
  {
    key: "guitarras",
    title: "GUITARRAS",
    icon: <GiGuitarHead />,
    image: guitarras,
  },
  {
    key: "banda",
    title: "BANDA PAPAYERA",
    icon: <FaMusic />,
    image: banda,
  },
  {
    key: "tambobanda",
    title: "TAMBOBANDA",
    icon: <MdMusicNote />,
    image: tambobanda,
  },
  {
    key: "raul",
    title: "RAÚL GÓMEZ JATTÍN",
    icon: <FaRegCalendarAlt />,
    image: raulgomez,
  },
  {
    key: "cine",
    title: "CINE CLUB",
    icon: <MdMovie />,
    image: cine,
  },
  {
    key: "vallenato",
    title: "MÚSICA VALLENATA",
    icon: <FaMusic />,
    image: vallenato,
  },
  {
    key: "coral",
    title: "CORAL",
    icon: <GiMicrophone />,
    image: coral,
  },
];

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
          <h4 className={styles.activityName}>{act.title}</h4>
        </div>
      ))}
    </div>
  </section>
);

// ======================= COMPONENTE PRINCIPAL =======================

const CultureView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTitle("");
  };

  return (
    <Fragment>
      <main>
        <section className={styles.hero}>
          <h1>Actividades Culturales</h1>
          <p className={styles.heroDescription}>
            La sección de cultura ofrece la posibilidad de vincularse a los
            grupos culturales, como también, desarrollar aptitudes personales en
            las diferentes manifestaciones del arte y la cultura.
          </p>
        </section>

        <ActividadesCulturalesInicio />
        <TableSection onOpen={openModal} />
        <ActivitiesGrid />
        <ContactSection />
      </main>
    </Fragment>
  );
};

export default CultureView;
