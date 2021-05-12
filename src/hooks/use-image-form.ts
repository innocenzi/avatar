import { get } from '@vueuse/shared'
import { computed } from 'vue'
import { queryUrl, state } from './use-cropper'

/**
 * Whether the form is showing.
 */
export const shouldBeShown = computed(() => {
	if (state.inputDialog === undefined) {
		return !state.source && !get(queryUrl)
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
