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
            text: 'Revenue',
        },
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
    // indexAxis: 'y' as const
};



const RevenueChart = ({ labels, data }: { labels: string[], data: number[] }) => {
    const dt = {
        labels,
        datasets: [
            {
                min: 0,
                label: 'Revenue',
                data: data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
        options: {
            scales: {
                y: {
                    suggestedMin: 0
                }
            }
        }

    };
    return (

        <div className="p-4 rounded-lg shadow-md bg-white">
            <div className="text-lg mb-6">Revenue 24h</div>
            <Line options={options} data={dt} />
        </div>

    )
}

export default RevenueChart