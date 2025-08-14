"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./VulnerabilitiesPieChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  labels: string[];
  data: number[];
};

const COLORS = ["#dc3545", "#ffc107", "#28a745"]; // красный, желтый, зеленый

const VulnerabilitiesPieChart: React.FC<Props> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: COLORS,
        borderWidth: 1,
        borderColor: "#fff",
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Распределение по критичности</h2>
      <div className={styles.card}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default VulnerabilitiesPieChart;
