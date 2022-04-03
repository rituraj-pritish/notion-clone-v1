import React, { useEffect, useRef, useState } from 'react'

interface Params {
	onShow?: VoidFunction
	onHide?: VoidFunction
	hideOnMouseLeave?: boolean
}

export default (
	params?: Params
): [
	boolean,
	{
		onMouseLeave: VoidFunction
		onMouseEnter: VoidFunction
	}
] => {
	const initialRender = useRef(true)
	const [isVisible, setIsVisible] = useState(false)
	const [isHovering, setIsHovering] = useState(false)

	useEffect(() => {
		if (!params) return

		if (isHovering) {
			if (initialRender.current) {
				initialRender.current = false
				return
			}
			params.onShow && params.onShow()
		} else {
			if (initialRender.current) return
			params.onHide && params.onHide()
		}
	}, [isHovering, params])

	const props = React.useMemo(
		() => ({
			onMouseEnter: () => setIsHovering(true),
			onMouseLeave: () => {
				if(params?.hideOnMouseLeave === false) return
				setIsHovering(false)
			}
		}),
		[params?.hideOnMouseLeave]
	)

	const menuProps = React.useMemo(() => ({
		isVisible,
		onClickOutside: () => {
			setIsVisible(false)
			setIsHovering(false)
		}
	}), [])

	// eslint-disable-next-line
	return React.useMemo(() => [isHovering, props, menuProps, () => setIsHovering(true)], [isHovering, props])
}
