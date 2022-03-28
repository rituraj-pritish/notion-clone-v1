import React from 'react'
import { IoEllipsisHorizontal } from 'react-icons/io5'

import { Flex, IconButton, Popover } from '@/atoms'
import { PopoverProps } from '@/atoms/Popover/Popover'

import MenuItem from './MenuItem'

interface Props extends Omit<PopoverProps, 'trigger' | 'ref' | 'children'> {
	trigger?: React.ReactElement
	tooltip?: string | React.ReactElement
	ref?: React.Ref<React.ElementRef<typeof Popover>>
	children: React.ReactElement[]
}

const Menu = ({ children, trigger, tooltip, ...props }: Props) => {
	return (
		<Popover {...props}>
			{trigger || (
				<Popover.Trigger>
					<IconButton size='small' tooltip={tooltip} data-testid='menu-trigger'>
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

Menu.Trigger = Popover.Trigger
Menu.MenuItem = MenuItem

export default Menu
