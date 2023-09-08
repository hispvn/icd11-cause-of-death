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

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart'
        }
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const dataSet = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [213,323,654,124,311,111],
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
    ]
}

const ChartExamples = ({ data }) => {
    return <Bar options={options} data={dataSet} />
}

export default ChartExamples;