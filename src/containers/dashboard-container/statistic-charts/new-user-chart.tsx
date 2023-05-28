import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import React from 'react'
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'User',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            // ticks: {
            //     stepSize: 1,
            //     // precision: 0
            // }
        },

    }
};

const NewUserChart = ({ labels, data }: { labels: string[], data: number[] }) => {
    const dt = {
        labels,
        datasets: [
            {
                label: 'User',
                data: data,
                borderColor: 'rgba(99, 255, 107, 0.5)',
                backgroundColor: 'rgb(39, 105, 96)',
            },
        ],
    };
    return (

        <div className="p-4 rounded-lg shadow-md bg-white">
            <div className="text-lg mb-6">New user 24h</div>
            <Line options={options} data={dt} />
        </div>

    )
}

export default NewUserChart