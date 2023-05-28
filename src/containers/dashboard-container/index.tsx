import React from 'react'
import CoursePieChart from './course-statistic'
import StatisticBox from './statistic-box'
import StatisticCharts from './statistic-charts'
import UserPieChart from './user-statistic'

const DashBoardContainer = () => {
    return (
        <div className='pb-12'>
            <StatisticBox />

            <div className="flex gap-6  mt-12">
                <div className='w-[70%]'>
                    <StatisticCharts />
                </div>
                <div className="w-[30%] grid grid-cols-1 gap-6">
                    <CoursePieChart />
                    <UserPieChart />
                </div>


            </div>
        </div>
    )
}

export default DashBoardContainer