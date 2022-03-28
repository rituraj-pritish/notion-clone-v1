import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useMutation, useQuery } from 'react-query'

import {
	createBlock,
	CreateBlockInput,
	getBlocks,
	updateBlock,
	UpdateBlockInput
} from '@/api/endpoints'
import { Text } from '@/atoms'
import queryClient from '@/core/queryClient'
import useKeyPress from '@/hooks/useKeyPress'
import { Block as BlockType } from '@/types/block'
import { Page } from '@/types/page'

import Block from '../Block'

interface Props {
	page: Page
}

const Blocks = ({ page }: Props) => {
	const [blocks, setBlocks] = useState<BlockType[] | undefined>([])
	const { data } = useQuery([page.id, 'blocks'], () => getBlocks(page.id))

	useEffect(() => {
		if (data) setBlocks(data)
	}, [data])

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
	const { mutateAsync: updateBlockMutation } = useMutation<
		BlockType,
		unknown,
		UpdateBlockInput
	>((values) => updateBlock(values), {
		// onSuccess: (updatedBlock) => {
		// 	queryClient.setQueryData([page.id, 'blocks'], (prevData) =>
		// 		[
		// 			...prevData.filter(({ id }) => id !== updatedBlock.id),
		// 			updatedBlock
		// 		].sort((a, b) => a.order - b.order)
		// 	)
		// }
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

	if (!blocks) return null

	return (
		<DragDropContext
			onDragEnd={({ destination, source, draggableId }) => {
				if (!destination || !source) return
				let nextOrder = 0
				let prevOrder = 0
				if (source.index < destination.index) {
					prevOrder = blocks[destination.index].order
					nextOrder =
						destination.index < blocks.length - 1
							? blocks[destination.index + 1].order
							: (blocks.length + 1) * 100
				} else {
					prevOrder =
						destination.index >= 1 ? blocks[destination.index - 1].order : 0
					nextOrder = blocks[destination.index].order
				}
				const newOrder = (prevOrder + nextOrder) / 2
				setBlocks((prevBlocks) =>
					prevBlocks
						?.map((block) => ({
							...block,
							order: block.id === draggableId ? newOrder : block.order
						}))
						.sort((a, b) => a.order - b.order)
				)

				updateBlockMutation({
					id: draggableId,
					order: newOrder
				})
			}}
		>
			{data && data.length === 0 && (
				<Text size='medium'>Press Enter to continue with an empty page</Text>
			)}
			<Droppable droppableId={page.id}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{blocks?.map((block, idx) => {
							const nextBlock = blocks[idx + 1]
							return (
								<Draggable draggableId={block.id} index={idx} key={block.id}>
									{(provided) => (
										<div {...provided.draggableProps} ref={provided.innerRef}>
											<Block
												{...block}
												dragHandleProps={provided.dragHandleProps}
												newOrder={
													nextBlock
														? (block.order + nextBlock.order) / 2
														: block.order + 100
												}
												page={page}
											/>
										</div>
									)}
								</Draggable>
							)
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default Blocks
