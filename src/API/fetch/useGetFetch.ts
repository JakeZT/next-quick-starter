import { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	// postFetch,
	getFetch,
	postFetchToBrokerInterface,
	consoleErrorResponse,
	consoleSuccessResponse,
} from './helpers'
import http from './http'
import { ToastError } from '../../components/toast/hot-toast'

// ts-ignore
const isEqual = require('lodash.isequal')

async function PromisifyErrorHandler(msg: string) {
	ToastError(msg)
}
type $postConfigType = {
	noToast?: boolean
	useBroker?: boolean
	brokerParams?: {
		region: 'CA' | 'US'
		url?: string
	}
}
type APIConfigType = {
	[key: string]: any
	params?: any
} & $postConfigType

export type fetchOptionProps = {
	url: string
	params?: {
		[key: string]: any
	}
	eager?: boolean
	config?: APIConfigType
}
export type hasProperty<T, PropertyName> = PropertyName extends string
	? { [P in PropertyName]: T }
	: T
export type responseProps<T, P> = {
	success: boolean
	error: string
	code?: number | string
} & hasProperty<T, P>

/**
 * @param options : {url:string, params?:any, config?:any}
 * @returns {Response, error, fire:(options)=>{}}
 */
export function useGetFetch<T, P = undefined>(
	options?: fetchOptionProps,
	callback?: (data: responseProps<T, P> | null) => void
) {
	const [$options, setParam] = useState(options)
	const [response, setResponse] = useState<responseProps<T, P> | null>(null)
	const [error, setError] = useState<responseProps<T, P> | null>(null)
	const status = useRef<{ loading: boolean }>({ loading: false })
	const onFinally = () => {
		// clean up function
		status.current.loading = false
	}

	const fire = useCallback(
		(opt?: Partial<fetchOptionProps>) => {
			const { url, params = {}, config } = Object.assign({}, $options, opt) as fetchOptionProps
			const _patchedData = Object.assign({}, params) //add on params

			//
			if (url && !status.current.loading) {
				status.current.loading = true
				let $config = config ? { ...config, params: _patchedData } : { params: _patchedData }
				return new Promise<responseProps<T, P>>((resolve, reject) => {
					return getFetch(url, params)
						.then((blob) => blob.json())
						.then((res: responseProps<T, P>) => {
							if (res.success === false || res.error) {
								consoleErrorResponse(res, url, _patchedData, $config)
								PromisifyErrorHandler('Error occurs')
								setError(res)
								setResponse(null)
								callback && callback(null)
								status.current.loading = false
								reject(res)
							} else {
								consoleSuccessResponse(res, url, _patchedData, $config)
								setResponse(res)
								setError(null)
								callback && callback(res)
								status.current.loading = false
								resolve(res)
							}
							onFinally()
						})
						.catch((e) => {
							PromisifyErrorHandler('NETWORK_ERROR')
							onFinally()
						})
						.finally(() => {
							onFinally()
						})
				})
			}
		},
		[$options, callback]
	)

	useEffect(() => {
		if (!isEqual($options, options)) {
			setParam(options)
		}
	}, [options])
	useEffect(() => {
		if ($options && $options?.eager) {
			fire($options)
		}
	}, [$options])
	return {
		loading: status.current.loading,
		response,
		error,
		fire,
	}
}

export default useGetFetch
