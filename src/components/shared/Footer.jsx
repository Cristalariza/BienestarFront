import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { UNIVERSITY_INFO } from '../../constants';
import escudoUPC from '../../assets/escudo.png';
import styles from '../../styles/footer.module.css';

const Footer = () => {
  const socialIcons = [
    { icon: faFacebookF, url: 'https://www.facebook.com/unipopularcesar/', label: 'Facebook' },
    { icon: faTwitter, url: 'https://twitter.com/UnicesarOficial', label: 'Twitter' },
    { icon: faInstagram, url: 'https://www.instagram.com/unipopularcesar/', label: 'Instagram' },
    { icon: faLinkedinIn, url: 'https://www.linkedin.com/school/universidad-popular-del-cesar/', label: 'LinkedIn' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.mainSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.logoColumn}>
            <img
              src={escudoUPC}
              alt={UNIVERSITY_INFO.name}
              className={styles.logo}
            />
            <div className={styles.socialLinks}>
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className={styles.socialLink}
                >
                  <FontAwesomeIcon icon={social.icon} className={styles.socialIcon} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.infoColumn}>
            <p className={styles.textGreen}>Contáctenos:</p>
            <p className={styles.textItalic}>Sede Administrativa</p>
            <p className={styles.textItalic}>Horario de Atención Presencial:</p>
            <p className={styles.textItalic}>Lunes a Viernes de 8:00 a.m. – 12:00 m.</p>
            <p className={styles.textItalic}>y 2:00 p.m. – 6:00 p.m.</p>
            <p className={styles.textItalic}>Balneario Hurtado, Vía a Patillal</p>
            <p className={styles.textItalic}>Valledupar – Cesar, Colombia</p>
          </div>

          <div className={styles.phoneColumn}>
            <p className={styles.text}>Teléfono conmutador PBX: <span className={styles.highlight}>(+57 605 588 6592)</span></p>
            <p className={styles.text}>Línea de servicio a la ciudadanía: <span className={styles.highlight}>(+57 605 588 6592)</span></p>
            <p className={styles.text}>Línea Anticorrupción: <span className={styles.highlight}>(+57 605 588 6592) Ext: 1010</span></p>
            <p className={styles.text}>Correo Anticorrupción:</p>
            <p className={styles.textBold}>controlinternodisciplinario@unicesar.edu.co</p>
            <p className={styles.textBold}>Instructivo Anticorrupción</p>
            <p className={styles.textBold}>Canales físicos y electrónicos para atención al público</p>
          </div>
        </div>
      </div>

      <div className={styles.separator}>
        <div className={styles.separatorLine}></div>
      </div>

      <div className={styles.legalSection}>
        <p className={styles.legalTextGreen}>Condiciones de Uso y Políticas</p>
        <p className={styles.legalTextGreen}>Acerca de este sitio web</p>
        <p className={styles.legalText}>{UNIVERSITY_INFO.name}</p>
        <p className={styles.legalText}>© Todos los derechos reservados © {new Date().getFullYear()} {UNIVERSITY_INFO.name}</p>
      </div>
    </footer>
  );
};

export default Footer;
