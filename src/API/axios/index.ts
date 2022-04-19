import toast from 'react-hot-toast'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Router from 'next/router'
import { httpRequestList } from './clear'
import { ToastError } from '../../components/toast/hot-toast'
import { ROUTER_MAPPING } from '../../../routes'
import { removeToken, getToken } from '../../config/utils'
const { CancelToken } = axios
const cancelToken = new CancelToken((c) => {
	httpRequestList.push(c)
})
// NEXT_PUBLIC_BASEURL_TEST='https://stoplight.io/mocks/jaketesting/jaketesting/53455238'
const { NEXT_PUBLIC_BASEURL_TEST } = process.env

export type ValidationErr = {
	value: string
	msg: string
	param: string
	location: string
	code: string
}
export interface ValidationErrorType {
	err: ValidationErr[]
}

export type SystemErr = {
	msg: string
	code: string
}
export interface SystemErrorType {
	err: SystemErr[]
}

type ErrorMsg = { msg: string }

const clearPrevToast = () => {
	toast.dismiss()
	toast.remove()
}
const LogoutLocalUser = () => {
	removeToken()
}

const sleep = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, ms)
	})

const history = Router
export const service = axios.create({
	baseURL: NEXT_PUBLIC_BASEURL_TEST,
	timeout: 10000,
	cancelToken,
	// cache-control: no-cache // max-age=0//  others not work
})

service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (getToken()) {
			config.headers['Authorization'] = 'Bearer ' + getToken()
		}
		return config
	},
	(error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
	(response: AxiosResponse) => response.data,
	async (error: AxiosError) => {
		const errData: ValidationErrorType | SystemErrorType = error.response?.data
		console.log(errData)
		const code = error.response?.status
		let msg = ''
		if (errData?.err && Array.isArray(errData?.err)) {
			msg = errData.err[0]?.msg
		}
		clearPrevToast()

		//  cleaning
		if (!errData) {
			ToastError('Server error. Please try again later.')
			await sleep(400)
			history.push(ROUTER_MAPPING.BUSY)
			return
		}
		if (code === 401) {
			await sleep(1000)
			ToastError(`${msg}, Jumping to login page.`)
			LogoutLocalUser()
			history.push(ROUTER_MAPPING.LOGIN)
			return
		}
		if (code === 404 || code === 500) {
			ToastError('Server error. Please try again later.')
			return errData
		}
		return errData
	}
)
