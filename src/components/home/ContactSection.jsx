import styles from '../../styles/home.module.css';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: 'pi pi-phone',
      title: 'Teléfono:',
      content: 'Número: 605 588 55 92',
      content2: 'Extensión: 1103 - 1104'
    },
    {
      icon: 'pi pi-user',
      title: 'Jefe Bienestar Universitario',
      content: 'Josefina Araujo Arzuaga'
    },
    {
      icon: 'pi pi-map-marker',
      title: 'Ubicación:',
      content: 'Sede Administrativa (Sabanas)',
      content2: 'Piso 1',
      content3: 'Valledupar - Cesar'
    },
    {
      icon: 'pi pi-envelope',
      title: 'Correos:',
      content: 'bienestar@unicesar.edu.co'
    }
  ];

  return (
    <section className={styles.contact}>
      <h2 className={styles.contactTitle}>Información de Contacto</h2>

      <div className={styles.contactGrid}>
        {contactInfo.map((item, index) => (
          <div key={index} className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <i className={item.icon}></i>
            </div>
            <div className={styles.contactContent}>
              <h4 className={styles.contactCardTitle}>{item.title}</h4>
              <p className={styles.contactText}>{item.content}</p>
              {item.content2 && <p className={styles.contactText}>{item.content2}</p>}
              {item.content3 && <p className={styles.contactText}>{item.content3}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
