import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'
import forms from 'windicss/plugin/forms'

export default defineConfig({
	plugins: [
		forms,
	],
	theme: {
		colors: {
			...colors,
			gray: {
				...colors.gray as Record<string, string>,
				700: '#ffffff19',
				800: '#191919',
				900: '#131313',
			},
		},
		boxShadow: {
			toolbar: '0 4px 16px 0 rgba(0,0,0,.6)',
		},
		fontFamily: {
			sans: ['Inter'],
		},
		scale: {
			flip: '-1',
		},
	},
})
