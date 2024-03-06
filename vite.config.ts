import {defineConfig} from 'vite';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: path.resolve(__dirname, 'dist'),
	},

	server: {
		port: 3000
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'~': path.resolve(__dirname, 'src')
		},
	}
});
