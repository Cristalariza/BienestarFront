import styles from '../../styles/pqrs.module.css';

const PQRSContactInfo = () => {
  const contactItems = [
    {
      id: 'telefono',
      title: 'Teléfono',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      details: [
        'Teléfono:',
        'Número: 605 588 5592',
        'Extensión: 1184'
      ]
    },
    {
      id: 'jefe-seccion',
      title: 'Jefe Sección Deporte y Recreación',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      details: [
        'Jefe Sección Deporte y Recreación',
        'Ricardo Movilla Andrade',
        '304 390 5914'
      ]
    },
    {
      id: 'ubicacion',
      title: 'Ubicación',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      details: [
        'Ubicación:',
        'Sede Parque La Vallenata',
        'Valledupar - Cesar'
      ]
    },
    {
      id: 'correos',
      title: 'Correos',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      details: [
        'Correos:',
        'secciondeporte@unicesar.edu.co',
        'ricardomovilla@unicesar.edu.co'
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contactHeader}>
        <h2 className={styles.contactTitle}>
          Información de Contacto
        </h2>
      </div>
      
      <div className={styles.contactGrid}>
        {contactItems.map((item) => (
          <div key={item.id} className={styles.contactCard}>
            <div className={styles.contactIcon}>
              {item.icon}
            </div>
            <h3 className={styles.contactCardTitle}>
              {item.title}
            </h3>
            <div className={styles.contactDetails}>
              {item.details.map((detail, index) => (
                <p key={index} className={styles.contactDetail}>
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PQRSContactInfo;
