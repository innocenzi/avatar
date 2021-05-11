import { get } from '@vueuse/shared'
import { reactive, Ref, ref } from 'vue'
import { CropperElement, CropData, Coordinates, Image } from 'vue-advanced-cropper'
import { getMimeType } from './mime-type'

export const element = ref() as Ref<CropperElement>

export const state = reactive<State>({
})

export interface State {
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
 * Downloads the cropped image.
 */
export async function download() {
	if (!state.crop) {
		return
	}

	const blob = await new Promise((resolve) => get(element)?.getResult().canvas.toBlob((blob) => resolve(blob)))
	const url = URL.createObjectURL(blob)
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
export async function loadFromFile(file: File) {
	// Revokes the previous URL if it exists, for performance reasons.
	if (state.source?.url) {
		URL.revokeObjectURL(state.source.url)
	}

	// Reads the files and gets a blob, type and name.
	const url = URL.createObjectURL(file)
	const reader = new FileReader()
	reader.addEventListener('load', () => {
		if (!reader.result) {
			return
		}

		state.source = {
			url,
			name: file.name,
			type: getMimeType(reader.result as ArrayBuffer, file.type),
		}
	})

	reader.readAsArrayBuffer(file)
}

/**
 * Loads an image from an URL.
 */
export async function loadFromUrl(url: string) {
	const mimeTypeFromBlob = (blob: Blob) => {
		const mime = blob.type.split(';').shift()

		if (!mime) {
			throw new Error('Unable to find mime type.')
		}

		return mime
	}

	/**
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
	 */
	const extensionFromMimeType = (type: string): string | never => {
		switch (type) {
			case 'image/gif':
			case 'image/bmp':
			case 'image/jpeg':
			case 'image/png':
			case 'image/tiff':
			case 'image/webp':
				return type.split('/').pop()!

			case 'image/vnd.microsoft.icon':
				return 'ico'

			case 'image/svg+xml':
				return 'svg'

			default:
				throw new Error(`Unsupported mime type: ${type}`)
		}
	}

	const file = await fetch(url)
		.then((response) => response.blob())
		.then((blob) => {
			const type = mimeTypeFromBlob(blob)
			const fileName = new URL(url).pathname.split('/').pop() || `cropped.${extensionFromMimeType(type)}`

			return new File([blob], fileName, { type })
		})

	return loadFromFile(file)
}
