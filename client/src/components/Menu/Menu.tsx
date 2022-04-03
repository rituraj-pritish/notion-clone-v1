import React from 'react'
import { IoEllipsisHorizontal } from 'react-icons/io5'

import { Flex, IconButton, Popover } from '@/atoms'
import { Handle, PopoverProps } from '@/atoms/Popover/Popover'

import MenuItem from './MenuItem'

interface Props extends Omit<PopoverProps, 'trigger' | 'ref' | 'children'> {
	trigger?: React.ReactElement
	tooltip?: string | React.ReactElement
	ref?: React.Ref<React.ElementRef<typeof Popover>>
	children: React.ReactElement[]
}

const Menu = React.forwardRef(
	(
		{ children, trigger, tooltip, ...props }: Props,
		ref?: React.Ref<Handle>
	) => {
		return (
			<Popover {...props} ref={ref}>
				{trigger || (
					<Popover.Trigger>
						<IconButton
							size='small'
							tooltip={tooltip}
							data-testid='menu-trigger'
						>
							<IoEllipsisHorizontal />
						</IconButton>
					</Popover.Trigger>
				)}
				<Popover.Content>
					<Flex flexDirection='column' py='6px'>
						{children}
					</Flex>
				</Popover.Content>
			</Popover>
		)
	}
)

const MenuNamespace = Object.assign(Menu, {
	Trigger: Popover.Trigger,
	MenuItem: MenuItem,
})

export default MenuNamespace