import { gql } from 'graphql-request'

import { BLOCK_FRAGMENT } from './fragments'

export const GET_BLOCKS = gql`
	${BLOCK_FRAGMENT}
	query GetBlocks($id: String!) {
		getBlocks(id: $id) {
			...blockFragment
		}
	}
`
