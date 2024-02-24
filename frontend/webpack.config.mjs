// webpack.config.mjs
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  entry: './src/App.test.js', // Entry point for your tests
  output: {
    filename: 'bundle.js', // Output file for bundled code
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Handle JavaScript files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel loader for transpilation (optional)
        },
      },
      {
        test: /\.css$/, // Handle CSS files (if applicable)
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
      // Add more loaders for other file types if needed
    ],
  },
};
