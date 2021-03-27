<template>
	<section class="flex flex-col items-center justify-center w-full h-full">
		<!-- Dotted box -->
		<div class="flex flex-col w-full max-w-lg">
			<!-- Input -->
			<label
				for="file-upload"
				:class="[
					'flex items-center justify-center',
					'border-dashed rounded border-gray-600 border-3 shadow-xl bg-gray-800',
					'h-full w-full p-6 min-h-64',
					'cursor-pointer',
					'hover:border-gray-500',
					'focus:border-blue-300',
					'focus-within:border-blue-300',
					'transform transition hover:-translate-y-1'
				]"
			>
				<div class="space-y-2 text-center">
					<svg
						class="mx-auto text-gray-400 h-14 w-14"
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
						<div
							class="relative font-medium text-blue-300 rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none"
						>
							<span>Upload a file</span>
							<input @change="onFileInput" id="file-upload" name="file-upload" type="file" class="sr-only" />
						</div>
						<p class="pl-1">or drag and drop</p>
					</div>
				</div>
			</label>

			<!-- Error -->
			<span v-if="errors.fileInput" class="mt-2 text-sm text-red-300" v-text="errors.fileInput"></span>
		</div>

		<span class="my-6 text-gray-400">or</span>

		<!-- Manual link -->
		<div class="flex flex-col w-full max-w-lg">
			<label for="url" class="block text-sm font-medium text-gray-700 sr-only">Manual URL</label>
			<!-- Wrapper -->
			<div class="flex mt-1 rounded-md shadow-sm">
				<!-- Input -->
				<div
					class="relative z-10 flex items-stretch flex-grow"
					:class="errors.urlInput ? 'z-10' : ''"
				>
					<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<icon-link class="w-5 h-5 text-gray-400" />
					</div>
					<input
						v-model="urlInput"
						type="text"
						name="url"
						id="url"
						placeholder="https://"
						:class="[
							'block w-full pl-10 transition rounded-none rounded-l-md',
							'bg-gray-800 border-gray-700',
							'focus:outline-none ',
							'sm:text-sm',
							errors.urlInput
								? 'ring-red-300 border-red-300 focus:ring-red-300 focus:border-red-300'
								: 'focus:ring-blue-300 focus:border-blue-300'
						]"
					/>
				</div>

				<!-- Upload button -->
				<button
					@click="onUrlInput"
					class="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium text-gray-300 transition bg-gray-800 border border-l-0 border-gray-700 focus:border-l rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 hover:z-20 focus:z-20"
				>
					<icon-upload class="w-5 h-5 text-gray-400" />
					<span>Use</span>
				</button>
			</div>

			<!-- Error -->
			<span v-if="errors.urlInput" class="mt-2 text-sm text-red-300" v-text="errors.urlInput"></span>
		</div>
	</section>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"
import { originalImage } from "../hooks/useCropper";

const urlInput = ref<string>('')
const errors = reactive({
	urlInput: '',
	fileInput: ''
})

/**
 * Clears error when needed.
 */
watch([urlInput], () => resetError('url'))

/**
 * Sets the image to crop. Either base64 or plain URL.
 */
function setImage(image: string) {
	originalImage.value = image
}

/**
 * Resets errors.
 */
function resetError(...types: Array<'url' | 'file'>) {
	types.forEach(type => errors[`${type}Input` as const] = '')
}

/**
 * Displays an error.
 */
function displayError(error: string, type: 'url' | 'file') {
	resetError('file', 'url')
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

	if (!file.type.startsWith('image/')) {
		displayError('Only images are supported. What in the world did you intend to crop?', 'file')
		return
	}

	const base64 = await new Promise<string | false>((resolve) => {
		const reader = new FileReader();
		reader.addEventListener('load', (event) => resolve(event.target?.result as string))
		reader.addEventListener('error', () => resolve(false))
		reader.readAsDataURL(file);
	})

	if (!base64) {
		displayError('Not sure what you linked too, but we can not read that.', 'file')
		return
	}
	
	setImage(base64)
}

/**
 * Handles URL input.
 */
async function onUrlInput() {
	const url = unref(urlInput)

	if (url.length === 0) {
		displayError('Please enter a valid URL.', 'url')
		return
	}

	const couldRead = await new Promise<boolean>((resolve) => {
			const temporaryImage = new Image()
			temporaryImage.addEventListener('error', () => resolve(false))
			temporaryImage.addEventListener('load', () => resolve(true))
			temporaryImage.src = url
	})

	if (!couldRead) {
		displayError('Not sure what you linked too, but we can not read that.', 'url')
		return
	}

	setImage(url)
}
</script>
