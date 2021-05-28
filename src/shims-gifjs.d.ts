export {}
declare global {
	interface GifOptions {
		workerScript?: string
		workers?: number
		quality?: number
		debug?: boolean
		width?: number
		height?: number
	}

	interface FrameOptions {
		delay?: number
		copy?: boolean
		dispose?: number
	}

	class GIF {
		constructor(options?: GifOptions)
		addFrame(element: HTMLCanvasElement | CanvasRenderingContext2D | HTMLImageElement, options?: FrameOptions): void
		on(event: 'finished', callback: ((blob: Blob) => void)): void
		render(): void
		abort(): void
		freeWorkers: Worker[]
	}

	interface Window {
		GIF: GIF
	}
}
