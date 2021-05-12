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
			gray: colors.gray,
		},
		fontFamily: {
			sans: ['Inter'],
		},
		scale: {
			flip: '-1',
		},
	},
})
