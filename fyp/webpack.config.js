const path = require('path');

module.exports = {
	entry: path.join(__dirname, "public", "javascripts", "app.jsx"),

	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "public", "dist")
	},

	resolve: {
		extensions: [".js", ".jsx"]
	},

	module: {
		loaders: [
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				query: {
					presets: ["es2015", "stage-1", "react"]
				}
			}
		]
	}
};