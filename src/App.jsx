import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import NotFoundView from "./views/NotFoundView";
import SportsView from "./views/SportsView";
import IncluseView from "./views/InclusiveView";

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
