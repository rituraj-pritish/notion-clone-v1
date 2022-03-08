import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { useMutation } from 'react-query'

import { deleteBlock } from '@/api/endpoints'
import { Space } from '@/atoms'
import { Menu } from '@/components'
import queryClient from '@/core/queryClient'
import CreatedAndEditedMenuItem from '@/shared/CreatedAndEditedMenuItem'
import { Block } from '@/types/block'
import { Page } from '@/types/page'

import { MenuWrapper, RootWrapper } from './Block.styles'

interface Props extends Block {
	children: React.ReactElement
	page: Page
}

const BlockWrapper = ({ page, id, children, lastEdited, created }: Props) => {
	const { mutateAsync: deleteMutation } = useMutation(() => deleteBlock(id), {
		onSuccess: () => {
			queryClient.setQueryData<Block[]>([page.id, 'blocks'], (prevData) =>
				prevData!.filter((block) => block.id !== id)
			)
		}
	})

	return (
		<RootWrapper>
			<MenuWrapper>
				<Menu>
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
