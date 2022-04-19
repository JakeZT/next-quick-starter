import Notiflix from 'notiflix'

export const gLoadingStart = (info: string = 'Loading...') => {
	Notiflix.Loading.init({
		zindex: 4000,
		backgroundColor: 'rgba(232,249,255,0.8)',
		cssAnimation: true,
		cssAnimationDuration: 400,
		clickToClose: false,
		svgSize: '80px',
		svgColor: '#32c682',
		// messageID: 'NotiflixLoadingMessage',
		messageFontSize: '15px',
		messageMaxLength: 34,
		messageColor: '#7eb3ae',
	})
	Notiflix.Loading.pulse(info)
}

export const blockLoadingStart = (selector: string = '#__next', info: string = 'Loading...') => {
	Notiflix.Block.init({
		querySelectorLimit: 200,
		className: 'notiflix-block',
		position: 'absolute',
		zindex: 1000,
		backgroundColor: 'rgba(255,255,255,0.7)',
		rtl: false,
		fontFamily: 'Arial',
		cssAnimation: true,
		cssAnimationDuration: 300,
		svgSize: '45px',
		svgColor: '#0f5088',
		messageFontSize: '13px',
		messageMaxLength: 34,
		messageColor: '#0f5088',
	})

	Notiflix.Block.dots(selector, info, {
		svgSize: '81px',
	})
}

export const blockLoadingDone = (selector: string = '#__next') => {
	Notiflix.Block.remove(selector)
}

export const gLoadingEnd = (time: number = 300) => {
	Notiflix.Loading.remove(time)
}

export const gOperationSuccess = (message: string = 'Operation Success', time: number = 1200) => {
	setTimeout(() => {
		const button = document.getElementById('NXReportButton')
		button?.click()
	}, time)
	OperationInit()
	Notiflix.Report.success(
		'Success',
		message,
		'OK',
		() => {
			console.log('success')
		},
		{
			width: '360px',
			svgSize: '120px',
		}
	)
}

export const gOperationError = (
	message: string = 'Your action is failed. Please try again later.',
	time: number = 1200
) => {
	setTimeout(() => {
		const button = document.getElementById('NXReportButton')
		button?.click()
	}, time)
	OperationInit()
	Notiflix.Report.failure('Error occurs', message, 'OK', () => {}, {
		width: '360px',
		svgSize: '120px',
	})
}
export const ConfirmDeleteNotiflix = (
	title = '',
	text = '',
	back = 'Back',
	go = 'OK',
	OKFunc: any,
	CancelFunc: any
) => {
	Notiflix.Confirm.init({
		className: 'notiflix-confirm',
		width: '300px',
		//@ts-ignore
		zindex: 4003,
		position: 'center',
		distance: '10px',
		backgroundColor: '#f8f8f8',
		borderRadius: '25px',
		backOverlay: true,
		backOverlayColor: 'rgba(228,228,228,0.5)',
		rtl: false,
		// useGoogleFont: false,
		fontFamily: 'Quicksand',
		cssAnimation: true,
		cssAnimationStyle: 'fade',
		cssAnimationDuration: 300,
		plainText: true,
		titleColor: '#0f5088',
		titleFontSize: '16px',
		titleMaxLength: 34,
		messageColor: '#1e1e1e',
		messageFontSize: '16px',
		messageMaxLength: 110,
		buttonsFontSize: '15px',
		buttonsMaxLength: 34,
		okButtonColor: '#f8f8f8',
		okButtonBackground: '#a9a9a9',
		cancelButtonColor: '#f8f8f8',
		cancelButtonBackground: '#f31515',
	})
	return Notiflix.Confirm.show(
		`${title}`,
		`${text}`,
		`${back}`,
		`${go}`,
		() => OKFunc(),
		() => CancelFunc()
	)
}

