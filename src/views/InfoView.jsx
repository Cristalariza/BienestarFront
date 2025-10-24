import React from "react";

// CSS Modules simulation using style objects
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    // backgroundColor: "#f5f5f5",
  },
  section: {
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e7e4f",
    marginBottom: "10px",
  },
  divider: {
    height: "50px",
    backgroundColor: "#1e7e4f",
    marginBottom: "40px",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    padding: "0 20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
    minHeight: "50px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "20px",
    flex: 1,
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  dateTime: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#666",
  },
  clockIcon: {
    width: "18px",
    height: "18px",
    border: "2px solid #666",
    borderRadius: "50%",
    position: "relative",
    display: "inline-block",
  },
  button: {
    backgroundColor: "#1e7e4f",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textAlign: "center",
  },
};

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const NewsCard = ({ image, title, description, date }) => (
  <div style={styles.card}>
    <img src={image} alt={title} style={styles.cardImage} />
    <div style={styles.cardContent}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDescription}>{description}</p>
      <div style={styles.cardFooter}>
        <div style={styles.dateTime}>
          <ClockIcon />
          <span>{date}</span>
        </div>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#166139")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1e7e4f")}
        >
          Más información
        </button>
      </div>
    </div>
  </div>
);

const EventCard = ({ image, title, description, schedule }) => (
  <div style={styles.card}>
    <img src={image} alt={title} style={styles.cardImage} />
    <div style={styles.cardContent}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDescription}>{description}</p>
      <div style={styles.cardFooter}>
        <div style={styles.dateTime}>
          <ClockIcon />
          <span>{schedule}</span>
        </div>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#166139")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1e7e4f")}
        >
          Más información
        </button>
      </div>
    </div>
  </div>
);

const InfoView = () => {
  const newsData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop",
      title:
        "Cómo aprender un idioma: el sistema completo que realmente funciona",
      description:
        "20 principios y estrategias basados en la ciencia para desarrollar la fluidez. Cómo aprender un idioma: el sistema completo que realmente funciona.",
      date: "Agosto 11, 2025",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
      title:
        "Este selector CSS4 infrautilizado resuelve un problema que llevaba una década",
      description:
        "20 principios y estrategias basados en la ciencia para desarrollar la fluidez. Cómo aprender un idioma: el sistema completo que realmente funciona.",
      date: "Agosto 11, 2025",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
      title:
        "El Congreso aprobó el Presupuesto General de la Nación del Gobierno de Gustavo Petro",
      description:
        "El Senado y la Cámara le dieron el visto bueno a un presupuesto de $546,9 billones de pesos. Ahora sigue la puja por la reforma tributaria.",
      date: "Agosto 11, 2025",
    },
  ];

  const eventsData = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      title: "Torneo de Atletismo",
      description:
        "Campeonato Mundial de Atletismo es la máxima competición de las tres primeras ediciones (de 1983 a 1991) se disputaron de forma cuatrienal, pero a partir de entonces, se convirtió en bienal.",
      schedule: "Lun y Mié 4:00-6:00 PM",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
      title: "Torneo de Baloncesto",
      description:
        "La Liga Profesional de Baloncesto es el campeonato profesional de baloncesto en Colombia. El torneo fue establecido a partir de 1992, pero refundado en 2013.",
      schedule: "Mié y vie 1:00-3:00 PM",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop",
      title: "Torneo de Ajedrez",
      description:
        "Un torneo de ajedrez es una serie de partidas de ajedrez, jugadas competitivamente para determinar un ganador, ya sea individual o en equipo.",
      schedule: "Mié y Vie 8:00-10:00 AM",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Noticias Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Noticias</h2>
        <div style={styles.divider}></div>
        <div style={styles.cardsContainer}>
          {newsData.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>
      </section>

      {/* Eventos Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Eventos</h2>
        <div style={styles.divider}></div>
        <div style={styles.cardsContainer}>
          {eventsData.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default InfoView;
