import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { statisticUser } from '@/services/statstic.service';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Course',
        },
    },

};

const UserPieChart = () => {
    const [data, setData] = useState({
        total: 0,
        courseZero: 0,
        courseCreator: 0
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if (isLoading) {
                return
            }
            try {
                setIsLoading(true)
                const rs = await statisticUser()
                console.log("🚀 ~ file: index.tsx:29 ~ rs:", rs)
                if (rs) {
                    setData(rs)
                }

                setIsLoading(false)
            } catch (error) {
                console.log("🚀 ~ file: index.tsx:36 ~ error:", error)

            }
        })()
    }, [])

    const dt = {
        labels: ['Course author', 'Native Learner'],
        datasets: [
            {
                label: '',
                data: [data.courseZero, data.courseCreator],
                backgroundColor: [
                    'rgba(88, 112, 163)',
                    'rgba(31, 100, 4)',

                ],
                borderColor: [
                    '#ff8f63',
                    '#c4eb36',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (

        <div className="p-4 rounded-lg shadow-md bg-white">
            <div className="text-lg mb-6">Users ({data.total})</div>
            <Pie options={options} data={dt} />
        </div>

    )
}

export default UserPieChart