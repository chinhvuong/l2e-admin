

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants'
import { BACKEND_URL } from '@/constants/urls'
import sendRequest, { wrap } from './index'

export const login = async (data: any) => {
    const rs = await wrap(() => sendRequest(
        {
            url: BACKEND_URL + '/auth/login',
            method: 'POST',
            data,
        },
        true,
    ))
    if (rs?.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, rs?.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, rs?.refreshToken)
    }

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
