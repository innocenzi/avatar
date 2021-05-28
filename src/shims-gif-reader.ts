declare module '*/gif-reader.js' {
	interface Frame {
		data_length: number
		data_offset: number
		delay: number
		disposal: number
		has_local_palette: boolean
		height: number
		width: number
		interlace: boolean
		palette_offset: number
		palette_size: number
		pixels: Uint8ClampedArray
		transparent_index: any
		x: number
		y: number
	}

	class GifReader {
		constructor(buffer: Uint8Array, width?: number, height?: number, opts?: any)
		numFrames(): number
		frameInfo(index: number): Frame
		width: number
		height: number
		loopCount(): number
		decodeAndBlitFrameRGBA(index: number, pixels: Uint8ClampedArray): void
		decodeAndBlitFrameBGRA(index: number, pixels: Uint8ClampedArray): void
	}

	export { Frame, GifReader }
}
