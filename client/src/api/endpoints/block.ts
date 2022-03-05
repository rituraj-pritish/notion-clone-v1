import api from '@/api'
import { CREATE_BLOCK } from '@/graphql/blocks'
import { Block } from '@/types/block'

export const createBlock = (data) => {
	return api<Block>(CREATE_BLOCK, {
		createBlockInput: data
	})
}
