import { useLocalStorage } from '@vueuse/core'
import { get, set, useDebounceFn } from '@vueuse/shared'
import { reactive, Ref, ref } from 'vue'
import { CropperElement, CropData } from 'vue-advanced-cropper'
import { getMimeTypeFromBuffer, getMimeTypeFromBlob, getExtensionFromMimeType } from '../utils/mime-type'
import { GifReader } from '../libs/gif-reader.js'
import type { Frame } from '../libs/gif-reader.js'

export const element = ref() as Ref<CropperElement>

export const queryUrl = new URLSearchParams(window.location.search).get('url')
export const sourceUrl = useLocalStorage<string>('source-url', null)
export const state = reactive<State>({
	loading: false,
})

export interface State {
	loading: boolean
	inputDialog?: boolean

	source?: {
		/**
		 * Blob URL.
		 */
		url: string

		/**
		 * File name of the source.
		 */
		name: string

		/**
		 * Mime type of the source.
		 */
		type?: string
	}

	/**
	 * Crop data.
	 */
	crop?: CropData
}

/**
 * Rotates the image.
 */
export function rotate(angle: number) {
	get(element).rotate(angle)
}

/**
 * Resets the cropper.
 */
export function reset() {
	get(element).reset()
}

/**
 * Moves the stencil.
 */
export function transform(mode: 'center' | 'maximize' | 'reset') {
	if (mode === 'center') {
		get(element).setCoordinates(({ imageSize, coordinates }) => ({
			left: imageSize.width / 2 - coordinates.width / 2,
			top: imageSize.height / 2 - coordinates.height / 2,
		}))
	}

	if (mode === 'maximize') {
		const center = {
			left: get(element).coordinates.left + get(element).coordinates.width / 2,
			top: get(element).coordinates.top + get(element).coordinates.height / 2,
		}

		get(element).setCoordinates([
			({ imageSize }) => ({
				width: imageSize.width,
				height: imageSize.height,
			}),
			({ coordinates }) => ({
				left: center.left - coordinates.width / 2,
				top: center.top - coordinates.height / 2,
			}),
		])
	}

	if (mode === 'reset') {
		reset()
	}
}

/**
 * Zooms the image.
 */
export function zoom(mode: 'in' | 'out') {
	get(element).zoom(mode === 'in' ? 1.25 : 0.75)
}

/**
 * Flips the image.
 */
export function flip(mode: 'horizontal' | 'vertical') {
	let horizontal = mode === 'horizontal'
	let vertical = mode === 'vertical'

	if (get(element).customImageTransforms.rotate % 180 !== 0) {
		horizontal = !horizontal
		vertical = !vertical
	}

	get(element)?.flip(horizontal, vertical)
}

/**
 * Handles a crop event.
 */
export function change(crop: CropData) {
	state.crop = crop
}

/**
 * Handles an error event.
 */
export function error() {
	// TODO - This is fired sometimes for no specific reason
	// A catch would be to store the fact that an error occured,
	// and clear that state when the cropped loaded successfully

	useDebounceFn(() => reset(), 100)
}

/**
 * Gets a single cropped image from the canvas.
 */
export async function getCroppedImage(): Promise<string> {
	if (state.source?.type === 'image/gif') {
		return await getCroppedGIF()
	}

	const blob = await new Promise((resolve) => get(element)?.getResult().canvas.toBlob((blob) => resolve(blob)))

	return URL.createObjectURL(blob)
}

/**
 * Gets a cropped GIF object URL.
 */
export async function getCroppedGIF(): Promise<string> {
	const buffer = await new Promise<Uint8Array>((resolve) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', state.source!.url, true)
		xhr.responseType = 'arraybuffer'
		xhr.addEventListener('load', () => resolve(new Uint8Array(xhr.response)))
		xhr.send()
	})

	const reader = new GifReader(buffer)
	const frames = await Promise.all(Array(reader.numFrames()).fill({}).map((_, i) => {
		return new Promise<Frame>((resolve) => {
			const frame = reader.frameInfo(i)
			frame.pixels = new Uint8ClampedArray(reader.width * reader.height * 4)
			reader.decodeAndBlitFrameBGRA(i, frame.pixels)

			resolve(frame)
		})
	}))

	return new Promise<string>((resolve) => {
		const gif = new GIF({
			workerScript: '/scripts/gif.worker.js',
			workers: 5,
			quality: 1,
			debug: true,
			width: reader.width,
			height: reader.height,
		})

		let i = 0
		for (const frame of frames) {
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')
			canvas.width = frame.width
			canvas.height = frame.height

			if (!context) {
				throw new Error('Could not create context')
			}

			const data = context.createImageData(reader.width, reader.height)
			data.data.set(frame.pixels)

			context.putImageData(data, -frame.x, -frame.y)

			console.log('adding frame', i++)
			document.body.appendChild(canvas)

			gif.addFrame(canvas, { delay: frame.delay })
		}

		gif.on('finished', (blob: Blob) => {
			gif.freeWorkers.forEach((w) => w.terminate())
			gif.abort()
			console.log('end')

			return resolve(URL.createObjectURL(blob))
		})

		gif.render()
	})
}

/**
 * Downloads the cropped image.
 */
export async function download() {
	if (!state.crop) {
		return
	}

	const url = await getCroppedImage()
	const a = document.createElement('a')
	a.href = url
	a.download = state.source?.name.replace('.', '-cropped.') || 'download'

	const clickHandler = () => {
		setTimeout(() => {
			URL.revokeObjectURL(url)
			a.removeEventListener('click', clickHandler)
		}, 150)
	}

	a.addEventListener('click', clickHandler, false)
	a.click()
}

/**
 * Loads an image from a file.
 */
export async function loadFromFile(file: File | null) {
	if (!file) {
		return
	}

	state.loading = true

	// Revokes the previous URL if it exists, for performance reasons.
	if (state.source?.url) {
		URL.revokeObjectURL(state.source.url)
	}

	// Reads the files and gets a blob, type and name.
	const url = URL.createObjectURL(file)
	const reader = new FileReader()

	return new Promise((resolve, reject) => {
		reader.addEventListener('load', () => {
			state.loading = false

			if (!reader.result) {
				return reject(new Error('Could not read the file.'))
			}

			const type = getMimeTypeFromBuffer(reader.result as ArrayBuffer, file.type)
			if (!type?.startsWith('image')) {
				return reject(new Error(`Unsupported mime type: ${type}`))
			}

			state.source = {
				url,
				type,
				name: file.name,
			}

			resolve(true)
		})

		reader.readAsArrayBuffer(file)
	})
}

/**
 * Loads an image from an URL.
 */
export async function loadFromUrl(url: string | null) {
	if (!url) {
		return
	}

	state.loading = true
	const file = await fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const type = getMimeTypeFromBlob(blob)
			const fileName = new URL(url).pathname.split('/').pop() || `cropped.${getExtensionFromMimeType(type)}`
			set(sourceUrl, url)

			return new File([blob], fileName, { type })
		})

	return loadFromFile(file)
}
