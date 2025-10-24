import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/submenu.module.css";

const SubMenu = ({ show = true }) => {
  const location = useLocation();
  
  const menuItems = [
    { label: "Inicio", url: "/" },
    { label: "Deportes", url: "/deportes" },
    { label: "Cultura", url: "/cultura" },
    { label: "Ayuda Social", url: "/ayuda-social" },
    { label: "Informativo", url: "/informativo" },
    { label: "PQRs", url: "/pqrs" },
    { label: "Educación Inclusiva", url: "/educacion-inclusiva" },
  ];

  if (!show) return null;

  return (
    <nav className={styles.subMenu}>
      <div className={styles.container}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className={`${styles.menuItem} ${location.pathname === item.url ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default SubMenu;
