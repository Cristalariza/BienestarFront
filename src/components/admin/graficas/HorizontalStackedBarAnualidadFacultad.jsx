import { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const HorizontalStackedBarAnualidadFacultad = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Destruir instancia anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Suma de Duración por Anualidad y Facultad",
            font: { size: 13, weight: "bold" },
            padding: { top: 8, bottom: 8 },
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              padding: 8,
              font: { size: 10 },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.x.toFixed(
                  2
                )}%`;
              },
            },
          },
          datalabels: {
            color: "#fff",
            font: {
              weight: "bold",
              size: 11,
            },
            formatter: function (value) {
              return value > 5 ? `${value.toFixed(1)}%` : "";
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            max: 100,
            ticks: {
              font: { size: 9 },
              callback: function (value) {
                return value + "%";
              },
            },
          },
          y: {
            stacked: true,
            ticks: {
              font: { size: 11 },
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default HorizontalStackedBarAnualidadFacultad;
