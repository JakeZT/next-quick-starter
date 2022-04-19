import '../styles/globals.css'
import '../node_modules/antd/dist/antd.min.css'

//
import 'tailwindcss/tailwind.css'
import 'notiflix/dist/notiflix-3.2.5.min.css'
import '../node_modules/react-toastify/dist/ReactToastify.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
//
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import store from '@src/store/store-redux'
import App from './style'
import { useState, useEffect } from 'react'
//
import { globalCreateStore, ZustandProvider } from '../src/store/store-zustand/global'
import { MobxStoreProvider } from '../src/store/store-mobx/index'

//
function MyApp({ Component, pageProps }: AppProps) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])

	// @ts-ignore
	return (
		mounted && (
			<Provider store={store}>
				<ZustandProvider createStore={globalCreateStore}>
					<MobxStoreProvider>
						<App id='root'>
							<ToastContainer />
							<Toaster />
							{/* @ts-ignore */}
							<Component {...pageProps} />
						</App>
					</MobxStoreProvider>
				</ZustandProvider>
			</Provider>
		)
	)
}

export default MyApp
