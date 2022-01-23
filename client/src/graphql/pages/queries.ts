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
	${PAGE_FRAGMENT}
	query GetPage($id: String!) {
		getPage(id: $id) {
			...pageFragment
		}
	}
`
