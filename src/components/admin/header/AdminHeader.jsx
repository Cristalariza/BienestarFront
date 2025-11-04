import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import styles from "../../../styles/adminstyles/adminHeader.module.css";

const AdminHeader = () => {
  const [userName] = useState("John Titor");
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const userMenuItems = [
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      command: () => {
        // TODO: Implementar lógica de cierre de sesión
        navigate("/login");
      },
    },
  ];

  const toggleUserMenu = (event) => {
    menuRef.current.toggle(event);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <img
            src="/Logo_upc_nuevo.png"
            alt="Universidad Popular del Cesar"
            className={styles.logo}
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Crect width="200" height="60" fill="white"/%3E%3Ccircle cx="30" cy="30" r="25" stroke="%231C7A3D" stroke-width="4" fill="none"/%3E%3Ctext x="70" y="38" fill="%231C7A3D" font-size="20" font-weight="bold"%3EUPC%3C/text%3E%3C/svg%3E';
            }}
          />
          <h1 className={styles.title}>Sistema de Bienestar Institucional</h1>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.notificationButton} disabled>
            <i className="pi pi-bell"></i>
          </button>

          <div className={styles.userMenu} onClick={toggleUserMenu}>
            <i className="pi pi-user"></i>
            <span className={styles.userName}>{userName}</span>
          </div>

          <Menu model={userMenuItems} popup ref={menuRef} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
