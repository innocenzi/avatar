import tinykeys from 'tinykeys'
import { get, invoke, set } from '@vueuse/core'
import { ref, watch } from 'vue'
import { state, download } from './use-cropper'
import { show as showImageForm } from './use-image-form'

const unsubscribeToCropperShortcuts = ref<Function>()
const unsubscribeToImageFormShortcuts = ref<Function>()

export function registerShortcuts() {
	const handle = () => {
		get(unsubscribeToCropperShortcuts)?.()
		get(unsubscribeToImageFormShortcuts)?.()

		// image form shortcuts
		if (get(showImageForm)) {
			console.log('image form shortcuts')

			return
		}

		// cropper shortcuts
		console.log('cropper shortcuts')
		useCropperShortcuts()
	}

	watch(showImageForm, handle)
	invoke(handle)
}

export function useCropperShortcuts() {
	set(unsubscribeToCropperShortcuts, tinykeys(window, {
		'Alt+o': () => state.inputDialog = true,
		'g s': () => download(),
	}))
}
