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

	export type CoordinateSetterCallbackParameters = {
		imageSize: { width: number; height: number }
		visibleArea: Coordinates
		coordinates: Coordinates
	}

	export type CoordinateSetterCallback = (args: CoordinateSetterCallbackParameters) => Partial<Coordinates>
	export type CoordinateSetter = (param: Coordinates | Coordinates[] | CoordinateSetterCallback | CoordinateSetterCallback[]) => void

	export type CropperElement = Component & {
		coordinates: Coordinates
		customImageTransforms: Transforms
		setCoordinates: CoordinateSetter
		refresh: () => void
		reset: () => void
		zoom: (quantity: number, center?: Pick<Coordinates, 'left' | 'top'>) => void
		move: (left: number, top: number) => void
		rotate: (angle: number) => void
		flip: (horizontal: boolean, vertical: boolean) => void
		getResult: () => {
			coordinates: Coordinates
			imageTransforms: Transforms
			visibleArea: Coordinates
			canvas: HTMLCanvasElement
		}
	}

	export const Cropper: CropperElement
	export const Preview: Component
}
