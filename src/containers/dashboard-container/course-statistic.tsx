import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { statisticCourse } from '@/services/statstic.service';

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

const CoursePieChart = () => {
    const [data, setData] = useState({
        total: 0,
        minted: 0,
        unMint: 0
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if (isLoading) {
                return
            }
            try {
                setIsLoading(true)
                const rs = await statisticCourse()
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
        labels: ['Minted', 'Draft'],
        datasets: [
            {
                label: '',
                data: [data.minted, data.unMint],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (

        <div className="p-4 rounded-lg shadow-md bg-white">
            <div className="text-lg mb-6">Courses ({data.total})</div>
            <Pie options={options} data={dt} />
        </div>

    )
}

export default CoursePieChart