import { gql } from 'graphql-request'

import { PAGE_FRAGMENT } from '.'

export const CREATE_PAGE = gql`
	${PAGE_FRAGMENT}
	mutation CreatePage($createPageInput: CreatePageInput!) {
		createPage(createPageInput: $createPageInput) {
			...pageFragment
		}
	}
`

export const UPDATE_PAGE = gql`
	${PAGE_FRAGMENT}
	mutation UpdatePage($updatePageInput: UpdatePageInput!) {
		updatePage(updatePageInput: $updatePageInput) {
			...pageFragment
		}
	}
`

export const DELETE_PAGE = gql`
	${PAGE_FRAGMENT}
	mutation DeletePage($id: String!) {
		deletePage(id: $id) {
			...pageFragment
		}
	}
`
