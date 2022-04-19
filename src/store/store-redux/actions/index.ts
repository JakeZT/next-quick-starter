export interface actionTypes {
	type: string
	data?: any
	success?: boolean
	params?: any
	msg?: string
	index?: number
	config?: APIConfigType
}
type APIConfigType = {
	[key: string]: any
	params?: any
}
