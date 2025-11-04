/**
 * Vista de detalle de noticia
 * Muestra el contenido completo de una noticia individual
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { noticiasService } from '../services';
import styles from '../styles/noticiaDetalle.module.css';
import escudoUPC from '../assets/escudo.png';

const NoticiaDetalleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const cargarNoticia = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await noticiasService.obtenerPorId(id);
        console.log('Noticia cargada:', data);

        // Mapear los datos del backend
        const noticiaFormateada = {
          noticia_id: data.noticia_id,
          titulo: data.nombre || data.titulo || 'Noticia sin título',
          contenido: data.descripcion || data.contenido || 'Contenido de la noticia...',
          fecha_publicacion: data.fecha || data.fecha_publicacion || data.created_at,
          imagen_url: data.imagen || data.imagen_url,
          categoria: data.categoria || 'General'
        };

        setNoticia(noticiaFormateada);
      } catch (error) {
        console.error('Error cargando noticia:', error);
        setError('No se pudo cargar la noticia. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cargarNoticia();
    }
  }, [id]);

  // Detectar scroll para mostrar botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    // Extraer componentes de fecha para evitar problemas de zona horaria
    const dateStr = fecha.split('T')[0]; // Obtener YYYY-MM-DD
    const [year, month, day] = dateStr.split('-').map(num => parseInt(num));
    // Crear fecha sin conversión de zona horaria
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleVolver = () => {
    navigate(-1); // Volver a la página anterior
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <i className={`pi pi-spin pi-spinner ${styles.spinner}`}></i>
          <p className={styles.loadingText}>Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (error || !noticia) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <i className={`pi pi-exclamation-circle ${styles.errorIcon}`}></i>
          <h2 className={styles.errorTitle}>Error al cargar la noticia</h2>
          <p className={styles.errorText}>{error || 'Noticia no encontrada'}</p>
          <button onClick={handleVolver} className={styles.backButton}>
            <i className="pi pi-arrow-left"></i>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Botón volver */}
      <button onClick={handleVolver} className={styles.backButtonTop}>
        <i className="pi pi-arrow-left"></i>
        Volver
      </button>

      {/* Categoría */}
      <div className={styles.categoryBadge}>{noticia.categoria}</div>

      {/* Título */}
      <h1 className={styles.title}>{noticia.titulo}</h1>

      {/* Metadata */}
      <div className={styles.metadata}>
        <div className={styles.metaItem}>
          <i className="pi pi-calendar"></i>
          <span>{formatearFecha(noticia.fecha_publicacion)}</span>
        </div>
      </div>

      {/* Imagen principal */}
      <div className={styles.imageContainer}>
        <img
          src={noticia.imagen_url || escudoUPC}
          alt={noticia.titulo}
          className={styles.image}
          onError={(e) => {
            e.target.src = escudoUPC;
          }}
        />
      </div>

      {/* Contenido */}
      <div className={styles.content}>
        <div className={styles.contentText}>
          {noticia.contenido.split('\n').map((parrafo, index) => (
            <p key={index} className={styles.paragraph}>
              {parrafo}
            </p>
          ))}
        </div>
      </div>

      {/* Compartir en redes sociales */}
      <div className={styles.shareSection}>
        <h3 className={styles.shareTitle}>Compartir en</h3>
        <div className={styles.shareButtons}>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${styles.facebook}`}
            aria-label="Compartir en Facebook"
          >
            <i className="pi pi-facebook"></i>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(noticia.titulo)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${styles.twitter}`}
            aria-label="Compartir en Twitter"
          >
            <i className="pi pi-twitter"></i>
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(noticia.titulo + ' ' + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${styles.whatsapp}`}
            aria-label="Compartir en WhatsApp"
          >
            <i className="pi pi-whatsapp"></i>
          </a>
        </div>
      </div>

      {/* Botón volver inferior */}
      <div className={styles.backButtonBottom}>
        <button onClick={handleVolver} className={styles.backButton}>
          <i className="pi pi-arrow-left"></i>
          Volver a noticias
        </button>
      </div>

      {/* Botón flotante para volver arriba */}
      <button
        onClick={scrollToTop}
        className={`${styles.scrollToTop} ${showScrollTop ? styles.visible : ''}`}
        aria-label="Volver arriba"
      >
        <i className="pi pi-arrow-up"></i>
      </button>
    </div>
  );
};

export default NoticiaDetalleView;
