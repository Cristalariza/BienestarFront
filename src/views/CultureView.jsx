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




export const ActividadesCulturalesInicio = () => {
  const navigate = useNavigate();

  const actividades = [
    { titulo: "Inicio", ruta: "/Culture" },
    { titulo: "Grupos Artísticos Institucionales", ruta: "/GruposCultura" },
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
              onClick={() => navigate(act.ruta)} 
            >
              {act.titulo}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};



export const TableSection = () => {
  const navigate = useNavigate();

  const Table = [
    { titulo: "INSCRIBIRSE EN UN GRUPO ARTISTICO", ruta: "/inscribirse-grupo" },
    { titulo: "PRE-INSCRIBIRSE EN UN GRUPO ARTISTICO", ruta: "/PreInscribirse-grupo" },
    { titulo: "REQUISITOS Y SELECCIÓN", ruta: "/requisitos-seleccion" },
    { titulo: "CONSULTAR HORARIOS DE ENSAYO", ruta: "/horarios-ensayo" },
  ];

  return (
    <section className={styles.tableSection} aria-labelledby="grupos-title">
      <h2 id="grupos-title" className={styles.sectionTitle}>
        Grupos Institucionales
      </h2>

      <div className={styles.tableGrid}>
        {Table.map((Table, i) => (
          <div key={i} className={styles.tableCard}>
            <div className={styles.tableHeader}></div>
            <button
              className={styles.tableButton}
              onClick={() => navigate(Table.ruta)}
            >
              {Table.titulo}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};


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
    title:" ",
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
          <p >
            La sección de cultura ofrece la posibilidad de vincularse a los
            grupos culturales, como también, desarrollar aptitudes personales en
            las diferentes manifestaciones del arte y la cultura.
          </p>
        </section>

        <ActividadesCulturalesInicio />
        <TableSection />
        <ActivitiesGrid />
        <ContactSection />
      </main>
    </Fragment>
  );
};

export default CultureView;
