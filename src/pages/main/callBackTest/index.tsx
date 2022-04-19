import { AllReducers } from '@src/store/store-redux/reducer'
import { userInitialState } from '@src/store/store-redux/state'
import React, { useCallback, useEffect, useMemo, useState, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCount, resetCount } from '../../../store/store-redux/actions/user-action'
export default function HomePage() {
	const dispatch = useDispatch()
	const user = useSelector<typeof AllReducers>(
		(state) => state.userState
	) as typeof userInitialState
	useMemo(() => {
		console.log('user', user)
	}, [user.count])

	const print = useCallback(() => {
		console.log('user', user)
	}, [user.count]) // not optimized at all , should not binding the changing state

	useEffect(() => {
		dispatch(updateCount(user.count + 1))

		setTimeout(() => {
			dispatch(resetCount())
		}, 1000)
	}, [])
	return <div> This is home page</div>
}

function Form() {
	const [text, updateText] = useState('')
	const textRef = useRef<string>('')

	useLayoutEffect(() => {
		// (equals to didMount and didUpdate)
		textRef.current = text //
	})

	// ref always return the latest value
	const handleSubmit = useCallback(() => {
		const currentText = textRef.current
		alert(currentText)
	}, [textRef])

	return (
		<>
			<input value={text} onChange={(e) => updateText(e.target.value)} />
		</>
	)
}

const MyBigList = React.memo(({ term, onItemClick }: any) => {
	const items = new Array(10000).fill(0)
	return (
		<div>
			{items.map((item) => (
				<div onClick={onItemClick}>{item}</div>
			))}
		</div>
	)
})

function MyParent({ term }: any) {
	//This way to write MybigList will only be rendered in the first rendering, and each rendering will be cached, which has great improvements to the rendering performance of big data.

	const onItemClick = useCallback(
		(event) => {
			console.log('You clicked ', event.currentTarget)
		},
		[term]
	)
	return <MyBigList term={term} onItemClick={onItemClick} />
}
