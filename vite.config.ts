import { defineConfig } from 'vite'
import windi from 'vite-plugin-windicss'
import components from 'vite-plugin-components'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
		vue(),
		windi(),
		components()
	]
})
