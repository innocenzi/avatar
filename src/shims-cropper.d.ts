declare module 'vue-advanced-cropper' {
	import { Component } from 'vue'

	export interface Flip {
		vertical: boolean
		horizontal: boolean
	}

	export interface Transforms {
		rotate: number
		scaleX: number
		scaleY: number
		translateX: number
		translateY: number
		flip: Flip
	}

	export interface Coordinates {
		width: number
		height: number
		left: number
		top: number
	}

	export interface Image {
		src: string
		width: number
		height: number
		transforms: Transforms
	}

	export type CropData = {
		coordinates: Coordinates
		canvas: HTMLCanvasElement
		image: Image
		imageTransforms: Transforms
		visibleArea: Coordinates
	}

	export type CropperElement = Component & {
		customImageTransforms: Transforms
		zoom: (quantity: number) => void
		move: (x: number, y: number) => void
		rotate: (degrees: number) => void
		flip: (horizontal: boolean, vertical: boolean) => void
		getResult: () => {
			canvas: HTMLCanvasElement
		}
	}

	export const Cropper: CropperElement
	export const Preview: Component
}
