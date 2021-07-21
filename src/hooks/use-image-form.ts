import { computed, reactive, watch } from 'vue'
import { state } from './state'

export const errors = reactive({
	url: '',
	file: '',
})

/**
 * Resets errors.
 */
export function resetError(...types: Array<'url' | 'file'>) {
	types.forEach((type) => errors[type] = '')
}

/**
 * Displays an error.
 */
export function displayError(error: string | string[], type: 'url' | 'file') {
	resetError('file', 'url')

	if (!Array.isArray(error)) {
		error = [error]
	}

	error = error[Math.floor(Math.random() * error.length)]
	errors[type] = error ?? ''

	return false
}

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
		return !state.source && !state.loading
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
