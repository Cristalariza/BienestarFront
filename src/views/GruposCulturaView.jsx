import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import ContactSection from "../components/home/ContactSection";
import styles from "../styles/gruposCultura.module.css";
import { ActividadesCulturalesInicio } from "./CultureView";
import { ActivitiesGrid } from "./CultureView";

const GruposCulturaView = () => {
  return (
    <MainLayout>
      <ActividadesCulturalesInicio />

      <ActivitiesGrid />
      <ContactSection />
    </MainLayout>
  );
};

export default GruposCulturaView;
