import React from "react";
import ContactSection from "../components/home/ContactSection";
import styles from "../styles/gruposCultura.module.css";
import { ActividadesCulturalesInicio } from "./CultureView";
import { ActivitiesGrid  } from "./CultureView";

const GruposCulturaView = () => {
  return (
    <>
            <ActividadesCulturalesInicio /> 


       <ActivitiesGrid />
       <ContactSection />
    </>
  );
};

export default GruposCulturaView;
