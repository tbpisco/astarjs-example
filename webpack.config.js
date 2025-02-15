const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const { WebpackOpenBrowser } = require('webpack-open-browser');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options) => {
	return {
		mode: options.production ? 'production': 'development',
		entry: './src/app.ts',
		output: {
			filename: 'js/game.[fullhash].js',
			path: path.resolve(__dirname, 'build'),
			clean: true,
		},

		performance: { hints: false },

		devtool: options.production ? undefined : 'source-map',

		module: {
			rules: [
				{
					test: /\.ts(x)?$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},

		plugins: [
			new HtmlWepackPlugin({
				hash: true,
				minify: {
					html5: true,
					collapseWhitespace: true,
					removeComments: true,
				},
				inject: 'body',
				filename: 'index.html',
				template: __dirname + '/src/index.html',
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: 'src/images/final',
						to: 'images/',
					},
					{
						from: 'src/fonts',
						to: 'fonts/',
					},
				],
			}),
			new SimpleProgressPlugin(),
			new WebpackOpenBrowser({ url: 'http://localhost:3000', browser: 'chrome' }),
		],

		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},

		devServer: {
			host: '127.0.0.1',
			port: 3000,
			hot: true,
			liveReload: true,
		},

		optimization: {
			minimize: options.production,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						ecma: 6,
						compress: { drop_console: true },
						output: { comments: false, beautify: false },
					},
				}),
			],
		},
	};
};
