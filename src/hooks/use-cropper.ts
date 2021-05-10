import { reactive } from 'vue-demi'

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

export const state = reactive<State>({
	originalImage: '',
	result: undefined,
	stencil: 'circle-stencil',
})
