import { useBearStore, useBearStore2 } from './index'
import create from 'zustand'
import createContext from 'zustand/context'

const { Provider, useStore } = createContext()

export const globalCreateStore = () => useBearStore
export const globalUseStore = useStore
export const ZustandProvider = Provider
