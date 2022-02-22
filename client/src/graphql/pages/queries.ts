import { gql } from 'graphql-request'

import { PAGE_FRAGMENT } from '.'

export const GET_PAGES = gql`
	${PAGE_FRAGMENT}
	query GetPages($ids: String!) {
		getPages(ids: $ids) {
			...pageFragment
		}
	}
`

export const GET_PAGE = gql`
	query GetPage($id: String!) {
		getPage(id: $id) {
			ancestry {
				id
				title
				icon {
			... on Emoji {
				type
				emoji
			}

			... on File {
				type
				url
			}
		}
			}
			id
		properties {
			title
		}
		hierarchy {
			parent
			root
			children
		}
		icon {
			... on Emoji {
				type
				emoji
			}

			... on File {
				type
				url
			}
		}
		favorite
		archived
		lastEdited {
			user {
				name
			}
			time
		}
		created {
			user {
				name
			}
			time
		}
		}
	}
`
