import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/sidebar/AdminSidebar";
import AdminHeader from "../admin/header/AdminHeader";
import styles from "../../styles/adminstyles/adminLayout.module.css";

const AdministracionLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <AdminSidebar />
      <div className={styles.mainContainer}>
        <AdminHeader />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdministracionLayout;
