import { computed } from 'vue'
import { state } from './use-cropper'

/**
 * Whether the form is showing.
 */
export const show = computed(() => {
	if (state.inputDialog === undefined) {
		return !state.source
	}

	return state.inputDialog
})

/**
 * Closes the modal only if there is already a source.
 */
export function close() {
	if (state.source) {
		state.inputDialog = false
	}
}
