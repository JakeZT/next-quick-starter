import create from 'zustand'
import produce from 'immer'
import { devtools, persist } from 'zustand/middleware'
interface BearState {
	bears: number
	paw: boolean
	snout: boolean
	fur: boolean
	increasePopulation: (by: number) => void
	increase2: () => void
}

export const useBearStore = create<BearState>()(
	devtools(
		persist((set, get) => ({
			paw: true,
			snout: true,
			fur: true,
			bears: 0,
			increasePopulation: () => set(produce((state) => ({ bears: state.bears + 1 }))),
			increase2: () => set(() => ({ bears: get().bears + 1 })),
		}))
	)
)

export const useBearStore2 = create<BearState>()(
	devtools(
		persist((set, get) => ({
			paw: true,
			snout: true,
			fur: true,
			bears: 0,
			increasePopulation: () => set(produce((state) => ({ bears: state.bears + 1 }))),
			increase2: () => set(() => ({ bears: get().bears + 1 })),
		}))
	)
)

//  TEST
function BearCounter() {
	const bears = useBearStore((state: any) => state.bears)
	return <div>{bears}</div>
}
function Controls() {
	const increasePopulation = useBearStore((state: any) => state.increasePopulation)
	return <button onClick={increasePopulation}>one up</button>
}

/* // @ts-ignore
const paw = useBearStore.getState().paw // 不一定是最新值
// Listening to all changes, fires synchronously on every change
const unsub1 = useBearStore.subscribe(console.log)
// Updating state, will trigger listeners
useBearStore.setState({ paw: false })
// Unsubscribe listeners
unsub1()
// Destroying the store (removing all listeners)
useBearStore.destroy() */
