import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ADMIN_SIDEBAR_ITEMS } from "../../../constants/admin";
import styles from "../../../styles/adminstyles/adminSidebar.module.css";

const AdminSidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Abrir automáticamente el submenú si estamos en una de sus rutas
  useEffect(() => {
    ADMIN_SIDEBAR_ITEMS.forEach((item) => {
      if (item.subItems && isSubItemActive(item.subItems)) {
        setOpenMenus((prev) => ({
          ...prev,
          [item.id]: true,
        }));
      }
    });
  }, [location.pathname]);

  const toggleSubMenu = (itemId) => {
    setOpenMenus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isActive = (url) => location.pathname === url;

  const isSubItemActive = (subItems) => {
    return subItems?.some((subItem) =>
      location.pathname.startsWith(subItem.url)
    );
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {ADMIN_SIDEBAR_ITEMS.map((item) => (
          <div key={item.id} className={styles.menuGroup}>
            {item.subItems ? (
              // Item con submenú
              <>
                <button
                  className={`${styles.navItem} ${
                    isSubItemActive(item.subItems) ? styles.active : ""
                  }`}
                  onClick={() => toggleSubMenu(item.id)}
                >
                  <i className={`${item.icon} ${styles.icon}`}></i>
                  <span className={styles.label}>{item.label}</span>
                  <i
                    className={`pi ${
                      openMenus[item.id]
                        ? "pi-chevron-down"
                        : "pi-chevron-right"
                    } ${styles.chevron}`}
                  ></i>
                </button>
                {openMenus[item.id] && (
                  <div className={styles.subMenu}>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.url}
                        className={`${styles.subNavItem} ${
                          isActive(subItem.url) ? styles.active : ""
                        }`}
                      >
                        <i className={`${subItem.icon} ${styles.subIcon}`}></i>
                        <span className={styles.subLabel}>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Item normal sin submenú
              <Link
                to={item.url}
                className={`${styles.navItem} ${
                  isActive(item.url) ? styles.active : ""
                }`}
              >
                <i className={`${item.icon} ${styles.icon}`}></i>
                <span className={styles.label}>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
