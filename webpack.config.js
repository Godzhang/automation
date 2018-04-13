var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: ['webpack/hot/dev-server', path.resolve(__dirname, './src/index.js')],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name]-bundle.js'
	},
	devServer: {
		inline: true,
		port: 8099
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: __dirname + './src/'
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader',{
					loader: 'postcss-loader',
					options: {
						plugins: function(){
							return [
								require('postcss-import')(),  //处理css中的@import
								require('autoprefixer')({
									browsers: ['last 5 versions']
								})
							]
						}
					}
				}]
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loaders: [
					'url-loader?limit=100&name=assets/[name]-[hash:5].[ext]',
					'image-webpack-loader'
				]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}




















