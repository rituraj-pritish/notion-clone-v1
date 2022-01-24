import { createState, useState } from '@hookstate/core'
import React, { useEffect } from 'react'

const WIDTH_KEY = 'sidebar-width'

interface State {
	isCollapsed: boolean
	width: number
	isHovering: boolean
}

const INITIAL_STATE = {
	isCollapsed: false,
	width: 200,
	isHovering: false
}

const COLLAPSED_STATE = createState<State>(INITIAL_STATE)

export default () => {
	const sidebarState = useState(COLLAPSED_STATE)

	useEffect(() => {
		const width = localStorage.getItem(WIDTH_KEY)
		if (width) setWidth(Number(width))
		// eslint-disable-next-line
	}, [])

	const toggleCollapsed = () =>
		sidebarState.set((state) => ({
			...state,
			isCollapsed: !state.isCollapsed
		}))

	const setIsHovering = (newHoverState: boolean) =>
		sidebarState.set((state) => ({
			...state,
			isHovering: newHoverState
		}))

	const setWidth = (newWidth: number) => {
		localStorage.setItem(WIDTH_KEY, newWidth.toString())

		sidebarState.set((state) => ({
			...state,
			width: newWidth
		}))
	}

	return React.useMemo(
		() => ({
			...sidebarState.get(),
			toggleCollapsed,
			setIsHovering,
			setWidth
			// eslint-disable-next-line
		}),
		[sidebarState]
	)
}
