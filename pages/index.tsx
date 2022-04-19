import type { NextPage } from 'next'
import HomePage from '@src/pages/main/home/Home'
// @ts-ignore
import tw, { styled } from 'twin.macro'
import Link from 'next/link'
import { nextHistory, PushTo_OrderPage, ROUTER_MAPPING } from 'routes'

export default function Home() {
	if (typeof window === 'undefined') {
		return <Container></Container>
	} else {
		return (
			<div>
				<HomePage></HomePage>

				<div>Router</div>
				<div
					className='underline cursor-pointer'
					onClick={() => PushTo_OrderPage('0TsUlQ2ph_IE-M')}
				>
					Go to Mobile order page
				</div>
				<div
					className='underline cursor-pointer'
					onClick={() => nextHistory.push(ROUTER_MAPPING.MOBILE_HOME)}
				>
					Go to Mobile Home page
				</div>
			</div>
		)
	}
}

const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	& > div {
		display: flex;
		width: 100%;
	}
`
