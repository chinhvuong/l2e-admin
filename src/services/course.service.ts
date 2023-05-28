

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants'
import { BACKEND_URL } from '@/constants/urls'
import sendRequest, { wrap } from './index'



export const courses = async (data: any) => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/admin-course',
            method: 'GET',
            params: data,
        },
    ))

    return rs


}


export const courseDetail = async (id: string) => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/admin-course/' + id,
            method: 'GET',
            // params: data,
        },
    ))

    return rs


}



export const courseStudents = async (id: number) => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/admin-course/' + id + '/enroll-users',
            method: 'GET',
            // params: data,
        },
    ))

    return rs


}

export const courseQuestions = async (id: number) => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/admin-course/' + id + '/questions',
            method: 'GET',
            // params: data,
        },
    ))

    return rs


}


export const courseQuizzes = async (id: number) => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/admin-course/' + id + '/quizzes',
            method: 'GET',
            // params: data,
        },
    ))

    return rs


}
