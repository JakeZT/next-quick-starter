declare module '*.css' {
	const content: { [className: string]: string }
	export default content
}

// interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

// declare module '*.svg' {
// 	const svgUrl: string
// 	const svgComponent: SvgrComponent
// 	export default svgUrl
// 	export { svgComponent as ReactComponent }
// }
declare module '*.svg' {
	const content: any
	export default content
}
declare module '*.png' {
	const content: any
	export default content
}
declare module '*.jpg' {
	const content: any
	export default content
}
declare module '*.scss' {
	const content: Record<string, string>
	export default content
}
declare module 'worker-loader!*' {
	class WebpackWorker extends Worker {
		constructor()
	}

	export default WebpackWorker
}
