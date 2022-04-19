import { service } from './index'

export const getServices = async () => {
	return service.get(`/services`)
}
export const getServiceByType = async () => {
	return service.get(`/service/OILCHANGE`)
}
interface ServiceType {
	id: string
	name: string
	type: string
	description: string
	mins: string
}
export const postService = async (data: ServiceType) => {
	return service.post(`/service`, data)
}
export const putService = async (data: ServiceType) => {
	return service.put(`/service`, data)
}
export const deleteService = async (name: string) => {
	return service.delete(`/service/${name}`)
}
export default service
