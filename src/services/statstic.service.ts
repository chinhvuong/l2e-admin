

// import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants'
import { BACKEND_URL } from '@/constants/urls'
import sendRequest, { wrap } from './index'



export const basicStatistic = async () => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/statistic',
            method: 'GET',

        },
    ))

    return rs


}


export const statisticChartData = async () => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/statistic/data/',
            method: 'GET',
        },
    ))
    return rs
}


export const statisticCourse = async () => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/statistic/course/',
            method: 'GET',
        },
    ))
    return rs
}

export const statisticUser = async () => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/statistic/user/',
            method: 'GET',
        },
    ))
    return rs
}
