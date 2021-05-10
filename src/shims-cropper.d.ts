declare module 'vue-advanced-cropper' {
	import { Component } from 'vue'

	export type CropperElement = Component & {
		zoom: (quantity: number) => void
		move: (x: number, y: number) => void
		rotate: (degrees: number) => void
		flip: (horizontal: boolean, vertical: boolean) => void
		customImageTransforms: {
			rotate: number
			flip: {
				horizontal: boolean
				vertical: boolean
			}
		}

	}

	export const Cropper: CropperElement
	export const Preview: Component
}
