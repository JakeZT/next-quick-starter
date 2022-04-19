import { useBearStore } from '@src/store/store-zustand'
import { AllReducers } from '@src/store/store-redux/reducer'
import { userInitialState } from '@src/store/store-redux/state'
import React, { useCallback, useEffect, useMemo, useState, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCount, resetCount } from '../../../store/store-redux/actions/user-action'
import { globalUseStore } from '@src/store/store-zustand/global'
import Demo from '../../../store/store-mobx/demo'
import styles from '@styles/Home.module.css'
//

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleLeft,
	faFloppyDisk,
	faCheck,
	faSpinner,
	faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { TestComponent4Fetch } from '../../../API/fetch/test'
import { TestComponent4Axios } from '../../../API/axios/test'

export default function HomePage() {
	{
		// const bears = useBearStore((state: any) => state.bears)
		// const increasePopulation = useBearStore((state: any) => state.increasePopulation) // OK
		// const increase2 = useBearStore((state: any) => state.increase2) //OK
	}
	const bears = globalUseStore((state: any) => state.bears) //OK
	const increase2 = globalUseStore((state: any) => state.increase2) //OK

	const dispatch = useDispatch()
	const user = useSelector<typeof AllReducers>(
		(state) => state.userState
	) as typeof userInitialState
	// useMemo(() => {
	// 	console.log('user', user)
	// }, [user.count])

	const print = useCallback(() => {
		console.log('user', user)
	}, [user.count])

	useEffect(() => {
		dispatch(updateCount(user.count + 1))

		setTimeout(() => {
			dispatch(resetCount())
		}, 1000)
	}, [])
	const [showTest, setShowTest] = useState(false)
	return (
		<div>
			{' '}
			This is home page
			<IconTemp></IconTemp>
			{showTest ? (
				<div>
					<TestComponent4Fetch></TestComponent4Fetch>
					<TestComponent4Axios></TestComponent4Axios>
				</div>
			) : (
				''
			)}
			<div className='text-lg font-bold cursor-pointer' onClick={() => setShowTest(true)}>
				{' '}
				Show Fetch and Axios Test
			</div>
			<div className={styles.container}>{bears}</div>
			<div>
				<button onClick={increase2}>one up</button>
			</div>
			<Demo></Demo>
		</div>
	)
}

function IconTemp() {
	return (
		<div>
			<FontAwesomeIcon icon={faFloppyDisk as IconProp} />
		</div>
	)
}
