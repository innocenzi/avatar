import path from 'path'
import { defineConfig } from 'vite'
import windi from 'vite-plugin-windicss'
import components from 'vite-plugin-components'
import fonts from 'vite-plugin-fonts'
import vue from '@vitejs/plugin-vue'
import icons, { ViteIconsResolver } from 'vite-plugin-icons'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		vue(),
		windi(),
		components({
			customComponentResolvers: ViteIconsResolver({
				componentPrefix: '',
			}),
		}),
		icons(),
		fonts({
			google: {
				families: [
					{ name: 'Inter', styles: 'wght@200;400;500;600' },
				],
			},
		}),
	],
})
