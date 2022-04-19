const tokenName = 'token_Name)'
let localStorage: any = undefined
const storageReady = () => {
	if (typeof window !== 'undefined') {
		localStorage = window.localStorage
		return true
	} else {
		return false
	}
}
export const setToken = (token: string) => {
	if (!storageReady()) {
		return null
	}
	console.log(token)
	window?.localStorage?.setItem(tokenName, token)
}
export const getToken = () => {
	try {
		if (!storageReady()) {
			return null
		}
		let res = localStorage?.getItem(tokenName)
		return res
	} catch (e: any) {
		console.log(e.message)
		if (!storageReady()) {
			return null
		}
		return localStorage?.getItem(tokenName) || {}
	}
}
export const removeToken = () => {
	storageReady() && localStorage?.removeItem(tokenName)
}
