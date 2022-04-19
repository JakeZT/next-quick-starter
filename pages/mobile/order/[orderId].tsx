import { useEffect } from 'react'
import { useRouter } from 'next/router'
export default function MobileOrderPage() {
	const router = useRouter()
	useEffect(() => {
		const { orderId } = router.query
		console.log(orderId)
	}, [router])

	const props = {
		orderId: router.query.orderId,
	} as any
	return (
		<div {...props}>
			<h1>This is order page</h1>
			<div>orderID is {router.query?.orderId}</div>
		</div>
	)
}
