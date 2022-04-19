import Router, { useRouter } from 'next/router'
export const ROUTER_MAPPING = {
	HOME: '/',
	BUSY: '/busy',
	LOGIN: '/login',
	MOBILE_HOME: '/mobile/home',
}

type T = string
export const nextHistory = Router

export const PushTo_VerifyLink = (token: T) => {
	nextHistory.push(`/garage/verification/${token}`)
}
export const PushTo_OrderPage = (id: T) => {
	nextHistory.push(`/mobile/order/${id}`)
}
