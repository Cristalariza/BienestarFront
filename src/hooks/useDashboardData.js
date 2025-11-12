import { useState, useEffect } from "react";
import {
  programasDeportivosService,
  programasCulturalesService,
  eventosService,
  noticiasService,
  pqrsService,
  inscripcionesDeportivasService,
  inscripcionesCulturalesService,
} from "../services";

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    deportes: { total: 0, inscritos: 0 },
    cultura: { total: 0, inscritos: 0 },
    eventos: { total: 0, proximos: 0 },
    noticias: { total: 0, recientes: 0 },
    pqrs: { total: 0, pendientes: 0 },
    activityData: { noticias: [], eventos: [] },
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Peticiones en paralelo
        const [
          deportes,
          cultura,
          eventos,
          noticias,
          pqrs,
          inscripcionesDeportivas,
          inscripcionesCulturales,
        ] = await Promise.all([
          programasDeportivosService.obtenerTodos({ only_active: true }),
          programasCulturalesService.obtenerTodos({ only_active: true }),
          eventosService.obtenerTodos({ only_active: true }),
          noticiasService.obtenerTodas({ only_active: true }),
          pqrsService.obtenerTodas({ only_active: true }),
          inscripcionesDeportivasService.obtenerTodas({}),
          inscripcionesCulturalesService.obtenerTodas({}),
        ]);

        // Procesar datos
        const totalDeportes = deportes?.length || 0;
        const totalCultura = cultura?.length || 0;
        const totalEventos = eventos?.length || 0;
        const totalNoticias = noticias?.length || 0;
        const totalPqrs = pqrs?.length || 0;

        // Contar inscripciones aprobadas
        const inscritosDeportes =
          inscripcionesDeportivas?.filter(
            (i) => i.estado_inscripcion === "APROBADA"
          ).length || 0;
        const inscritosCultura =
          inscripcionesCulturales?.filter(
            (i) => i.estado_inscripcion === "APROBADA"
          ).length || 0;

        // Eventos próximos (en el futuro)
        const hoy = new Date();
        const eventosProximos =
          eventos?.filter((e) => new Date(e.fecha) >= hoy).length || 0;

        // Noticias recientes (últimos 30 días)
        const hace30Dias = new Date();
        hace30Dias.setDate(hace30Dias.getDate() - 30);
        const noticiasRecientes =
          noticias?.filter((n) => new Date(n.fecha_creacion) >= hace30Dias)
            .length || 0;

        // PQRS pendientes
        const pqrsPendientes =
          pqrs?.filter(
            (p) => p.estado === "PENDIENTE" || p.estado === "EN_PROCESO"
          ).length || 0;

        // Preparar datos de actividad por mes (últimos 6 meses)
        const activityData = prepareActivityData(noticias, eventos);

        setDashboardData({
          deportes: { total: totalDeportes, inscritos: inscritosDeportes },
          cultura: { total: totalCultura, inscritos: inscritosCultura },
          eventos: { total: totalEventos, proximos: eventosProximos },
          noticias: { total: totalNoticias, recientes: noticiasRecientes },
          pqrs: { total: totalPqrs, pendientes: pqrsPendientes },
          activityData,
        });
      } catch (err) {
        console.error("Error al cargar datos del dashboard:", err);
        setError(err.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { loading, dashboardData, error };
};

/**
 * Prepara los datos de actividad para las gráficas
 * Agrupa noticias y eventos por mes en los últimos 6 meses
 */
const prepareActivityData = (noticias = [], eventos = []) => {
  const meses = [];
  const hoy = new Date();

  // Generar últimos 6 meses
  for (let i = 5; i >= 0; i--) {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    meses.push({
      mes: fecha.toLocaleDateString("es-ES", {
        month: "short",
        year: "numeric",
      }),
      mesNum: fecha.getMonth(),
      anio: fecha.getFullYear(),
    });
  }

  // Contar noticias por mes
  const noticiasPorMes = meses.map((m) => {
    return noticias.filter((noticia) => {
      const fechaNoticia = new Date(
        noticia.fecha_creacion || noticia.created_at
      );
      return (
        fechaNoticia.getMonth() === m.mesNum &&
        fechaNoticia.getFullYear() === m.anio
      );
    }).length;
  });

  // Contar eventos por mes
  const eventosPorMes = meses.map((m) => {
    return eventos.filter((evento) => {
      const fechaEvento = new Date(evento.fecha);
      return (
        fechaEvento.getMonth() === m.mesNum &&
        fechaEvento.getFullYear() === m.anio
      );
    }).length;
  });

  return {
    labels: meses.map((m) => m.mes),
    datasets: [
      {
        label: "Noticias",
        data: noticiasPorMes,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Eventos",
        data: eventosPorMes,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
};
