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
      </Routes>
    </Router>
  );
}

export default App;
