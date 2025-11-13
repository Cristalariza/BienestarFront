import { Outlet } from "react-router-dom";
import StudentSidebar from "../../components/student/sidebar/StudentSidebar";
import StudentHeader from "../../components/student/header/StudentHeader";
import styles from "../../styles/adminstyles/adminLayout.module.css";

const StudentDashboard = () => {
  return (
    <div className={styles.layoutContainer}>
      <StudentSidebar />
      <div className={styles.mainContainer}>
        <StudentHeader />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
