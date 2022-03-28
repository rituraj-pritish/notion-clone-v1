import React from 'react'
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import { GrDrag } from 'react-icons/gr'
import { IoTrashOutline } from 'react-icons/io5'
import { useMutation } from 'react-query'

import { deleteBlock } from '@/api/endpoints'
import { IconButton, Popover, Space, Tooltip } from '@/atoms'
import { Menu } from '@/components'
import queryClient from '@/core/queryClient'
import CreatedAndEditedMenuItem from '@/shared/CreatedAndEditedMenuItem'
import { Block } from '@/types/block'
import { Page } from '@/types/page'

import { MenuWrapper, RootWrapper } from './Block.styles'

interface Props extends Block {
	children: React.ReactElement
	page: Page
	dragHandleProps: DraggableProvidedDragHandleProps
}

const BlockWrapper = ({
	page,
	id,
	children,
	lastEdited,
	created,
	dragHandleProps
}: Props) => {
	const { mutateAsync: deleteMutation } = useMutation(() => deleteBlock(id), {
		onSuccess: () => {
			queryClient.setQueryData<Block[]>([page.id, 'blocks'], (prevData) =>
				prevData!.filter((block) => block.id !== id)
			)
		}
	})

	const tooltip = (
		<>
			Drag <Tooltip.SubText inline>to move</Tooltip.SubText><br/>
			Click <Tooltip.SubText inline>to open menu</Tooltip.SubText>
		</>
	)

	return (
		<RootWrapper>
			<MenuWrapper>
				<Menu
					trigger={
						<Popover.Trigger >
							<IconButton
								size='small'
								tooltip={tooltip}
								data-testid='menu-trigger'
								{...dragHandleProps}
							>
								<GrDrag />
							</IconButton>
						</Popover.Trigger>
					}
				>
					<Menu.MenuItem icon={<IoTrashOutline />} onClick={deleteMutation}>
						Delete
					</Menu.MenuItem>
					<CreatedAndEditedMenuItem created={created} lastEdited={lastEdited} />
				</Menu>
			</MenuWrapper>
			<Space />
			{children}
		</RootWrapper>
	)
}

export default BlockWrapper
