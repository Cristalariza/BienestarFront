import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import styles from '../styles/notfound.module.css';

const NotFoundView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir automáticamente después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Página No Encontrada</h1>
        <p className={styles.description}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <p className={styles.redirect}>
          Serás redirigido al inicio en 5 segundos...
        </p>
        <Button
          label="Volver al Inicio"
          icon="pi pi-home"
          className={styles.homeButton}
          onClick={handleGoHome}
        />
      </div>
    </div>
  );
};

export default NotFoundView;
