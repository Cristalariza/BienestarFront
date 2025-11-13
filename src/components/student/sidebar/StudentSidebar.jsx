import { Link, useLocation } from "react-router-dom";
import styles from "../../../styles/adminstyles/adminSidebar.module.css";

const STUDENT_SIDEBAR_ITEMS = [
  {
    id: "pqrs",
    label: "PQRS",
    icon: "pi pi-comment",
    url: "/student/pqrs",
  },
  {
    id: "my-pqrs",
    label: "Mis PQRS",
    icon: "pi pi-list",
    url: "/student/my-pqrs",
  },
];

const StudentSidebar = () => {
  const location = useLocation();

  const isActive = (url) => location.pathname === url;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {STUDENT_SIDEBAR_ITEMS.map((item) => (
          <div key={item.id} className={styles.menuGroup}>
            <Link
              to={item.url}
              className={`${styles.navItem} ${
                isActive(item.url) ? styles.active : ""
              }`}
            >
              <i className={`${item.icon} ${styles.icon}`}></i>
              <span className={styles.label}>{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default StudentSidebar;
