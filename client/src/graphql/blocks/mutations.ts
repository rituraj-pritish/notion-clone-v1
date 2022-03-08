import { gql } from 'graphql-request'

import { BLOCK_FRAGMENT } from './fragments'

export const CREATE_BLOCK = gql`
	${BLOCK_FRAGMENT}
	mutation CreateBlock($createBlockInput: CreateBlockInput!) {
		createBlock(createBlockInput: $createBlockInput) {
			...blockFragment
		}
	}
`

export const UPDATE_BLOCK = gql`
	${BLOCK_FRAGMENT}
	mutation UpdateBlock($updateBlockInput: UpdateBlockInput!) {
		updateBlock(updateBlockInput: $updateBlockInput) {
			...blockFragment
		}
	}
`

export const DELETE_BLOCK = gql`
	mutation DeleteBlock($id: String!) {
		deleteBlock(id: $id)
	}
`
