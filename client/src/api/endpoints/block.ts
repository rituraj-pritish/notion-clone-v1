import api from '@/api'
import { CREATE_BLOCK, UPDATE_BLOCK } from '@/graphql/blocks'
import { GET_BLOCKS } from '@/graphql/blocks/queries'
import { Block } from '@/types/block'

export const createBlock = (data) => {
	return api<Block>(CREATE_BLOCK, {
		createBlockInput: data
	})
}

export const updateBlock = (data) => {
	return api<Block>(UPDATE_BLOCK, {
		updateBlockInput: data
	})
}

export const getBlocks = (pageId: string) => {
	return api<Block[]>(GET_BLOCKS, {
		id: pageId
	})
}