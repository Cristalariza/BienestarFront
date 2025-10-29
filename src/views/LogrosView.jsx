import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import ContactSection from "../components/home/ContactSection";
import styles from "../styles/logros.module.css";
import { ActividadesCulturalesInicio } from "./CultureView";

const LogrosView = () => {
  const logros = [
    "Participación en el Festival Nacional de Teatro 2024.",
    "Premio a la mejor coreografía regional.",
    "Reconocimiento a la Orquesta Institucional.",
  ];

  return (
    <MainLayout>
        <ActividadesCulturalesInicio /> 
      <h1>Logros Obtenidos</h1>
      <ul className={styles.lista}>
        {logros.map((logro, index) => (
          <li key={index}>{logro}</li>
        ))}
      </ul>
    <ContactSection />
    </MainLayout>

  );
};

export default LogrosView;

