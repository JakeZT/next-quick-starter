import classnames from 'classnames'
import { useEffect } from 'react'
import {
	getServices,
	getServiceByType,
	postService,
	putService,
	deleteService,
} from './api.service'
import { blockLoadingStart, blockLoadingDone } from '../../components/hint/index'

export function TestComponent4Axios() {
	useEffect(() => {
		const main = async () => {
			blockLoadingStart()
			const info = {
				id: '33fqdW5YdORrN',
				name: 'TIRE CHANGE OFF RIMS',
				type: 'MECHANIC',
				description: 'This is a post request',
				mins: '120',
			}

			const arr = [
				getServices(),
				postService(info),
				putService(info),
				deleteService('BreakService'),
			]
			const dispatchedAll = await Promise.allSettled(arr)
			// for (let res of dispatchedAll) {
			// 	console.log(res)
			// }
			const successfulPromises = dispatchedAll.filter((p) => p.status === 'fulfilled')
			const errorsPromises = dispatchedAll.filter((p) => p.status === 'rejected')
			console.log(successfulPromises)
			console.log(errorsPromises)
			blockLoadingDone()
		}
		main()
	}, [])

	return (
		<div
			className={classnames({
				current: 1 >= 0,
				point: true,
			})}
		>
			Axios Component
		</div>
	)
}

/* 

  const textPromises = urls.map(async url => {
    const response = await fetch(url)
    return response.text()
  })

  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
	*/
