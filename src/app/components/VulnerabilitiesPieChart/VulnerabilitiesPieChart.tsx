"use client";
import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./VulnerabilitiesPieChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

type VulnerabilitiesPieChartProps = {
  labels: string[];
  data: number[];
};

const COLORS = ["#dc3545", "#ffc107", "#28a745"]; // красный, желтый, зеленый

const VulnerabilitiesPieChart: React.FC<VulnerabilitiesPieChartProps> = ({
  labels,
  data,
}) => {
  // console.log(labels);
  // console.log(data);

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

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: any) => {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;
      ctx.restore();
      const fontSize = 2;
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";

      const total = data.reduce((acc, val) => acc + val, 0);
      const text = total.toString();
      const textX = Math.round((width - ctx.measureText(text).width) / 2) - 55;
      const textY = height / 2 - 10;

      ctx.fillText(text, textX, textY);
      ctx.fillText("Всего", textX - 20, textY + 20);
      ctx.save();
    },
  };

  return (
    <div>
      <h2>Распределение по критичности</h2>
      <div className={styles.card}>
        <Doughnut
          data={chartData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </div>
    </div>
  );
};

export default VulnerabilitiesPieChart;
