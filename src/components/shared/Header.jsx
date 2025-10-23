import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import styles from '../../styles/header.module.css';

const Header = () => {
  const [showPortals, setShowPortals] = useState(true);
  const navigate = useNavigate();

  const portalLinks = [
    { label: 'Egresados', url: '#' },
    { label: 'Docentes', url: '#' },
    { label: 'Administrativos', url: '#' },
    { label: 'Estudiantes', url: '#' }
  ];

  const togglePortals = () => {
    setShowPortals(!showPortals);
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection} onClick={handleHomeRedirect}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Logo_upc_nuevo.png"
            alt="Universidad Popular del Cesar"
            className={styles.logo}
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Crect width="200" height="60" fill="white"/%3E%3Ccircle cx="30" cy="30" r="25" stroke="%231C7A3D" stroke-width="4" fill="none"/%3E%3Ctext x="70" y="38" fill="%231C7A3D" font-size="20" font-weight="bold"%3EUPC%3C/text%3E%3C/svg%3E';
            }}
          />
          <div className={styles.divider}></div>
          <h1 className={styles.title}>Sistema de Bienestar Universitario</h1>
        </div>

        <nav className={styles.navigation}>
          {showPortals && portalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={styles.navLink}
            >
              {link.label}
            </a>
          ))}
          <Button
            label="Portales"
            icon={showPortals ? "pi pi-angle-up" : "pi pi-angle-down"}
            iconPos="right"
            className={styles.portalButton}
            onClick={togglePortals}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
