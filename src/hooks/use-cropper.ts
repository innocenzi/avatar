import { get } from '@vueuse/shared'
import { reactive, ref, toRaw } from 'vue'
import { CropperElement } from 'vue-advanced-cropper'

export const element = ref<CropperElement>()

export interface Coordinates {
	width: number
	height: number
	left: number
	top: number
}

export interface State {
	originalImage: string
	result?: {
		base64?: string,
		image: string,
		coordinates: Coordinates
	}
	stencil: 'circle-stencil'
}

/**
 * Rotates the image.
 */
export function rotate(angle: number) {
	get(element)?.rotate(angle)
}

/**
 * Zooms the image.
 */
export function zoom(mode: 'in' | 'out') {
	get(element)?.zoom(mode === 'in' ? 1.25 : .75)
}

/**
 * Flips the image.
 */
export function flip(mode: 'horizontal' | 'vertical') {
	let horizontal = mode === 'horizontal' ? true : false
	let vertical = mode === 'vertical' ? true : false

	if (get(element)?.customImageTransforms.rotate! % 180 !== 0) {
		horizontal = !horizontal
		vertical = !vertical
	}

	get(element)?.flip(horizontal, vertical)
}

export const state = reactive<State>({
	originalImage: '',
	result: undefined,
	stencil: 'circle-stencil',
})
