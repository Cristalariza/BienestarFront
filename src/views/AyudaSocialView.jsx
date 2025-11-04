import React from "react";
// imagenes
import principal from "../assets/Ayuda_Social/principal/principal.jpg";
import induccion from "../assets/Ayuda_Social/Induccion/INDUCCION-03.png";
import buentrato from "../assets/Ayuda_Social/Buentrato/AYUDAS-04.png";
// componentes
import trabajoSocial from "../assets/Ayuda_Social/Trabajo_Social/TRAB-02.png";
import BuenTrato from "../components/ayudaSocial/BuenTrato";
import InduccionEstudiantes from "../components/ayudaSocial/InduccionEstudiante";
import ServicioTrabajoSocial from "../components/ayudasocial/ServicioTrabajoSocial";
import ConsejeriaPsicologica from "../components/ayudaSocial/ConsejeriaPsicologia";
//compartidos
import Slider from "../components/shared/slider/slider";
import Hero from "../components/shared/hero/Hero";
import GradientBar from "../components/shared/gradiente/GradientBar";

const slides = [
  {
    id: 1,
    image: principal,
    alt: "Universidad - Estudiantes",
    showOverlay: true,
  },
  {
    id: 2,
    image: induccion,
    alt: "Inducción",
  },
  {
    id: 3,
    image: buentrato,
    alt: "Buen Trato",
  },
  {
    id: 4,
    image: trabajoSocial,
    alt: "Trabajo Social",
  },
];

const AyudaSocialView = () => {
  return (
    <>
      <Hero
        title="Sección de ayudas sociales"
        subtitle="Bienestar universitario"
        backgroundSlider={<Slider slides={slides} />}
        gradientText="Buen trato"
      />
      <BuenTrato />
      <GradientBar text="INDUCCIÓN A ESTUDIANTES" />
      <InduccionEstudiantes />
      <GradientBar text="SERVICIO DE TRABAJO SOCIAL" />
      <ServicioTrabajoSocial />
      <GradientBar text="CONSEJERIA PSICOLOGICA Y ORIENTACION PROFESIONAL" />
      <ConsejeriaPsicologica />
    </>
  );
};

export default AyudaSocialView;
