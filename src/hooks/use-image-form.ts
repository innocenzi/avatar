import { tryOnMounted } from '@vueuse/shared'
import { computed, watch } from 'vue'
import { loadFromUrl, queryUrl, sourceUrl, state } from './use-cropper'

/**
 * When mounted, if there was a source URL in the storage,
 * loads it (as a convenience).
 */
tryOnMounted(async() => {
	setTimeout(() => {
		loadFromUrl(queryUrl ?? sourceUrl.value).catch((e) => console.warn('Automatic load failed.', e))
	}, 1000)
})

/**
 * Closes the input dialog request when the source changes.
 */
watch(() => state.source, () => {
	if (state.source) {
		state.inputDialog = undefined
	}
})

/**
 * Whether the form is showing.
 */
export const shouldBeShown = computed(() => {
	if (state.inputDialog === undefined) {
		return !state.source
	}

	return state.inputDialog
})

/**
 * Requests to open the modal.
 */
export function show() {
	state.inputDialog = true
}

/**
 * Marks the modal opening request as undefined.
 */
export function close() {
	state.inputDialog = undefined
}
