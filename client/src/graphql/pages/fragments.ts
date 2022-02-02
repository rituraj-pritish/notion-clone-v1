import { gql } from 'graphql-request'

export const PAGE_FRAGMENT = gql`
	fragment pageFragment on Page {
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
`
