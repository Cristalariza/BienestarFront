import { Button } from 'primereact/button';
import { BIENESTAR_CATEGORIES } from '../../constants';
import styles from '../../styles/home.module.css';

const CategoriesSection = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.categoriesHeader}>
        <h2 className={styles.categoriesTitle}>Nuestras Categorías</h2>
        <p className={styles.categoriesSubtitle}>
          Encuentra rápido el programa o servicio de Bienestar que necesitas.
        </p>
      </div>

      <div className={styles.categoriesGrid}>
        {BIENESTAR_CATEGORIES.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <span className={styles.categoryBadge}>Bienestar</span>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <p className={styles.categoryDescription}>{category.description}</p>
            <Button
              label="Conoce más"
              icon="pi pi-arrow-right"
              iconPos="right"
              className={styles.categoryButton}
              onClick={() => window.location.href = category.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
