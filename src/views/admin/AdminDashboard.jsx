import React from "react";
import { useDashboardData } from "../../hooks/useDashboardData";
import StatCard from "../../components/admin/Dashboard/StatCard";
import ActivityChart from "../../components/admin/Dashboard/ActivityChart";
import styles from "../../components/admin/Dashboard/Dashboard.module.css";

const AdminDashboard = () => {
  const { loading, dashboardData, error } = useDashboardData();

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loading}>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
          <p>Cargando datos del dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.error}>
          <h3 className={styles.error__title}>Error al cargar el dashboard</h3>
          <p className={styles.error__message}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Programas Deportivos"
          value={dashboardData.deportes.total}
          icon="pi-trophy"
          color="primary"
          subtitle={`${dashboardData.deportes.inscritos} estudiantes inscritos`}
        />
        <StatCard
          title="Programas Culturales"
          value={dashboardData.cultura.total}
          icon="pi-palette"
          color="success"
          subtitle={`${dashboardData.cultura.inscritos} estudiantes inscritos`}
        />
        <StatCard
          title="Eventos Activos"
          value={dashboardData.eventos.total}
          icon="pi-calendar"
          color="warning"
          subtitle={`${dashboardData.eventos.proximos} próximos eventos`}
        />
        <StatCard
          title="Noticias Publicadas"
          value={dashboardData.noticias.total}
          icon="pi-megaphone"
          color="info"
          subtitle={`${dashboardData.noticias.recientes} en los últimos 30 días`}
        />
        <StatCard
          title="PQRS Recibidas"
          value={dashboardData.pqrs.total}
          icon="pi-inbox"
          color="danger"
          subtitle={`${dashboardData.pqrs.pendientes} pendientes de atención`}
        />
      </div>

      {/* Activity Charts */}
      <div className={styles.chartsGrid}>
        <ActivityChart
          data={dashboardData.activityData}
          title="Actividad de Noticias y Eventos (Últimos 6 meses)"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
