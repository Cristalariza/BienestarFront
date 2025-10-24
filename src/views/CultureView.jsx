import React, { Fragment, useState } from "react";
// import Header from "../shared/Header";
// import SubMenu from "../shared/SubMenu";
// import Footer from "../shared/Footer";
import ContactSection from "../components/home/ContactSection";
import styles from "../../src/styles/culture.module.css";
// import image1 from "../../assets/image1.png";
// import image2 from "../../assets/image2.png";
// import image3 from "../../assets/image3.png";
// import image4 from "../../assets/image4.png";
// import image5 from "../../assets/image5.png";

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

// ======================= COMPONENTES SECUNDARIOS =======================

const ActividadesCulturalesInicio = () => {
  const actividades = [
    {
      titulo: "INICIO",
      // imagen: image1
    },
    {
      titulo: "Grupos Artísticos Institucionales",
      // imagen: image2
    },
    {
      titulo: "Cultura y academia",
      // imagen: image3
    },
    {
      titulo: "Logros Obtenidos",
      // imagen: image4
    },
    {
      titulo: "Normatividad",
      // imagen: image5
    },
  ];

  return (
    <section className={styles.actividadesInicioSection2}>
      <p className={styles.actividadesDescription2}></p>
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

const ActivitiesGrid = () => (
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
