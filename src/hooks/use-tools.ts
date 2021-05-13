import tinykeys from 'tinykeys'
import { download, zoom, rotate, flip, transform } from './use-cropper'
import { show } from './use-image-form'

export interface Tool {
	action: (event?: KeyboardEvent) => void
	description: string
	icon?: string
	keybinding?: string
	documented?: boolean
	primary?: string
}

export interface ToolbarGroup {
	name?: string
	actions: Tool[]
}

export const toolbar: ToolbarGroup[] = [
	{
		name: 'Rotation',
		actions: [
			{ keybinding: 'Alt+Shift+ArrowLeft', description: 'Rotate counter-clockwise', icon: 'mdi:rotate-left', action: () => rotate(-90) },
			{ keybinding: 'Alt+Shift+ArrowRight', description: 'Rotate clockwise', icon: 'mdi:rotate-right', action: () => rotate(90) },
		],
	},
	{
		name: 'Flip',
		actions: [
			{ keybinding: 'Alt+ArrowLeft', description: 'Flip the base image horizontally', icon: 'mdi:flip-horizontal', action: () => flip('horizontal') },
			{ keybinding: 'Alt+ArrowRight', description: 'Flip the base image horizontally', icon: 'mdi:flip-horizontal', action: () => flip('horizontal') },
			{ keybinding: 'Alt+ArrowUp', description: 'Flip the base image vertically', icon: 'mdi:flip-vertical', action: () => flip('vertical') },
			{ keybinding: 'Alt+ArrowDown', description: 'Flip the base image vertically', icon: 'mdi:flip-vertical', action: () => flip('vertical') },
		],
	},
	{
		name: 'Zoom',
		actions: [
			{ keybinding: 'Shift+Minus', description: 'Zoom out the base image', icon: 'mdi:magnify-minus-outline', action: () => zoom('out') },
			{ keybinding: 'Shift+Plus', description: 'Zoom in the base image', icon: 'mdi:magnify-plus-outline', action: () => zoom('in') },
		],
	},
	{
		name: 'Position',
		actions: [
			{ keybinding: 'Shift+m', description: 'Maximize the crop area', icon: 'mdi:arrow-expand-all', action: () => transform('maximize') },
			{ keybinding: 'Shift+c', description: 'Center the crop area', icon: 'mdi:image-filter-center-focus', action: () => transform('center') },
			{ keybinding: 'Shift+r', description: 'Reset to initial state', icon: 'mdi:backup-restore', action: () => transform('reset') },
		],
	},
	{
		actions: [
			{ keybinding: 'Shift+o', description: 'Open an image', icon: 'mdi:folder-open-outline', primary: '', action: () => show() },
			{ keybinding: 'Shift+s', description: 'Download the current crop', icon: 'uil:save', primary: 'Download', action: () => download() },
		],
	},
]

export function useShortcuts() {
	const shortcuts = Object.fromEntries(toolbar
		.flatMap(({ actions }) => actions)
		.filter(({ documented, keybinding }) => documented !== false && keybinding)
		.map(({ keybinding, action }) => ([
			keybinding,
			(e: KeyboardEvent) => {
				e.preventDefault()
				e.stopPropagation()
				action(e)
			},
		])))

	return tinykeys(window, {
		...shortcuts,
		'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A': () => document.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	})
}
