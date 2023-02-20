import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ACCESS_TOKEN_KEY } from '@/constants'

async function sendRequest(
    payload: AxiosRequestConfig,
    doesReturnHeader: boolean = false,
): Promise<AxiosResponse<any, any> | any> {
    try {
        payload.headers = payload.headers
            ? payload.headers
            : { Authorization: 'Bearer ' + accessToken() }

        if (doesReturnHeader) {
            const rest = await axiosInstance.request(payload)
            return rest
        }

        const response = await axiosInstance.request(payload)

        return Promise.resolve(response)
    } catch (error: any) {
        return Promise.reject(error)
    }
}

export const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("🚀 ~ file: index.ts:30 ~ response", response.data)
        return response.data
    },
    async (err: AxiosError) => {
        const { response } = err
        try {
            return response
        } catch (error) {
            return response
        }
    },
)

export function accessToken() {
    if (typeof localStorage === 'undefined') return undefined
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    return token === null ? undefined : token
}

export function setAccessToken(value?: string) {
    if (value) {
        localStorage.setItem(ACCESS_TOKEN_KEY, value)
    } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
    }

    return value
}

export default sendRequest

export const wrap = async (fn: () => Promise<any>) => {
    try {
        return await fn()
    } catch (error) {
        console.log("🚀 ~ file: index.ts:64 ~ wrap ~ error", error)

        throw error
    }
}