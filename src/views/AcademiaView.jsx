import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import styles from "../styles/academia.module.css";
import ContactSection from "../components/home/ContactSection";
import { ActividadesCulturalesInicio } from "./CultureView";

const AcademiaView = () => {
  return (
    <MainLayout>
        <ActividadesCulturalesInicio /> 
      <h1>Cultura y Academia</h1>
      <p>
        Programas culturales que fortalecen la formación integral y artística
        de los estudiantes.
      </p>
       <ContactSection />
    </MainLayout>
  );
};

export default AcademiaView;
