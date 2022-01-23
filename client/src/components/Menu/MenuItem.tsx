import React, { HTMLAttributes } from 'react'

import usePopover from '@/atoms/Popover/usePopover'

import { MenuItemWrapper } from './Menu.styles'

interface Props extends HTMLAttributes<HTMLDivElement> {
	icon: React.ReactElement
	children: string | React.ReactChild[]
}

const MenuItem = React.forwardRef(
	({ icon, children, ...props }: Props, ref: React.Ref<HTMLDivElement>) => {
		const { close } = usePopover()

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			if (typeof props.onClick === 'function') {
				props.onClick(e)
			}
			close()
		}

		return (
			<MenuItemWrapper {...props} onClick={handleClick} ref={ref}>
				{icon}
				{children}
			</MenuItemWrapper>
		)
	}
)

export default MenuItem
