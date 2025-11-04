/**
 * Componente: LatestNewsSection
 * Sección de últimas noticias en el home
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { noticiasService } from '../../services';
import styles from '../../styles/news.module.css';
import escudoUPC from '../../assets/escudo.png';

const LatestNewsSection = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        setLoading(true);
        // Obtener solo las 3 noticias más recientes
        const data = await noticiasService.obtenerTodas({ skip: 0, limit: 3 });
        console.log('Noticias cargadas del backend:', data);

        // Mapear los datos del backend a la estructura que espera el componente
        const noticiasFormateadas = (data || []).map((noticia, index) => ({
          noticia_id: noticia.noticia_id || noticia.created_at || index,
          titulo: noticia.nombre || noticia.titulo || 'Noticia sin título',
          contenido: noticia.descripcion || noticia.contenido || 'Contenido de la noticia...',
          fecha_publicacion: noticia.fecha || noticia.fecha_publicacion || noticia.created_at,
          imagen_url: noticia.imagen || noticia.imagen_url || null
        }));

        console.log('Noticias formateadas:', noticiasFormateadas);
        setNoticias(noticiasFormateadas);
      } catch (error) {
        console.error('Error cargando noticias:', error);
        // Si falla el servicio, usar datos de ejemplo para desarrollo
        setNoticias([
          {
            noticia_id: 1,
            titulo: 'UPC rumbo a la Acreditación Institucional de Alta Calidad',
            contenido: 'La Universidad Popular del Cesar avanza firmemente en el proceso de acreditación institucional de alta calidad ante el Ministerio de Educación.',
            fecha_publicacion: new Date().toISOString(),
            imagen_url: null
          },
          {
            noticia_id: 2,
            titulo: 'Se inaugura el nuevo comedor Universitario de la UPC',
            contenido: 'La Universidad Popular del Cesar inauguró sus modernas instalaciones del comedor universitario, beneficiando a más de 3.000 estudiantes.',
            fecha_publicacion: new Date().toISOString(),
            imagen_url: null
          },
          {
            noticia_id: 3,
            titulo: 'Campus Universitario: Educación y Futuro para el Cesar',
            contenido: 'El campus de la Universidad Popular del César se consolida como el principal centro de formación profesional del departamento.',
            fecha_publicacion: new Date().toISOString(),
            imagen_url: null
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    cargarNoticias();
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

  const truncarTexto = (texto, maxLength = 200) => {
    if (!texto) return '';
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>
              Últimas Noticias
            </h2>
          </div>
          <div className={styles.loadingContainer}>
            <i className={`pi pi-spin pi-spinner ${styles.spinner}`}></i>
            <p className={styles.loadingText}>Cargando noticias...</p>
          </div>
        </div>
      </section>
    );
  }

  if (noticias.length === 0) {
    return (
      <section>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>
              Últimas Noticias
            </h2>
          </div>
          <div className={styles.emptyContainer}>
            <i className={`pi pi-info-circle ${styles.emptyIcon}`}></i>
            <p className={styles.emptyText}>No hay noticias disponibles en este momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            Últimas Noticias
          </h2>
        </div>

        <div className={styles.grid}>
          {noticias.map((noticia) => (
            <div key={noticia.noticia_id} className={styles.card}>
              {/* Imagen de la noticia */}
              <div className={styles.imageContainer}>
                <img
                  src={noticia.imagen_url || escudoUPC}
                  alt={noticia.titulo || 'Noticia UPC'}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = escudoUPC;
                  }}
                />
              </div>

              {/* Contenido de la card */}
              <div className={styles.cardContent}>
                {/* Fecha */}
                <div className={styles.date}>
                  <i className={`pi pi-calendar ${styles.dateIcon}`}></i>
                  <span>{formatearFecha(noticia.fecha_publicacion)}</span>
                </div>

                {/* Título */}
                <h3 className={styles.title}>
                  {noticia.titulo || 'Noticia sin título'}
                </h3>

                {/* Contenido (extracto) */}
                <p className={styles.content}>
                  {truncarTexto(noticia.contenido || 'Contenido de la noticia...', 200)}
                </p>

                {/* Botón leer más - solo mostrar si el contenido fue truncado */}
                {(noticia.contenido && noticia.contenido.length > 200) && (
                  <Link to={`/noticia/${noticia.noticia_id}`} className={styles.readMore}>
                    Leer más
                    <i className={`pi pi-arrow-right ${styles.arrowIcon}`}></i>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
