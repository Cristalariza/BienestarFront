import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import PropTypes from "prop-types";

const HorizontalBarChartFacultad = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: data,
        plugins: [ChartDataLabels],
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value) {
                  return value + "%";
                },
                font: {
                  size: 10,
                },
              },
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            y: {
              stacked: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 10,
                },
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                padding: 12,
                font: {
                  size: 11,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || "";
                  const percentage = context.parsed.x.toFixed(2);
                  return `${label}: ${percentage}%`;
                },
              },
            },
            datalabels: {
              color: "#fff",
              font: {
                weight: "bold",
                size: 11,
              },
              formatter: function (value, context) {
                // Solo mostrar si el porcentaje es mayor a 5%
                return value > 5 ? value.toFixed(1) + "%" : "";
              },
              anchor: "center",
              align: "center",
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

HorizontalBarChartFacultad.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        backgroundColor: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default HorizontalBarChartFacultad;
