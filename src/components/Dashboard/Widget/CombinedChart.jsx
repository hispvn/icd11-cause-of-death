import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const CombinedChart = ({ data }) => {
  const options = {
    // responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        stacked: true,
        display: true,
        position: 'left',
        grid: {
          display: false,
        }
      },
      y1: {
        display: true,
        position: 'right',
        grid: {
          display: false,
        },
      },
      x: {
        stacked: true,
        grid: {
          display: false,
        }
      }
    }
  }
  return <Chart type='bar' data={data.data} options={options} />;
}

export default CombinedChart;
