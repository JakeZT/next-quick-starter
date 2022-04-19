/*
 * @Date: 2022-04-14 13:39:16
 * @LastEditors: FleetingSound
 * @LastEditTime: 2022-04-17 17:24:08
 * @FilePath: \Next-TS\src\API\fetch\usePostFetch.ts
 */
import { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	postFetch,
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
	data?: {
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
 * @param options : {url:string, data?:any, config?:any}
 * @returns {Response, error, fire:(options)=>{}}
 */
export function usePostFetch<T, P = undefined>(
	options?: fetchOptionProps,
	callback?: (data: responseProps<T, P> | null) => void
) {
	// const user = useSelector((state: StateType) => state.user)
	// const dispatch = useDispatch()
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
			const { url, data = {}, config } = Object.assign({}, $options, opt) as fetchOptionProps
			const _patchedData = Object.assign({}, data) //NOTE: 额外添加字段

			//
			if (url && !status.current.loading) {
				status.current.loading = true
				let $config = config ? { ...config, params: _patchedData } : { params: _patchedData }
				return new Promise<responseProps<T, P>>((resolve, reject) => {
					if (!$config?.useBroker) {
						return postFetch(url, _patchedData)
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
							})
							.catch((e) => {
								PromisifyErrorHandler('NETWORK_ERROR')
							})
							.finally(() => {
								onFinally()
							})
					} else {
						if (!$config?.brokerParams?.region) {
							console.log('\n❌ NO NATION CODE FOR BROKER API')
							reject()
						}
						return postFetchToBrokerInterface(
							url,
							_patchedData,
							$config?.brokerParams?.region ?? 'CA'
						)
							.then((blob) => blob.json())
							.then((res: responseProps<T, P>) => {
								if (res.success === false || res.error) {
									consoleErrorResponse(res, url, _patchedData, $config, 'broker')
									PromisifyErrorHandler('Error occurs')
									setError(res)
									setResponse(null)
									callback && callback(null)
									reject(res)
								} else {
									consoleSuccessResponse(res, url, _patchedData, $config, 'broker')
									setResponse(res)
									setError(null)
									callback && callback(res)
									resolve(res)
								}
							})
							.catch((e) => {
								PromisifyErrorHandler('NETWORK_ERROR')
							})
							.finally(() => {
								// dispatch({ type: http.FINISHED, config: $config })
								onFinally()
							})
					}
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

export default usePostFetch
