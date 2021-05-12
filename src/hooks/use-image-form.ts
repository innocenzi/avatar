import { computed } from 'vue'
import { sourceUrl, state } from './use-cropper'

/**
 * Whether the form is showing.
 */
export const shouldBeShown = computed(() => {
	if (state.inputDialog === undefined) {
		return !state.source && !sourceUrl
	}

	return state.inputDialog
})

/**
 * Opens the modal.
 */
export function show() {
	state.inputDialog = true
}

/**
 * Closes the modal only if there is already a source.
 */
export function close() {
	if (state.source) {
		state.inputDialog = false
	}
}
