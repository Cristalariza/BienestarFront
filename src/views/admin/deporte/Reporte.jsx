import { useAdminDashboard } from "../../../hooks/useAdminDashboard";
import PieChartNivel from "../../../components/admin/graficas/PieChartNivel";
import HorizontalBarChartFacultad from "../../../components/admin/graficas/HorizontalBarChartFacultad";
import PieChartModalidad from "../../../components/admin/graficas/PieChartModalidad";
import BarChartCreditos from "../../../components/admin/graficas/BarChartCreditos";
import HorizontalStackedBarAnualidadFacultad from "../../../components/admin/graficas/HorizontalStackedBarAnualidadFacultad";
import HorizontalBarProgramaModalidad from "../../../components/admin/graficas/HorizontalBarProgramaModalidad";
import styles from "../../../styles/adminstyles/adminDashboard.module.css";

export const Reporte = () => {
  const {
    loading,
    getPieDataNivel,
    getHorizontalBarDataFacultad,
    getPieDataModalidad,
    getBarDataCreditos,
    getStackedBarDataDuracionAnualidad,
    getHorizontalBarDataDuracionPrograma,
  } = useAdminDashboard();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
          <p>Cargando datos del dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Gráfica 1: Recuento de Programa por Facultad y Nivel - ARRIBA COMPLETA */}
        <div className={`${styles.card} ${styles.cardWide}`}>
          <h2 className={styles.cardTitle}>
            Recuento de Programa por Facultad y Nivel
          </h2>
          <div className={styles.chartContainerTall}>
            <HorizontalBarChartFacultad data={getHorizontalBarDataFacultad()} />
          </div>
        </div>

        {/* Gráfica 2: Recuento de Programa por Nivel */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Recuento de Programa por Nivel</h2>
          <div className={styles.chartContainer}>
            <PieChartNivel data={getPieDataNivel()} />
          </div>
        </div>

        {/* Gráfica 3: Recuento de Programa por Modalidad */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            Recuento de Programa por Modalidad
          </h2>
          <div className={styles.chartContainer}>
            <PieChartModalidad data={getPieDataModalidad()} />
          </div>
        </div>

        {/* Gráfica 4: Promedio de Créditos por Nivel */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Promedio de Créditos por Nivel</h2>
          <div className={styles.chartContainer}>
            <BarChartCreditos data={getBarDataCreditos()} />
          </div>
        </div>

        {/* Gráfica 5: Suma de Duración por Anualidad y Facultad */}
        <div className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.chartContainerTall}>
            <HorizontalStackedBarAnualidadFacultad
              data={getStackedBarDataDuracionAnualidad()}
            />
          </div>
        </div>

        {/* Gráfica 6: Suma de Duración por Programa y Modalidad */}
        <div className={`${styles.card} ${styles.cardWide}`}>
          <div className={styles.chartContainerExtraTall}>
            <HorizontalBarProgramaModalidad
              data={getHorizontalBarDataDuracionPrograma()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporte;
