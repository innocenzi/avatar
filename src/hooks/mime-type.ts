/**
 * Gets the mime type from the given buffer.
 *
 * @see https://norserium.github.io/vue-advanced-cropper/guides/recipes.html#load-image-from-a-disc
 */
export function getMimeType(file: ArrayBuffer, fallback?: string) {
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
