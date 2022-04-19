import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<title>Next </title>
					<link rel='shortcut icon' href={'favicon.png'} type='image/x-icon' />
					<link rel='icon' href='/favicon.ico' />
					{/* <meta name='robots' content='noindex,nofollow' /> */}
					<meta name='keywords' content='jake test' />
					<meta name='description' content='This is a description. ' />
				</Head>
				<body>
					<Main />
					<NextScript />
					{/* <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDxo1Sg8D5bpFK1kSfiZI-crTuJ1r7Qybo&libraries=places'></script> */}
				</body>
			</Html>
		)
	}
}

export default MyDocument
