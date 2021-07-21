import { reactive } from 'vue'
import { CropData } from 'vue-advanced-cropper'

export const state = reactive<State>({
	loading: false,
})

export interface State {
	loading: boolean
	inputDialog?: boolean

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
