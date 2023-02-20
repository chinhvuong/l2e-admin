

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
