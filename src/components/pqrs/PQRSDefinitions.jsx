import styles from '../../styles/pqrs.module.css';

const PQRSDefinitions = () => {
  const definitions = [
    {
      id: 'peticion',
      question: '¿Qué es una petición?',
      answer: 'Es el requerimiento que se realiza en nombre propio, apoderado, representante o entidad para solicitar el reconocimiento de un derecho, la prestación de un servicio, pedir información, documentos o copias, formular consultas y obtener respuesta oportuna y de fondo.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9l-5.91 2.74L12 16l-1.09-4.26L5 9l5.91-1.74L12 2z" />
        </svg>
      )
    },
    {
      id: 'queja',
      question: '¿Qué es una queja?',
      answer: 'Es la manifestación de desacuerdo, insatisfacción o descontento al recibir una atención inadecuada por parte de un servidor público.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'reclamo',
      question: '¿Qué es un reclamo?',
      answer: 'Es la exigencia ante la ausencia o indebida prestación de un servicio o la falta de atención de una petición.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    {
      id: 'sugerencia',
      question: '¿Qué es una sugerencia?',
      answer: 'Es la manifestación de una propuesta para plantear un cambio o mejora de un servicio, trámite o proceso.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.definitionsHeader}>
        <h2 className={styles.definitionsTitle}>
          A continuación describimos en detalle cada opción para facilitar su registro:
        </h2>
      </div>
      
      <div className={styles.definitionsGrid}>
        {definitions.map((definition) => (
          <div key={definition.id} className={styles.definitionCard}>
            <div>
              <h3 className={styles.definitionQuestion}>
                {definition.question}
              </h3>
            </div>
            <div className={styles.definitionAnswer}>
              <div className={styles.definitionIcon}>
                {definition.icon}
              </div>
              <p className={styles.definitionText}>
                {definition.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PQRSDefinitions;
