import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import NotFoundView from "./views/NotFoundView";
import SportsView from "./views/SportsView";
import IncluseView from "./views/InclusiveView";
import PQRSView from "./views/PQRSView";
import CultureView from "./views/CultureView";
import InfoView from "./views/InfoView";

import GruposCulturaView from "./views/GruposCulturaView";
import AcademiaView from "./views/AcademiaView";
import LogrosView from "./views/LogrosView";
import NormatividadView from "./views/NormatividadView";

import InscribirseGrupoView from "./views/InscribirseGrupoView";
import RequisitosSeleccionView from "./views/RequisitosSeleccionView";
import PreInscribirseGrupoView from "./views/PreInscribirseGrupoView";
//import ConvocatoriaNuevosView from "./views/ConvocatoriaNuevosView";
//import HorariosEnsayoView from "./views/HorariosEnsayoView";



function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout showSubMenu={true}>
              <HomeView />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout showSubMenu={false}>
              <LoginView />
            </MainLayout>
          }
        />
        <Route
          path="/deportes"
          element={
            <MainLayout showSubMenu={true}>
              <SportsView />
            </MainLayout>
          }
        />
        <Route
          path="/educacion-inclusiva"
          element={
            <MainLayout showSubMenu={true}>
              <IncluseView />
            </MainLayout>
          }
        />
        <Route
          path="/cultura"
          element={
            <MainLayout showSubMenu={true}>
              <CultureView />
            </MainLayout>
          }
        />
        <Route
          path="/informativo"
          element={
            <MainLayout showSubMenu={true}>
              <InfoView />
            </MainLayout>
          }
        />
        <Route
          path="/pqrs"
          element={
            <MainLayout showSubMenu={true}>
              <PQRSView />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout showSubMenu={false}>
              <NotFoundView />
            </MainLayout>
          }
        />
           <Route path="/" element={<HomeView />} />
           <Route path="/Culture" element={ <MainLayout showSubMenu={true}><CultureView /></MainLayout>}/>
           <Route path="/GruposCultura" element={<MainLayout showSubMenu={true}><GruposCulturaView /></MainLayout>} />
           <Route path="/academia" element={<MainLayout showSubMenu={true}><AcademiaView /></MainLayout>} />
           <Route path="/logros" element={<MainLayout showSubMenu={true}><LogrosView /></MainLayout>} />
           <Route path="/normatividad" element={<MainLayout showSubMenu={true}><NormatividadView /></MainLayout>} />
           <Route path="*" element={<NotFoundView />} />

           <Route path="/inscribirse-grupo" element={<MainLayout showSubMenu={true}><InscribirseGrupoView /></MainLayout>} />
           <Route path="/requisitos-seleccion" element={<MainLayout showSubMenu={true}><RequisitosSeleccionView /></MainLayout>} />
           <Route path="/PreInscribirse-grupo" element={<MainLayout showSubMenu={true}><PreInscribirseGrupoView /></MainLayout>} />
             {/*<Route path="/convocatoria-nuevos" element={<MainLayout showSubMenu={true}><ConvocatoriaNuevosView /></MainLayout>} />*/}
          {/* <Route path="/horarios-ensayo" element={<MainLayout showSubMenu={true}><HorariosEnsayoView /></MainLayout>} />*/}


      </Routes>
      
    </Router>
  );
}

export default App;
