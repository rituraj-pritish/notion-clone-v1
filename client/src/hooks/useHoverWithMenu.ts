import React, { useState } from 'react'

export default (): [
	boolean,
	{
		onMouseLeave: VoidFunction
		onMouseEnter: VoidFunction
	},
	{
		visible: boolean
		onClickOutside: VoidFunction
	},
	VoidFunction
] => {
	const [isVisible, setIsVisible] = useState(false)
	const [isHovering, setIsHovering] = useState(false)

	const props = React.useMemo(
		() => ({
			onMouseEnter: () => setIsHovering(true),
			onMouseLeave: () => {
				if(isVisible) return
				setIsVisible(false)
				setIsHovering(false)
			}
		}),
		[isVisible]
	)

	const menuProps = React.useMemo(() => ({
		visible: isVisible,
		onClickOutside: () => {
			setIsVisible(false)
			setIsHovering(false)
		}
	}), [isVisible])

	// eslint-disable-next-line
	return React.useMemo(() => 
		[
			isHovering, 
			props, 
			menuProps, 
			() => setIsVisible(true)
		]
	,[isHovering, props, menuProps])
}
