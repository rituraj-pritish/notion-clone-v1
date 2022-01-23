import React, { ButtonHTMLAttributes } from 'react'

import { Tooltip } from '@/atoms'

import { StyledButton } from './IconButton.styles'

export type Size = 'small' | 'medium'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	size?: Size
	tooltip?: string | React.ReactElement
	bordered?: boolean
}

const IconButton = React.forwardRef(
	(
		{
			children,
			size = 'medium',
			tooltip,
			onClick,
			bordered = false,
			...otherProps
		}: Props,
		ref: React.Ref<HTMLButtonElement>
	): JSX.Element => {
		const iconButton = (
			<StyledButton
				size={size}
				isEmoji={typeof children === 'string'}
				bordered={bordered}
				onClick={(e) => {
					e.stopPropagation()
					if (onClick) onClick(e)
				}}
				ref={ref}
				{...otherProps}
			>
				{children}
			</StyledButton>
		)

		if (tooltip)
			return (
				<Tooltip overlay={tooltip} placement='bottom'>
					{iconButton}
				</Tooltip>
			)

		return iconButton
	}
)

export default IconButton
