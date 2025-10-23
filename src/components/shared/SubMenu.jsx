import styles from '../../styles/submenu.module.css';

const SubMenu = ({ show = true }) => {
  const menuItems = [
    { label: 'Inicio', url: '/', active: true },
    { label: 'Deportes', url: '/deportes' },
    { label: 'Cultura', url: '/cultura' },
    { label: 'Ayuda Social', url: '/ayuda-social' },
    { label: 'Informativo', url: '/informativo' },
    { label: 'PQRs', url: '/pqrs' },
    { label: 'Educación Inclusiva', url: '/educacion-inclusiva' }
  ];

  if (!show) return null;

  return (
    <nav className={styles.subMenu}>
      <div className={styles.container}>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.url}
            className={`${styles.menuItem} ${item.active ? styles.active : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SubMenu;
