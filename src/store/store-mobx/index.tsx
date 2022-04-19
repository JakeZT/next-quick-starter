import React, { useContext, useState, useEffect } from 'react'
import { Observer, useObserver } from 'mobx-react-lite'
import { autorun } from 'mobx'
import { MixedProvider, useMobxStore } from './windowStore'
import { Button } from 'antd'
export const First = () => {
	const store = useMobxStore()

	return useObserver(() => (
		<div>
			<h2>Count: {store.countStore.count}</h2>
			<Button type='primary' onClick={() => store.countStore.increment(10)}>
				+10
			</Button>
			<Button type='dashed' onClick={() => store.countStore.decrement(10)}>
				-10
			</Button>
		</div>
	))
	//or
	// return (
	// 	<Observer>
	// 		{() => (
	// 			<div>
	// 				<h2>Count: {store.countStore.count}</h2>
	// 				<Button type='primary' onClick={() => store.countStore.increment(10)}>
	// 					+
	// 				</Button>
	// 				<Button type='dashed' onClick={() => store.countStore.decrement(10)}>
	// 					-
	// 				</Button>
	// 			</div>
	// 		)}
	// 	</Observer>
	// )
}

export const Second = () => {
	const [num, setNum] = useState(0)
	const store: any = useMobxStore()
	useEffect(() => {
		autorun(() => {
			setNum(store.count)
		})
	}, [])
	return (
		<div>
			<h2>Count: {num}</h2>
			<Button type='primary' onClick={() => store.countStore.increment()}>
				+1
			</Button>
			<Button type='dashed' onClick={() => store.countStore.decrement()}>
				-1
			</Button>
		</div>
	)
}

export const MobxStoreProvider = function ({ children }: any) {
	return (
		<MixedProvider>
			{/* <MainStoreProvider> */}
			{children}
			{/* </MainStoreProvider> */}
		</MixedProvider>
	)
}
