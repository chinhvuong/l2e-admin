import { basicStatistic } from '@/services/statstic.service'
import React, { useEffect, useState } from 'react'
const getChange = (current: number, refer: number) => {
    if (current === refer) {
        return {
            value: 0,
            class: 'text-[#ffd900]'
        }
    }
    if (refer === 0) {
        return {
            value: `+100`,
            class: 'text-green-500'
        }
    }

    return {
        value: Number(100 * (current - refer) / refer).toFixed(2),
        class: current > refer ? 'text-green-500' : 'text-red-500'
    }
}
const StatisticBox = () => {
    const [data, setData] = useState({
        currentRevenue: 0,
        preRevenue: 0,
        currentCourse: 0,
        preCourse: 0,
        currentUser: 0,
        preUser: 0,
        currentCertificate: 0,
        preCertificate: 0
    })
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        (async () => {
            if (isLoading) {
                return
            }
            try {
                setIsLoading(true)
                const rs = await basicStatistic()
                console.log("🚀 ~ file: statistic-box.tsx:42 ~ rs:", rs)
                if (rs) {
                    setData({
                        ...data,
                        ...rs
                    })

                }

                setIsLoading(false)
            } catch (error) {

            }
        })()
    }, [])


    return (
        <div className='grid mb-6 grid-cols-4 pt-12 gap-4'>
            <div className='p-4 rounded-lg shadow-md bg-white'>
                <div className='flex items-center justify-between'>
                    <div className='opacity-50 text-xs'>Today</div>
                    <div className={`text-right ${getChange(data.currentRevenue, data.preRevenue).class}`}>{getChange(data.currentRevenue, data.preRevenue).value}%</div>
                </div>

                <div className='leading-[40px] opacity-70 text-3xl font-semibold text-center'>{data.currentRevenue} <span className='text-xs'>usdt</span></div>
                <div className='text-center opacity-60 text-sm'>Revenue</div>
            </div>
            <div className='p-4 rounded-lg shadow-md bg-white'>
                <div className='flex items-center justify-between'>
                    <div className='opacity-50 text-xs'>Today</div>
                    <div className={`text-right ${getChange(data.currentCourse, data.preCourse).class}`}>{getChange(data.currentCourse, data.preCourse).value}%</div>
                </div>

                <div className='leading-[40px] opacity-70 text-3xl font-semibold text-center'>{data.currentCourse}</div>
                <div className='text-center opacity-60 text-sm '>New Courses</div>
            </div>
            <div className='p-4 rounded-lg shadow-md bg-white'>
                <div className='flex items-center justify-between'>
                    <div className='opacity-50 text-xs'>Today</div>
                    <div className={`text-right ${getChange(data.currentUser, data.preUser).class}`}>{getChange(data.currentUser, data.preUser).value}%</div>
                </div>

                <div className='leading-[40px] opacity-70 text-3xl font-semibold text-center'>{data.currentUser}</div>
                <div className='text-center opacity-60 text-sm'>New Users</div>
            </div>
            <div className='p-4 rounded-lg shadow-md bg-white'>
                <div className='flex items-center justify-between'>
                    <div className='opacity-50 text-xs'>Today</div>
                    <div className={`text-right ${getChange(data.currentCertificate, data.preCertificate).class}`}>{getChange(data.currentCertificate, data.preCertificate).value}%</div>
                </div>

                <div className='leading-[40px] opacity-70 text-3xl font-semibold text-center'>{data.currentCertificate}</div>
                <div className='text-center opacity-60 text-sm'>New Certificates</div>
            </div>
        </div>
    )
}

export default StatisticBox