import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartWidget = ({ data }) => {
  const options = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    maintainAspectRatio: false,
    responsive: true
  }

  return <Pie data={data.data} options={options} />;
}

export default PieChartWidget;