import React, { createContext } from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import { useContext } from 'react'
import { toJS } from 'mobx'

export const windowSizeContext = createContext(null) as unknown as React.Context<StoreType>

interface StoreType {
	windowResizeStore: {
		isMobile: boolean
		set(size: number): void
		get(): any
	}
	countStore: {
		count: number
		increment(count?: number): number
		decrement(count?: number): number
		get(): number
	}
}
export const MixedProvider = ({ children }: { children: JSX.Element }) => {
	const windowResizeStore = windowSize()
	const countStore = CountStore()
	return (
		<windowSizeContext.Provider
			value={{
				windowResizeStore,
				countStore,
			}}
		>
			{children}
		</windowSizeContext.Provider>
	)
}
const CountStore = () =>
	useLocalObservable(() => ({
		count: 1,
		increment(count: number = 0) {
			if (count) {
				return (this.count += count)
			}
			return this.count++
		},
		decrement(count: number = 0) {
			if (count) {
				return (this.count -= count)
			}
			return this.count--
		},
		get() {
			return this.count
		},
	}))
const windowSize = () =>
	useLocalObservable(() => ({
		isMobile: false,
		set(size: number) {
			if (size > 900) {
				this.isMobile = false
			} else if (size <= 900) {
				this.isMobile = true
			}
		},
		get() {
			return toJS(this.isMobile)
		},
	}))

export const useMobxStore = () => useContext(windowSizeContext)
