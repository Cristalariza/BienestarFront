import { Outlet } from "react-router-dom";
import GraduateSidebar from "../../components/graduate/sidebar/GraduateSidebar";
import GraduateHeader from "../../components/graduate/header/GraduateHeader";
import styles from "../../styles/adminstyles/adminLayout.module.css";

const GraduateDashboard = () => {
  return (
    <div className={styles.layoutContainer}>
      <GraduateSidebar />
      <div className={styles.mainContainer}>
        <GraduateHeader />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GraduateDashboard;
