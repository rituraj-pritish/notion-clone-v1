import React, { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import { createBlock, CreateBlockInput, getBlocks } from '@/api/endpoints'
import { Text } from '@/atoms'
import queryClient from '@/core/queryClient'
import useKeyPress from '@/hooks/useKeyPress'
import { Block as BlockType } from '@/types/block'
import { Page } from '@/types/page'

import Block from '../Block/Block'

interface Props {
	page: Page
}

const Blocks = ({ page }: Props) => {
	const { data } = useQuery([page.id, 'blocks'], () => getBlocks(page.id))

	const { mutateAsync: createBlockMutation } = useMutation<
		BlockType,
		unknown,
		CreateBlockInput
	>((values) => createBlock(values), {
		onSuccess: (data) => {
			queryClient.setQueryData<BlockType[]>([page.id, 'blocks'], (prevData) => [
				...prevData!,
				data
			])
		}
	})
	const isEnterPressed = useKeyPress('Enter')

	useEffect(() => {
		if (isEnterPressed && data && data.length === 0) {
			createBlockMutation({
				parent: {
					type: 'PAGE',
					id: page.id
				},
				order: 100,
				type: 'TEXT',
				object: {
					styles: [],
					text: ''
				}
			})
		}
	}, [isEnterPressed])

	if (!data) return null

	return (
		<div>
			{data && data.length === 0 && (
				<Text size='medium'>Press Enter to continue with an empty page</Text>
			)}
			{data?.map((block, idx) => {
				const nextBlock = data[idx + 1]
				return (
					<Block
						{...block}
						newOrder={
							nextBlock
								? (block.order + nextBlock.order) / 2
								: block.order + 100
						}
						page={page}
						key={block.id}
					/>
				)
			})}
		</div>
	)
}

export default Blocks
