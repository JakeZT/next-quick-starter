import classnames from 'classnames'
import { useEffect } from 'react'
import useGetFetch from './useGetFetch'
import usePostFetch from './usePostFetch'

export function TestComponent4Fetch() {
	const { fire, response, error, loading } = useGetFetch<any>()
	const { fire: postFire, response: postRes } = usePostFetch<any>()
	useEffect(() => {
		fire({
			url: '/services',
		})
		// fire({
		// 	url: '/service/BREAKService',
		// })

		postFire({
			url: '/service',
			data: {
				id: '33fqdW5YdORrN',
				name: 'TIRE CHANGE OFF RIMS',
				type: 'MECHANIC',
				description: 'This is a post request',
				mins: '120',
			},
		})
	}, [])
	useEffect(() => {
		console.log(response, error, loading)
		console.log(postRes)
	}, [response, postRes])
	return (
		<div
			className={classnames({
				current: 1 >= 0,
				point: true,
			})}
		>
			fetch Component
		</div>
	)
}
