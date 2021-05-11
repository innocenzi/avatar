<template>
	<modal :show="show" @close="close">
		<section class="flex flex-col items-center justify-center pointer-events-auto w-full max-w-lg">
			<img src="/logo.svg" class="w-24 h-24 mb-10" alt="Logo">

			<!-- Manual link -->
			<div class="flex flex-col w-full max-w-lg">
				<label for="url" class="block font-medium text-gray-700 sr-only">Manual URL</label>
				<!-- Wrapper -->
				<div class="flex mt-1 rounded-md shadow-sm">
					<!-- Input -->
					<div class="relative z-10 flex items-stretch flex-grow" :class="errors.urlInput ? 'z-10' : ''">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<mdi:link-variant class="w-5 h-5 text-gray-400" />
						</div>
						<input
							id="url"
							v-model="urlInput"
							type="text"
							name="url"
							placeholder="https://"
							:class="[
								'block w-full py-2.5 pl-10 transition rounded-none rounded-l-md',
								'bg-gray-800 border-gray-700',
								'focus:outline-none ',
								'sm:text-sm',
								errors.urlInput
									? 'ring-red-300 border-red-300 focus:ring-red-300 focus:border-red-300'
									: 'focus:ring-pink-300 focus:border-pink-300'
							]"
						/>
					</div>

					<!-- Upload button -->
					<button
						class="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-300 transition bg-gray-800 border border-l-0 border-gray-700 focus:border-l rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 hover:z-20 focus:z-20"
						@click="onUrlInput"
					>
						<mdi:arrow-right class="w-5 h-5 text-gray-400" />
						<!-- <span>Use</span> -->
					</button>
				</div>

				<!-- Error -->
				<span v-if="errors.urlInput" class="mt-2 text-sm text-red-300" v-text="errors.urlInput"></span>
			</div>

			<span class="my-6 text-gray-400">or</span>

			<!-- Dotted box -->
			<div class="flex flex-col _w-full max-w-lg">
				<!-- Input -->
				<label
					for="file-upload"
					:class="[
						'flex items-center justify-center',
						'_border-dashed rounded border-gray-700 border-1 shadow-sm bg-gray-800',
						'h-full _w-full py-2.5 px-12 _min-h-64',
						'cursor-pointer',
						'hover:border-gray-500',
						'_focus:border-pink-300',
						'_focus-within:border-pink-300',
						'transform transition'
					]"
				>
					<div class="flex items-center space-x-2 text-center">
						<svg
							class="mx-auto text-gray-400 h-6 w-6"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<div class="flex">
							<div class="relative transition text-sm font-medium text-gray-400 group-hover:text-gray-300 rounded-md cursor-pointer hover:text-pink-400 focus-within:outline-none">
								<span>Upload a file</span>
								<input id="file-upload" name="file-upload" type="file" class="sr-only" @change="onFileInput" />
							</div>
							<!-- <p class="pl-1">or drag and drop</p> -->
						</div>
					</div>
				</label>

				<!-- Error -->
				<span v-if="errors.fileInput" class="mt-2 text-sm text-red-300" v-text="errors.fileInput"></span>
			</div>
		</section>
	</modal>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { computed, watch } from '@vue/runtime-core'
import { loadFromFile, loadFromUrl, state } from '@/hooks/use-cropper'

const urlInput = ref<string>('')
const errors = reactive({
	urlInput: '',
	fileInput: '',
})

/**
 * The modal is openned if there is no new input request
 * or if the source is empty
 */
const show = computed(() => {
	if (state.inputDialog === undefined) {
		return !state.source
	}

	return state.inputDialog
})

/**
 * Closes the modal only if there is already a source.
 */
const close = () => {
	if (state.source) {
		state.inputDialog = false
	}
}

/**
 * Clears error when needed.
 */
watch([urlInput], () => resetError('url'))

/**
 * Closes the input dialog request when the source changes.
 */
watch(() => state.source, () => {
	if (state.source) {
		state.inputDialog = undefined
	}
})

/**
 * Resets errors.
 */
function resetError(...types: Array<'url' | 'file'>) {
	types.forEach((type) => errors[`${type}Input` as const] = '')
}

/**
 * Displays an error.
 */
function displayError(error: string | string[], type: 'url' | 'file') {
	resetError('file', 'url')

	if (!Array.isArray(error)) {
		error = [error]
	}

	error = error[Math.floor(Math.random() * error.length)]
	errors[`${type}Input` as const] = error ?? ''
}

/**
 * Handles file input.
 */
async function onFileInput(event: Event) {
	const target = event.target as HTMLInputElement
	const file = target.files?.item(0)

	if (!file) {
		return
	}

	loadFromFile(file).catch(() => displayError([
		'Could not load this file, sorry. Do not try later, the same thing will happen.',
		'Seems like this is not a valid file.',
		'Sorry, we are too lazy to open this one.',
		'Is this even a file?',
		'I wish users knew how to use a computer.',
	], 'file'))
}

/**
 * Handles URL input.
 */
async function onUrlInput() {
	loadFromUrl(unref(urlInput)).catch(() => displayError([
		'Could not load this URL, sorry.',
		"No, this won't do.",
		'No, you are not linking to an image.',
		'Is this a URL?',
		'Roses are reds, violets are blue, this URL does not point to an image, thank you.',
	], 'url'))
}
</script>
