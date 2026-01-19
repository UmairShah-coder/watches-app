import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardChartsProps {
  totalUsers: number;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ totalUsers }) => {
  // Example data (can be dynamic)
  const data = {
    labels: ["Users", "Admins", "Products"],
    datasets: [
      {
        label: "Counts",
        data: [totalUsers, 1, 12], // Admin 1, Products 12 as example
        backgroundColor: ["#14b8a6", "#7c3aed", "#22c55e"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Dashboard Overview",
      },
    },
  };

  return (
    <div className="mt-8 bg-gray-900 p-6 rounded-xl shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardCharts;
