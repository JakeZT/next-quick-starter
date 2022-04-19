import { getToken } from '../../config/utils'
const { NEXT_PUBLIC_BASEURL_TEST } = process.env
const baseUrl = () => NEXT_PUBLIC_BASEURL_TEST

export const getFetch = (originUrl: string, params?: any) => {
	const url = new URL(`${baseUrl()}${originUrl}`)
	let esc = encodeURIComponent
	if (params) {
		Object.keys(params).forEach((key) => url.searchParams.append(key, esc(params[key])))
	}
	return fetch(url, {
		method: 'GET',
		mode: 'cors',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getToken(),
		},
	})
}

export const postFetch: (
	url: string,
	data: any,
	config?: { token: string; 'Content-type'?: string; Accept?: string }
) => Promise<any> = (url, data, config) => {
	const { token = '', trackingId = '', ...rest } = data
	console.info('request........', baseUrl())
	const headerParams = Object.assign(
		{
			Accept: 'application/json',
			Authorization: 'Bearer ' + getToken(),
			'Content-type': 'application/json',
			// 'Content-type': 'application/x-www-form-urlencoded',//
			// token,
		},
		config
	) as any
	headerParams.trackingId = trackingId || ''
	// if (DEVICE_UNIQUE_ID) {
	// 	headerParams.deviceId = DEVICE_UNIQUE_ID
	// }
	const src = baseUrl() + url
	console.log('postFetch requesting.................', src, '\n', { data, config }, '\n')
	console.log(JSON.stringify(rest))
	console.log(paramfy('', rest))
	return fetch(src, {
		method: 'POST',
		headers: headerParams,
		// body: paramfy('', rest)// for x-www-form-urlencoded,
		body: JSON.stringify(rest), // for json,
	})
}
export function paramfy(url: string, option: any) {
	const prefix = url === '' ? '' : url.indexOf('?') > -1 ? '&' : '?'
	if (option === undefined) {
		return url
	}
	let pairs = []
	if (Array.isArray(option)) {
		pairs = option.map((i) => i.replace(/\s/gi, ''))
	} else if (typeof option === 'object') {
		for (let i in option) {
			if (option.hasOwnProperty(i)) {
				pairs.push(`${i}=${option[i]}`)
			}
		}
	} else {
		return url + prefix + option
	}
	return url + prefix + pairs.join('&')
}

type NATION_CODE_TYPE = 'CA' | 'US'
//for proxy using
export const postFetchToBrokerInterface: (
	url: string,
	data: any,
	region: NATION_CODE_TYPE,
	config?: { token: string; 'Content-type'?: string; Accept?: string }
) => Promise<any> = (url, data, region, config) => {
	const { token = '', trackingId = '', ...rest } = data || {}
	const brokerParams = 'url=' + url + '&region=' + region + '&para=' + JSON.stringify({ ...rest })
	const brokerUrl = baseUrl() + '/Combine/DispatchRequest'
	console.log(
		'postFetchToBrokerInterface() requesting................. ',
		brokerUrl,
		'\n',
		brokerParams,
		token,
		'\n'
	)
	const headerParams = Object.assign(
		{
			Accept: 'application/json',
			'Content-type': 'application/x-www-form-urlencoded',
			token,
		},
		config
	) as any
	headerParams.trackingId = trackingId || ''
	// if (DEVICE_UNIQUE_ID) {
	// headerParams.deviceId = DEVICE_UNIQUE_ID
	// }
	return fetch(brokerUrl, {
		method: 'POST',
		headers: headerParams,
		body: brokerParams,
	})
}

export type hasProperty<T, PropertyName> = PropertyName extends string
	? { [P in PropertyName]: T }
	: T
export type responseProps<T, P> = {
	success: boolean
	error: string
	code?: number | string
} & hasProperty<T, P>
export const consoleSuccessResponse = (
	res: any,
	url: any,
	_patchedData: any,
	$config: any,
	broker: any = undefined
) => {
	console.log(
		`\n✅ RESPONSE${broker ? '(broker)' : ''}:::`,
		res,
		'\nURL:::',
		url,
		'ACTION:::',
		'PARAMS:::',
		_patchedData,
		'\n',
		'CONFIG:::',
		$config,
		'\n'
	)
}
export const consoleErrorResponse = (
	res: any,
	url: any,
	_patchedData: any,
	$config: any,
	broker: any = undefined
) => {
	console.log(
		`\n❌ RESPONSE${broker ? '(broker)' : ''}:::`,
		res,
		'\nURL:::',
		url,
		'ACTION:::',
		'PARAMS:::',
		_patchedData,
		'\n',
		'CONFIG:::',
		$config,
		'\n'
	)
}
