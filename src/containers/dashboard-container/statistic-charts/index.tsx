import { basicStatistic, statisticChartData } from '@/services/statstic.service';
import React, { useEffect, useState } from 'react'
import NewUserChart from './new-user-chart';
import RevenueChart from './revenue-chart';
const dateToLabel = (date: string) => {
  const d = new Date(date)
  return `${d.getHours()}h`
}
const StatisticCharts = () => {
  const [data, setData] = useState([
    {
      userCount: 0,
      courseCount: 0,
      certificateCount: 0,
      revenue: 0,
      time: new Date().toISOString()
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const labels = data.map(dt => dateToLabel(dt.time))
  useEffect(() => {
    (async () => {
      if (isLoading) {
        return
      }
      try {
        setIsLoading(true)
        const rs = await statisticChartData()
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

  return (
    <div className='grid grid-cols-1 gap-6'>
      <RevenueChart labels={labels} data={data.map(dt => dt.revenue)} />
      <NewUserChart labels={labels} data={data.map(dt => dt.userCount)} />
    </div>
  )
}

export default StatisticCharts