import { Button } from 'primereact/button';
import estructuraImage from '../../assets/EstructuraOrganizacional.jpeg';
import styles from '../../styles/home.module.css';

const StructureSection = () => {
  const areas = [
    'Dirección de Bienestar: Coordina todas las actividades y programas',
    'Coordinación Deportiva: Gestiona programas deportivos y recreativos',
    'Coordinación Cultural: Desarrolla actividades artísticas y culturales',
    'Coordinación de Apoyo Social: Brinda acompañamiento psicológico y social',
    'Coordinación de Salud: Servicios médicos y de prevención'
  ];

  const policies = [
    {
      icon: 'pi pi-shield',
      title: 'Política de Inclusión',
      description: 'Garantizamos espacios accesibles y respetuosos para toda la comunidad universitaria, sin discriminación.'
    },
    {
      icon: 'pi pi-book',
      title: 'Formación Integral',
      description: 'Promovemos el desarrollo de competencias complementarias a la formación académica.'
    },
    {
      icon: 'pi pi-users',
      title: 'Participación Activa',
      description: 'Fomentamos la participación de estudiantes, docentes y administrativos en todas nuestras actividades.'
    },
    {
      icon: 'pi pi-file',
      title: 'Transparencia',
      description: 'Operamos con criterios claros y transparentes en todos nuestros procesos y programas.'
    }
  ];

  return (
    <section className={styles.structure}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Estructura y Políticas</h2>
        <p className={styles.sectionSubtitle}>
          Conoce cómo estamos organizados y los principios que guían nuestro trabajo
        </p>
      </div>

      <div className={styles.structureContent}>
        <div className={styles.structureLeft}>
          <h3 className={styles.structureSubtitle}>Estructura Organizacional</h3>
          <p className={styles.structureDescription}>
            Bienestar Universitario está estructurado para brindar atención integral a la comunidad UPC a través de diferentes coordinaciones y programas especializados.
          </p>

          <div className={styles.structureImageContainer}>
            <img src={estructuraImage} alt="Estructura jerárquica de Bienestar Universitario UPC" />
            <div className={styles.structureImageOverlay}>
              Estructura jerárquica de Bienestar Universitario UPC
            </div>
          </div>

          <div className={styles.structureAreas}>
            <h4 className={styles.areasTitle}>Nuestras Áreas:</h4>
            <ul className={styles.areasList}>
              {areas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.structureRight}>
          <h3 className={styles.structureSubtitle}>Políticas Institucionales</h3>
          <p className={styles.structureDescription}>
            Nuestras políticas garantizan un servicio de calidad, inclusivo y transparente para toda la comunidad universitaria.
          </p>

          <div className={styles.policiesList}>
            {policies.map((policy, index) => (
              <div key={index} className={styles.policyItem}>
                <div className={styles.policyIcon}>
                  <i className={policy.icon}></i>
                </div>
                <div className={styles.policyContent}>
                  <h4 className={styles.policyTitle}>{policy.title}</h4>
                  <p className={styles.policyDescription}>{policy.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.regulationBox}>
            <div className={styles.regulationIcon}>
              <i className="pi pi-file-pdf"></i>
            </div>
            <div className={styles.regulationContent}>
              <h4 className={styles.regulationTitle}>Reglamento Completo</h4>
              <p className={styles.regulationDescription}>
                Consulta el reglamento completo de Bienestar Universitario con todas las políticas, procedimientos y lineamientos institucionales.
              </p>
              <Button
                label="Descargar Reglamento"
                icon="pi pi-download"
                className={styles.regulationButton}
                onClick={() => window.open('#', '_blank')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
