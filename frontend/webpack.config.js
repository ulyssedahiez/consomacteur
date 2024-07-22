const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

module.exports = (env, { mode }) => ({
	// Fichier d'entrée :
	entry: './src/app.js',
	// Fichier de sortie :
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'app.bundle.js',
		// configuration du fast-refresh [1/3]
		// pour que webpack serve publie le js dans un sous-dossier fictif build
		publicPath: '/build/',
	},
	// compatibilité anciens navigateurs (si besoin du support de IE11 ou android 4.4)
	target: ['web', 'es5'],
	// connexion webpack <-> babel :
	module: {
		rules: [
			{
				test: /\.png$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/',
				},
			},
			{
				test: /\.jpg$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images/',
				},
			},

			{
				test: /.css$/i,
				use: ['style-loader', 'css-loader'],
			},

			{
				test: /\.js$/, // tous les fichiers js ...
				exclude: /node_modules/, // ... sauf le dossier node_modules ...
				use: {
					// ... seront compilés par babel !
					loader: 'babel-loader',
				},
			},
		],
	},
	// configuration du fast refresh [2/3]
	plugins: [mode === 'development' && new ReactRefreshWebpackPlugin()].filter(
		Boolean
	),
	// configuration du fast-refresh [3/3]
	devServer: {
		historyApiFallback: true,
		// choix du port du serveur webpack qui va servir notre application
		port: 8000,
		// configuration du dossier racine du serveur
		static: {
			directory: './',
			watch: false, // évite de recharger toute la page quand un fichier est modifié
		},
	},
	devtool: 'source-map',
});
