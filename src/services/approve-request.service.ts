

import { ACCESS_TOKEN_KEY, ApproveRequestStatus, REFRESH_TOKEN_KEY } from '@/constants'
import { BACKEND_URL } from '@/constants/urls'
import sendRequest, { wrap } from './index'

export const getApproveRequests = async (data: {
    page: number,
    limit: number,
    status: ApproveRequestStatus

}) => {

    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + `/admin-course/approve-requests`,
            method: 'GET',
            params: data,
        },
        true,
    ))
    if (rs?.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, rs?.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, rs?.refreshToken)
    }

    return rs
}

export const approveCourse = async (data: { id: string }) => {

    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + `/admin-course/toggle-approve-course`,
            method: 'PUT',
            data
        },
        true,
    ))
    return rs
}

export const updateApproveRequest = async (requestId: string, data: { status: string, notes: string[] }) => {

    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + `/admin-course/approve-requests/resolve/${requestId}`,
            method: 'PUT',
            data
        },
        true,
    ))
    return rs
}
export const me = async () => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/user/me',
            method: 'GET',
        },
    ))

    return rs


}
