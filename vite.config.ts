import path from 'path'
import windi from 'vite-plugin-windicss'
import components from 'vite-plugin-components'
import fonts from 'vite-plugin-fonts'
import vue from '@vitejs/plugin-vue'
import icons from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(),
		windi(),
		components(),
		icons({
			iconDirs: [path.resolve(process.cwd(), 'src/icons')],
			symbolId: '[dir]:[name]',
		}),
		fonts({
			google: {
				families: [
					{ name: 'Inter', styles: 'wght@200;400;500;600' },
				],
			},
		}),
	],
})