export const ConfirmCheckInStatus = (
	title = '',
	text = '',
	OKFunc: any,
	CancelFunc: any,
	back = 'Cancel',
	go = 'Check-in'
) => {
	Notiflix.Confirm.init({
		className: 'notiflix-confirm',
		width: '300px',
		//@ts-ignore
		zindex: 4003,
		position: 'center',
		distance: '10px',
		backgroundColor: '#f8f8f8',
		borderRadius: '25px',
		backOverlay: true,
		backOverlayColor: 'rgba(228,228,228,0.5)',
		rtl: false,
		// useGoogleFont: false,
		fontFamily: 'Quicksand',
		cssAnimation: true,
		cssAnimationStyle: 'fade',
		cssAnimationDuration: 300,
		plainText: true,
		titleColor: '#0f5088',
		titleFontSize: '16px',
		titleMaxLength: 34,
		messageColor: '#1e1e1e',
		messageFontSize: '16px',
		messageMaxLength: 110,
		buttonsFontSize: '15px',
		buttonsMaxLength: 34,
		okButtonColor: '#f8f8f8',
		okButtonBackground: '#a9a9a9',
		cancelButtonColor: '#f8f8f8',
		cancelButtonBackground: '#0f5088',
	})
	return Notiflix.Confirm.show(
		`${title}`,
		`${text}`,
		`${back}`,
		`${go}`,
		() => OKFunc(),
		() => CancelFunc()
	)
}
export const ConfirmNotiflix = (
	title = '',
	text = '',
	back = 'Back',
	go = 'OK',
	OKFunc: any,
	CancelFunc: any
) => {
	Notiflix.Confirm.init({
		className: 'notiflix-confirm',
		width: '300px',
		//@ts-ignore
		zindex: 4003,
		position: 'center',
		distance: '10px',
		backgroundColor: '#f8f8f8',
		borderRadius: '25px',
		backOverlay: true,
		backOverlayColor: 'rgba(0,0,0,0.5)',
		rtl: false,
		// useGoogleFont: false,
		fontFamily: 'Quicksand',
		cssAnimation: true,
		cssAnimationStyle: 'fade',
		cssAnimationDuration: 300,
		plainText: true,
		titleColor: '#0f5088',
		titleFontSize: '16px',
		titleMaxLength: 34,
		messageColor: '#1e1e1e',
		messageFontSize: '14px',
		messageMaxLength: 110,
		buttonsFontSize: '15px',
		buttonsMaxLength: 34,
		okButtonColor: '#f8f8f8',
		okButtonBackground: '#0f5088',
		cancelButtonColor: '#f8f8f8',
		cancelButtonBackground: '#a9a9a9',
	})
	return Notiflix.Confirm.show(
		`${title}`,
		`${text}`,
		`${back}`,
		`${go}`,
		() => OKFunc(),
		() => CancelFunc()
	)
}
export const gOperationInfo = (message: string = '', time: number = 1200) => {
	setTimeout(() => {
		const button = document.getElementById('NXReportButton')
		button?.click()
	}, time)
	OperationInit()
	Notiflix.Report.info(
		'Info',
		message,
		'OK',
		() => {
			console.log('info')
		},
		{
			width: '360px',
			svgSize: '120px',
		}
	)
}
const OperationInit = () => {
	Notiflix.Report.init({
		className: 'notiflix-report',
		width: '320px',
		backgroundColor: '#f8f8f8',
		borderRadius: '25px',
		rtl: false,
		zindex: 4002,
		backOverlay: true,
		backOverlayColor: 'rgba(0,0,0,0.5)',
		fontFamily: 'Quicksand',
		svgSize: '110px',
		plainText: true,
		titleFontSize: '16px',
		titleMaxLength: 34,
		messageFontSize: '13px',
		messageMaxLength: 400,
		buttonFontSize: '14px',
		buttonMaxLength: 34,
		cssAnimation: true,
		cssAnimationDuration: 360,
		cssAnimationStyle: 'fade',
		success: {
			svgColor: '#32c682',
			titleColor: '#1e1e1e',
			messageColor: '#242424',
			buttonBackground: '#32c682',
			buttonColor: '#fff',
			// backOverlayColor: 'rgba(50,198,130,0.2)',
			backOverlayColor: 'rgba(255,255,255,0.2)',
		},
		failure: {
			svgColor: '#ff5549',
			titleColor: '#1e1e1e',
			messageColor: '#242424',
			buttonBackground: '#ff5549',
			buttonColor: '#fff',
			backOverlayColor: 'rgba(255,85,73,0.2)',
		},
		warning: {
			svgColor: '#eebf31',
			titleColor: '#1e1e1e',
			messageColor: '#242424',
			buttonBackground: '#eebf31',
			buttonColor: '#fff',
			backOverlayColor: 'rgba(238,191,49,0.2)',
		},
		info: {
			svgColor: '#26c0d3',
			titleColor: '#1e1e1e',
			messageColor: '#242424',
			buttonBackground: '#26c0d3',
			buttonColor: '#fff',
			backOverlayColor: 'rgba(38,192,211,0.2)',
		},
	})
}
