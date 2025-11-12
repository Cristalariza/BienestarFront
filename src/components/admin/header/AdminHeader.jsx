import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { authService } from "../../../services";
import styles from "../../../styles/adminstyles/adminHeader.module.css";

const AdminHeader = () => {
  const [userName, setUserName] = useState("Usuario");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await authService.getProfile();

        if (profile) {
          if (profile.nombre_completo) {
            setUserName(profile.nombre_completo);
          } else if (profile.primer_nombre && profile.primer_apellido) {
            setUserName(`${profile.primer_nombre} ${profile.primer_apellido}`);
          } else if (profile.nombre && profile.apellido) {
            setUserName(`${profile.nombre} ${profile.apellido}`);
          } else if (profile.correo_elec || profile.email) {
            const email = profile.correo_elec || profile.email;
            const emailName = email.split("@")[0];
            setUserName(emailName);
          }

          if (profile.correo_elec || profile.email) {
            setUserEmail(profile.correo_elec || profile.email);
          }
        }
      } catch (error) {
        console.error(
          "Error al cargar perfil, usando datos de localStorage:",
          error
        );

        const user = authService.getCurrentUser();
        if (user) {
          if (user.nombre_completo) {
            setUserName(user.nombre_completo);
          } else if (user.primer_nombre && user.primer_apellido) {
            setUserName(`${user.primer_nombre} ${user.primer_apellido}`);
          } else if (user.nombre && user.apellido) {
            setUserName(`${user.nombre} ${user.apellido}`);
          } else if (user.correo_elec || user.email) {
            const email = user.correo_elec || user.email;
            const emailName = email.split("@")[0];
            setUserName(emailName);
          }

          if (user.correo_elec || user.email) {
            setUserEmail(user.correo_elec || user.email);
          }
        }
      }
    };

    loadUserProfile();
  }, []);

  const userMenuItems = [
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      command: () => {
        authService.logout();
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
