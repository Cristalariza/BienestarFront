import { useState, useEffect } from "react";

export const useAdminDashboard = () => {
  // Datos de ejemplo - Conectar con API
  const [dashboardData, setDashboardData] = useState({
    programasPorNivel: [],
    programasPorFacultad: [],
    programasPorModalidad: [],
    promedioCreditos: [],
    duracionPorAnualidadFacultad: [],
    duracionPorProgramaModalidad: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const loadData = async () => {
      setLoading(true);

      // Datos de ejemplo basados en la imagen
      const data = {
        // Recuento de Programa por Nivel
        programasPorNivel: [
          { nivel: "Pregrado", cantidad: 22, porcentaje: 44 },
          { nivel: "Especialización", cantidad: 7, porcentaje: 14 },
          { nivel: "Maestría", cantidad: 19, porcentaje: 38 },
          { nivel: "Doctorado", cantidad: 2, porcentaje: 4 },
        ],

        // Recuento de Programa por Facultad y Nivel
        programasPorFacultad: [
          {
            facultad: "FACE",
            niveles: {
              Doctorado: 0,
              Especialización: 0,
              Maestría: 1,
              Pregrado: 1,
            },
            total: 2,
          },
          {
            facultad: "Educación",
            niveles: {
              Doctorado: 0,
              Especialización: 2,
              Maestría: 3,
              Pregrado: 4,
            },
            total: 9,
          },
          {
            facultad: "Ciencias De La Salud",
            niveles: {
              Doctorado: 0,
              Especialización: 1,
              Maestría: 4,
              Pregrado: 3,
            },
            total: 8,
          },
          {
            facultad: "Derecho, Ciencias Políticas y Sociales",
            niveles: {
              Doctorado: 0,
              Especialización: 5,
              Maestría: 0,
              Pregrado: 3,
            },
            total: 8,
          },
          {
            facultad: "Ingenierías y Tecnológicas",
            niveles: {
              Doctorado: 0,
              Especialización: 3,
              Maestría: 1,
              Pregrado: 4,
            },
            total: 8,
          },
          {
            facultad: "Bellas Artes",
            niveles: {
              Doctorado: 0,
              Especialización: 1,
              Maestría: 0,
              Pregrado: 2,
            },
            total: 3,
          },
          {
            facultad: "Ciencias Básicas",
            niveles: {
              Doctorado: 1,
              Especialización: 0,
              Maestría: 2,
              Pregrado: 0,
            },
            total: 3,
          },
          {
            facultad: "Ciencias Básicas",
            niveles: {
              Doctorado: 0,
              Especialización: 0,
              Maestría: 0,
              Pregrado: 5,
            },
            total: 5,
          },
        ],

        // Recuento de Programa por Modalidad
        programasPorModalidad: [
          { modalidad: "Presencial", cantidad: 48, porcentaje: 96 },
          { modalidad: "A Distancia", cantidad: 2, porcentaje: 4 },
        ],

        // Promedio de Créditos por Nivel
        promedioCreditos: [
          { nivel: "Pregrado", promedio: 160 },
          { nivel: "Doctorado", promedio: 90 },
          { nivel: "Maestría", promedio: 48 },
          { nivel: "Especialización", promedio: 24 },
        ],

        // Suma de Duración número por Anualidad y Facultad
        duracionPorAnualidadFacultad: [
          {
            anualidad: "semestres",
            facultades: {
              "Bellas Artes": 7.48,
              "Ciencias Básicas": 5.44,
              "Ciencias Básicas": 3.4,
              "Ciencias De La Salud": 15.31,
              "Derecho, Ciencias Políticas Y Sociales": 13.61,
              Educación: 17.69,
              Face: 20.41,
              "Ingenierías Y Tecnológicas": 16.67,
            },
          },
          {
            anualidad: "trimestres",
            facultades: {
              Educación: 100,
            },
          },
        ],

        // Suma de Duración número por Programa y Modalidad
        duracionPorProgramaModalidad: [
          {
            programa: "ADMINISTRACION DE EMPRESAS",
            presencial: 10,
            aDistancia: 0,
          },
          { programa: "COMERCIO INTERNACIONAL", presencial: 10, aDistancia: 0 },
          { programa: "CONTADURIA PUBLICA", presencial: 10, aDistancia: 0 },
          { programa: "DERECHO", presencial: 10, aDistancia: 0 },
          { programa: "ECONOMIA", presencial: 10, aDistancia: 0 },
          { programa: "FISIOTERAPIA", presencial: 10, aDistancia: 0 },
          {
            programa: "INGENIERIA AGROINDUSTRIAL",
            presencial: 10,
            aDistancia: 0,
          },
          {
            programa: "INGENIERIA AMBIENTAL Y SANITARIA",
            presencial: 10,
            aDistancia: 0,
          },
          { programa: "INGENIERIA ELECTRONICA", presencial: 10, aDistancia: 0 },
          { programa: "LICENCIATURA EN ARTES", presencial: 10, aDistancia: 0 },
          {
            programa: "LICENCIATURA EN CIENCIAS NATURALES Y EDUCACION...",
            presencial: 10,
            aDistancia: 0,
          },
          {
            programa: "LICENCIATURA EN ESPAÑOL E INGLES",
            presencial: 10,
            aDistancia: 0,
          },
          {
            programa: "LICENCIATURA EN LITERATURA Y LENGUA CASTELLANA",
            presencial: 10,
            aDistancia: 0,
          },
          {
            programa: "LICENCIATURA EN MATEMATICAS",
            presencial: 10,
            aDistancia: 0,
          },
        ],
      };

      setDashboardData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  // Calcular totales
  const getTotalProgramas = () => {
    return dashboardData.programasPorNivel.reduce(
      (sum, item) => sum + item.cantidad,
      0
    );
  };

  // Preparar datos para gráfica de torta - Nivel
  const getPieDataNivel = () => {
    return {
      labels: dashboardData.programasPorNivel.map((item) => item.nivel),
      datasets: [
        {
          data: dashboardData.programasPorNivel.map((item) => item.cantidad),
          backgroundColor: [
            "#DC3545", // Pregrado - Rojo
            "#FFC107", // Especialización - Amarillo
            "#6F42C1", // Maestría - Morado
            "#28A745", // Doctorado - Verde
          ],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    };
  };

  // Preparar datos para gráfica de barras horizontales - Facultad y Nivel (100% apilado)
  const getHorizontalBarDataFacultad = () => {
    const facultades = dashboardData.programasPorFacultad.map(
      (item) => item.facultad
    );

    // Convertir a porcentajes
    const calcularPorcentajes = (item) => {
      const total = item.total;
      return {
        Doctorado:
          total > 0 ? ((item.niveles.Doctorado || 0) / total) * 100 : 0,
        Especialización:
          total > 0 ? ((item.niveles.Especialización || 0) / total) * 100 : 0,
        Maestría: total > 0 ? ((item.niveles.Maestría || 0) / total) * 100 : 0,
        Pregrado: total > 0 ? ((item.niveles.Pregrado || 0) / total) * 100 : 0,
      };
    };

    return {
      labels: facultades,
      datasets: [
        {
          label: "Doctorado",
          data: dashboardData.programasPorFacultad.map(
            (item) => calcularPorcentajes(item).Doctorado
          ),
          backgroundColor: "#28A745",
        },
        {
          label: "Especialización",
          data: dashboardData.programasPorFacultad.map(
            (item) => calcularPorcentajes(item).Especialización
          ),
          backgroundColor: "#FFC107",
        },
        {
          label: "Maestría",
          data: dashboardData.programasPorFacultad.map(
            (item) => calcularPorcentajes(item).Maestría
          ),
          backgroundColor: "#6F42C1",
        },
        {
          label: "Pregrado",
          data: dashboardData.programasPorFacultad.map(
            (item) => calcularPorcentajes(item).Pregrado
          ),
          backgroundColor: "#DC3545",
        },
      ],
    };
  };

  // Preparar datos para gráfica de torta - Modalidad
  const getPieDataModalidad = () => {
    return {
      labels: dashboardData.programasPorModalidad.map((item) => item.modalidad),
      datasets: [
        {
          data: dashboardData.programasPorModalidad.map(
            (item) => item.cantidad
          ),
          backgroundColor: [
            "#28A745", // Presencial - Verde
            "#DC3545", // A Distancia - Rojo
          ],
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    };
  };

  // Preparar datos para gráfica de barras - Promedio de Créditos
  const getBarDataCreditos = () => {
    return {
      labels: dashboardData.promedioCreditos.map((item) => item.nivel),
      datasets: [
        {
          label: "Promedio de Créditos",
          data: dashboardData.promedioCreditos.map((item) => item.promedio),
          backgroundColor: [
            "#DC3545", // Pregrado
            "#28A745", // Doctorado
            "#FFC107", // Maestría
            "#6F42C1", // Especialización
          ],
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      ],
    };
  };

  // Preparar datos para gráfica de barras apiladas - Duración por Anualidad y Facultad
  const getStackedBarDataDuracionAnualidad = () => {
    const coloresFacultades = {
      "Bellas Artes": "#FFC107",
      "Ciencias Básicas": "#DC3545",
      "Ciencias De La Salud": "#007BFF",
      "Derecho, Ciencias Políticas Y Sociales": "#E91E63",
      Educación: "#28A745",
      Face: "#FF9800",
      "Ingenierías Y Tecnológicas": "#212529",
    };

    // Calcular porcentajes normalizados al 100%
    const calcularPorcentajesNormalizados = (facultadesObj) => {
      const total = Object.values(facultadesObj).reduce(
        (sum, val) => sum + val,
        0
      );
      const porcentajes = {};

      Object.keys(facultadesObj).forEach((key) => {
        porcentajes[key] = total > 0 ? (facultadesObj[key] / total) * 100 : 0;
      });

      return porcentajes;
    };

    const datasets = Object.keys(coloresFacultades).map((facultad) => ({
      label: facultad,
      data: dashboardData.duracionPorAnualidadFacultad.map((item) => {
        const porcentajesNormalizados = calcularPorcentajesNormalizados(
          item.facultades
        );
        return porcentajesNormalizados[facultad] || 0;
      }),
      backgroundColor: coloresFacultades[facultad],
    }));

    return {
      labels: dashboardData.duracionPorAnualidadFacultad.map(
        (item) => item.anualidad
      ),
      datasets: datasets,
    };
  };

  // Preparar datos para gráfica de barras horizontales - Duración por Programa y Modalidad
  const getHorizontalBarDataDuracionPrograma = () => {
    return {
      labels: dashboardData.duracionPorProgramaModalidad.map(
        (item) => item.programa
      ),
      datasets: [
        {
          label: "A Distancia",
          data: dashboardData.duracionPorProgramaModalidad.map(
            (item) => item.aDistancia
          ),
          backgroundColor: "#DC3545",
        },
        {
          label: "Presencial",
          data: dashboardData.duracionPorProgramaModalidad.map(
            (item) => item.presencial
          ),
          backgroundColor: "#28A745",
        },
      ],
    };
  };

  return {
    loading,
    dashboardData,
    getTotalProgramas,
    getPieDataNivel,
    getHorizontalBarDataFacultad,
    getPieDataModalidad,
    getBarDataCreditos,
    getStackedBarDataDuracionAnualidad,
    getHorizontalBarDataDuracionPrograma,
  };
};
