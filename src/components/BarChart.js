import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/BarChart.css";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ products }) => {
  const data = {
    labels: products.map((product) => product.date), // Use date as labels
    datasets: [
      {
        label: "Total Wholesale Price (₹)",
        data: products.map((product) => product.totalWholesalePrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Sales Price (₹)",
        data: products.map((product) => product.totalSalesPrice),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Total Profit (₹)",
        data: products.map((product) => product.totalProfit),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bar-chart-container">
      <h3>Product Sales Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;