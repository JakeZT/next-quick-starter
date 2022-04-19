import toast, { Toast, Toaster } from 'react-hot-toast'
// @ts-ignore
import tw, { styled } from 'twin.macro'
type StyleType = Partial<
	Pick<
		Toast,
		'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'
	>
>
const generateCss = (time: number = 3000): StyleType => {
	return {
		duration: time,
		position: 'top-center',
		style: {},
		className: '',

		ariaProps: {
			role: 'status',
			'aria-live': 'polite',
		},
	}
}
const InfoIcon = styled.i`
	display: inline-block;
	margin-right: 10px;
	height: 20px;
	line-height: 20px;
	color: #228be6;
`

const Cover = styled.div`
	height: 25px;
	line-height: 20px;
`
export const ToastSuccess = (msg: string, time?: number) => toast.success(msg, generateCss(time))
export const ToastInfo = (msg: string, time?: number) =>
	toast(
		<Cover>
			<InfoIcon className='fas fa-info-circle'></InfoIcon>
			{msg}
		</Cover>,
		generateCss(time)
	)
export const ToastError = (msg: string, time?: number) => toast.error(msg, generateCss(time))
