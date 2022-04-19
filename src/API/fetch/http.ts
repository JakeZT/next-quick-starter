namespace http {
	export const LOADING = 'loading'
	export const ERROR = 'loading-error'
	export const ON_ERROR = 'on-error'
	export const SET_ERROR = 'set-error'
	export const DATA_ERROR = 'data-error'
	export const SUCCESS = 'loading-success'
	export const FINISHED = 'loading-finished'
	export const RESET_STATUS = 'RESET_STATUS'
	export const SHOW_MESSAGE = 'show-message'
	export const SHOW_TOAST = 'SHOW_TOAST'
	export const HAS_ERROR = 'has-message'
	export const REPORT_ERROR = 'REPORT_ERROR'
	export const CATCH_ERROR = 'CATCH_ERROR'

	export const setLoading = (txt?: string) => ({ type: LOADING, data: txt })
	export const clearLoading = () => ({ type: FINISHED })
	export const resetStatus = () => ({ type: RESET_STATUS })
	export const catchError = (
		interfaceName: string,
		parameters: string,
		exceptionContent: string
	) => ({
		type: CATCH_ERROR,
		data: { interfaceName, parameters, exceptionContent },
	})
}
export default http
