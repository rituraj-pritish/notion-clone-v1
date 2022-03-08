import api from '@/api'
import { CREATE_BLOCK, DELETE_BLOCK, UPDATE_BLOCK } from '@/graphql/blocks'
import { GET_BLOCKS } from '@/graphql/blocks/queries'
import { Block } from '@/types/block'

export type CreateBlockInput = Pick<
	Block,
	'object' | 'order' | 'parent' | 'type'
>
export const createBlock = (data: CreateBlockInput) => {
	return api<Block>(CREATE_BLOCK, {
		createBlockInput: data
	})
}

export type UpdateBlockInput = Partial<Block> & Pick<Block, 'id'>
export const updateBlock = (data: UpdateBlockInput) => {
	return api<Block>(UPDATE_BLOCK, {
		updateBlockInput: data
	})
}

export const getBlocks = (pageId: string) => {
	return api<Block[]>(GET_BLOCKS, {
		id: pageId
	})
}

export const deleteBlock = (blockId: string) => {
	return api<boolean>(DELETE_BLOCK, {
		id: blockId
	})
}
