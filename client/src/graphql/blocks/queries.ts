import { gql } from 'graphql-request'

export const GET_BLOCKS = gql`
	query GetBlocks($id: String!) {
		getBlocks(id: $id) {
			id
			index
			parent {
				type
				id
			}
			type
			object {
				text
				styles {
					offset
					length
					style
				}
			}
		}
	}
`
