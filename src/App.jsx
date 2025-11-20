import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AdministracionLayout from "./components/layouts/AdministracionLayout";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/NotFoundView";
import SportsView from "./views/SportsView";
import InclusiveView from "./views/InclusiveView";
import PQRSView from "./views/PQRSView";
import CultureView from "./views/CultureView";
import AyudaSocialView from "./views/AyudaSocialView";
import InfoView from "./views/InfoView";

import GruposCulturaView from "./views/GruposCulturaView";
import AcademiaView from "./views/AcademiaView";
import LogrosView from "./views/LogrosView";
import NormatividadView from "./views/NormatividadView";
import NoticiaDetalleView from "./views/NoticiaDetalleView";

// Vistas Admin
import AdminDashboard from "./views/admin/AdminDashboard";
import AdminCultura from "./views/admin/AdminCultura";
import AdminDeporte from "./views/admin/AdminDeporte";
import AdminCulturaDetalle from "./views/admin/AdminCulturaDetalle";
import AdminDeporteDetalle from "./views/admin/AdminDeporteDetalle";
import AdminPQRS from "./views/admin/AdminPQRS";
import { AdminNoticias } from "./views/admin/AdminNoticias";
import { AdminEventos } from "./views/admin/AdminEventos";

// Vistas Admin - Cultura
import GruposCulturales from "./views/admin/cultura/GruposCulturales";
import Preinscripciones from "./views/admin/cultura/Preinscripciones";
import Inscripciones from "./views/admin/cultura/Inscripciones";
import Vestuario from "./views/admin/cultura/Vestuario";
import Instrumentos from "./views/admin/cultura/Instrumentos";
import Asistencia from "./views/admin/cultura/Asistencia";
import ReporteCultura from "./views/admin/cultura/ReporteCultura";

// Vistas Admin - Deporte
import GruposDeportivos from "./views/admin/deporte/GruposDeportivos";
import InscripcionDeporte from "./views/admin/deporte/Inscripcion";
import AsistenciaDeporte from "./views/admin/deporte/Asistencia";
import ReporteDeporte from "./views/admin/deporte/ReporteDeporte";

// Vistas Admin - Ayuda Social
import Bicicletas from "./views/admin/ayuda-social/Bicicletas";
import GruposJuveniles from "./views/admin/ayuda-social/GruposJuveniles";

// Vistas Estudiante
import StudentDashboard from "./views/student/StudentDashboard";
import StudentPQRS from "./views/student/StudentPQRS";
import MyPQRS from "./views/student/MyPQRS";

// Vistas Docente
import TeacherDashboard from "./views/teacher/TeacherDashboard";
import TeacherPQRS from "./views/teacher/TeacherPQRS";
import MyPQRSTeacher from "./views/teacher/MyPQRS";

// Vistas Egresado
import GraduateDashboard from "./views/graduate/GraduateDashboard";
import GraduatePQRS from "./views/graduate/GraduatePQRS";
import MyPQRSGraduate from "./views/graduate/MyPQRS";

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
          path="/registro"
          element={
            <MainLayout showSubMenu={false}>
              <RegisterView />
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
              <InclusiveView />
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
          path="/ayuda-social"
          element={
            <MainLayout showSubMenu={true}>
              <AyudaSocialView />
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
          path="/noticia/:id"
          element={
            <MainLayout showSubMenu={true}>
              <NoticiaDetalleView />
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
        <Route path="/CultureView" element={<CultureView />} />
        <Route path="/GruposCulturaView" element={<GruposCulturaView />} />
        <Route path="/academia" element={<AcademiaView />} />
        <Route path="/logros" element={<LogrosView />} />
        <Route path="/normatividad" element={<NormatividadView />} />
        <Route path="*" element={<NotFoundView />} />

        {/* Rutas administración */}
        <Route path="/admin" element={<AdministracionLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="deporte/grupos" element={<GruposDeportivos />} />
          <Route
            path="deporte/grupos/:actividad"
            element={<AdminDeporteDetalle />}
          />
          <Route path="deporte/inscripcion" element={<InscripcionDeporte />} />
          <Route path="deporte/asistencia" element={<AsistenciaDeporte />} />
          <Route path="deporte/reporte" element={<ReporteDeporte />} />
          <Route path="deporte" element={<AdminDeporte />} />
          <Route path="deporte/:actividad" element={<AdminDeporteDetalle />} />

          {/* Rutas cultura */}
          <Route path="cultura/grupos" element={<GruposCulturales />} />
          <Route
            path="cultura/grupos/:actividad"
            element={<AdminCulturaDetalle />}
          />
          <Route
            path="cultura/preinscripciones"
            element={<Preinscripciones />}
          />
          <Route path="cultura/inscripciones" element={<Inscripciones />} />
          <Route path="cultura/vestuario" element={<Vestuario />} />
          <Route path="cultura/instrumentos" element={<Instrumentos />} />
          <Route path="cultura/asistencia" element={<Asistencia />} />
          <Route path="cultura/reporte" element={<ReporteCultura />} />

          <Route path="cultura" element={<AdminCultura />} />
          <Route path="cultura/:actividad" element={<AdminCulturaDetalle />} />

          {/* Rutas Ayuda Social */}
          <Route path="ayuda-social/bicicletas" element={<Bicicletas />} />
          <Route
            path="ayuda-social/grupos-juveniles"
            element={<GruposJuveniles />}
          />

          {/* Rutas PQRs */}
          <Route path="pqrs" element={<AdminPQRS />} />

          {/* Rutas Informativo */}
          <Route path="noticias" element={<AdminNoticias />} />
          <Route path="eventos" element={<AdminEventos />} />
        </Route>

        {/* Rutas estudiante */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<StudentPQRS />} />
          <Route path="pqrs" element={<StudentPQRS />} />
          <Route path="my-pqrs" element={<MyPQRS />} />
        </Route>

        {/* Rutas docente */}
        <Route path="/teacher" element={<TeacherDashboard />}>
          <Route index element={<TeacherPQRS />} />
          <Route path="pqrs" element={<TeacherPQRS />} />
          <Route path="my-pqrs" element={<MyPQRSTeacher />} />
        </Route>

        {/* Rutas egresado */}
        <Route path="/graduate" element={<GraduateDashboard />}>
          <Route index element={<GraduatePQRS />} />
          <Route path="pqrs" element={<GraduatePQRS />} />
          <Route path="my-pqrs" element={<MyPQRSGraduate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
