const webpack = require('webpack')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const TerserPlugin = require('terser-webpack-plugin')
const withTM = require('next-transpile-modules')([
	// 'antd-mobile',
	// 'react-hook-form',
])

const myProdPlugins = [
	new TerserPlugin({
		terserOptions: {
			warnings: false,
			sourceMap: false,
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.err', 'console.info'],
			},
		},
	}),
]
const nextConfig = {
	// !! Danger in Production
	typescript: {
		ignoreBuildErrors: true,
	},
	// webpack5: false,
	webpack(config, { isServer }) {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env),
			})
		)
		if (process.env.NODE_ENV === 'production') {
			console.log('Focus: Production Mode!!!!!!')
			for (let plugin of myProdPlugins) {
				config.plugins.push(plugin)
			}
		} else {
			console.log('Focus: Development Mode!!!!!!')
		}
		return config
	},
}
const myConfigs = withPlugins(
	[
		withImages({
			esModule: true,
			webpack(config, { isServer }) {
				config.plugins.push(
					new webpack.DefinePlugin({
						'process.env': JSON.stringify(process.env),
					})
				)
				return config
			},
			images: {
				disableStaticImages: true,
			},
		}),
		withTM,
	],
	nextConfig
)
module.exports = myConfigs
