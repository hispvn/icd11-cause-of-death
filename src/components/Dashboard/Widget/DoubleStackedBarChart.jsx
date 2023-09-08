import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  plugins: {
    legend: {
      position: 'bottom'
    }
  },
  // responsive: false,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        beginAtZero: true,
        callback: (v) => { return v < 0 ? -v: v }
      }
    },
    y: {
      stacked: true,
      grid: {
        display: false,
      },
      ticks: {
        beginAtZero: true,
      },
      position: "left",
    },
  },
};

const DoubleStackedBarChart = ({ data }) => {
  return <Bar options={options} data={data.data} />;
}

export default DoubleStackedBarChart;
