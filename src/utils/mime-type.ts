/**
 * Gets the mime type from the given buffer.
 *
 * @see https://norserium.github.io/vue-advanced-cropper/guides/recipes.html#load-image-from-a-disc
 */
export function getMimeTypeFromBuffer(file: ArrayBuffer, fallback?: string) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4)

	let header = ''

	for (let i = 0; i < byteArray.length; i++) {
		header += byteArray[i].toString(16)
	}

	switch (header) {
		case '89504e47':
			return 'image/png'

		case '47494638':
			return 'image/gif'

		case 'ffd8ffe0':
		case 'ffd8ffe1':
		case 'ffd8ffe2':
		case 'ffd8ffe3':
		case 'ffd8ffe8':
			return 'image/jpeg'

		default:
			return fallback
	}
}

/**
 * Gets the mime type from the given blob.
 */
export function getMimeTypeFromBlob(blob: Blob) {
	const mime = blob.type.split(';').shift()

	if (!mime) {
		throw new Error('Unable to find mime type.')
	}

	return mime
}

/**
 * Gets a file extension from the given mime type
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export function getExtensionFromMimeType(type: string): string | never {
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
