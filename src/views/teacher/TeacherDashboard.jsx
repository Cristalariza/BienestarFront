import { Outlet } from "react-router-dom";
import TeacherSidebar from "../../components/teacher/sidebar/TeacherSidebar";
import TeacherHeader from "../../components/teacher/header/TeacherHeader";
import styles from "../../styles/adminstyles/adminLayout.module.css";

const TeacherDashboard = () => {
  return (
    <div className={styles.layoutContainer}>
      <TeacherSidebar />
      <div className={styles.mainContainer}>
        <TeacherHeader />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
