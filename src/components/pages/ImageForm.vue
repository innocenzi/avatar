<template>
	<modal :show="shouldBeShown" @close="close">
		<section class="flex flex-col items-center justify-center w-full max-w-lg pointer-events-auto">
			<img src="/logo.svg" class="w-24 h-24 mb-10" alt="Logo">

			<!-- Image URL -->
			<div class="flex flex-col w-full max-w-lg">
				<label for="url" class="block font-medium text-gray-700 sr-only">Image URL</label>

				<!-- Input wrapper -->
				<div class="flex mt-1 rounded-md shadow-sm">
					<!-- Input -->
					<div class="relative z-10 flex items-stretch flex-grow" :class="errors.url ? 'z-10' : ''">
						<!-- Icon -->
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<icon name="mdi:link-variant" class="w-5 h-5 text-gray-400" />
						</div>

						<!-- Actual input -->
						<input
							id="url"
							v-model="sourceUrl"
							type="text"
							name="url"
							placeholder="https://"
							:class="[
								'block w-full py-2.5 pl-10 transition rounded-none rounded-l-md',
								'bg-gray-800 border-gray-700',
								'focus:outline-none',
								'sm:text-sm',
								errors.url
									? 'ring-red-300 border-red-300 focus:ring-red-300 focus:border-red-300'
									: 'focus:ring-pink-300 focus:border-pink-300'
							]"
							@keypress.enter="onUrlInput"
						/>
					</div>

					<!-- Upload button -->
					<button
						class="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-300 transition bg-gray-800 border border-l-0 border-gray-700 focus:border-l rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:border-pink-300 hover:z-20 focus:z-20"
						@click="onUrlInput"
					>
						<icon name="mdi:arrow-right" class="w-5 h-5 text-gray-400" />
					</button>
				</div>

				<!-- Error -->
				<span v-if="errors.url" class="mt-2 text-sm text-red-300" v-text="errors.url" />
			</div>

			<span class="my-6 text-gray-400">or</span>

			<!-- Upload button -->
			<div class="flex flex-col max-w-lg">
				<!-- Input -->
				<label
					for="file-upload"
					:class="[
						'group flex items-center justify-center',
						'rounded border-gray-700 border shadow-sm bg-gray-800',
						'h-full py-2.5 px-12',
						'cursor-pointer',
						'hover:bg-gray-700',
						'focus-within:ring-2 focus-within:ring-pink-300',
						'transform transition'
					]"
				>
					<div class="flex items-center space-x-2 text-center">
						<icon name="uil:image-upload" class="w-5 h-5 text-gray-500" />
						<div class="flex">
							<div class="relative text-sm font-medium text-gray-400 transition rounded-md cursor-pointer focus-within:outline-none">
								<span>Use a local image</span>
								<input
									id="file-upload"
									name="file-upload"
									accept="image/*"
									type="file"
									class="sr-only"
									@change="onFileInput"
								/>
							</div>
						</div>
					</div>
				</label>

				<!-- Error -->
				<span v-if="errors.file" class="mt-2 text-sm text-red-300" v-text="errors.file"></span>
			</div>
		</section>
	</modal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { onMounted, watch } from '@vue/runtime-core'
import { loadFromFile, loadFromUrl, queryUrl, sourceUrl, state } from '@/hooks/use-cropper'
import { shouldBeShown, close } from '@/hooks/use-image-form'
import { get, set } from '@vueuse/shared'

const errors = reactive({
	url: '',
	file: '',
})

/**
 * When mounted, if there was a source URL in the storage,
 * loads it (as a convenience).
 */
onMounted(async() => {
	if (get(queryUrl)) {
		set(sourceUrl, get(queryUrl))
	}

	if (get(sourceUrl) && !await onUrlInput()) {
		set(sourceUrl, null)
		state.inputDialog = true
	}
})

/**
 * Clears error when needed.
 */
watch([sourceUrl], () => resetError('url'))

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
	types.forEach((type) => errors[type] = '')
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
	errors[type] = error ?? ''

	return false
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
	return loadFromUrl(get(sourceUrl)).catch(() => displayError([
		'Could not load this URL, sorry.',
		"No, this won't do.",
		'No, you are not linking to an image.',
		'Is this a URL?',
		'Roses are reds, violets are blue, this URL does not point to an image, thank you.',
	], 'url'))
}
</script>
