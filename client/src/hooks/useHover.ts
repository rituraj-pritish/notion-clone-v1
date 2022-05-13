import React, { useEffect, useRef, useState } from 'react'

interface Params {
	onShow?: VoidFunction
	onHide?: VoidFunction
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
			onMouseLeave: () => setIsHovering(false)
		}),
		[]
	)

	// eslint-disable-next-line
	return React.useMemo(() => [isHovering, props], [isHovering, props])
}
