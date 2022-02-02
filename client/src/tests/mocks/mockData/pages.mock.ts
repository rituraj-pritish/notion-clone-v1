import { Page } from '@/types/page'

const MOCK_USER = {
	name: 'Shubham',
	id: 'abalsdjf',
	email: 'ab@gmail.com'
}

export const PRIVATE_PAGES: Partial<Page>[] = [
	{
		id: 'p1',
		properties: {
			title: 'P Page 1',
		},
		favorite: false,
		hierarchy: {
			root: null,
			parent: null,
			children: ['p-level-1']
		},
		created: {
			user: MOCK_USER,
			time: '2022-01-11T16:39:35.739+00:00',
		}
	},
	{
		id: 'p2',
		properties: {
			title: 'P Page 2',
		},
		favorite: false,
		hierarchy: {
			root: null,
			parent: null,
			children: []
		},
		created: {
			user: MOCK_USER,
			time: '2022-01-11T16:39:35.739+00:00',
		},
	}
]

export const FAVORITE_PAGES: Partial<Page>[] = [
	{
		id: 'f1',
		properties: {
			title: 'F Page 1',
		},
		favorite: true,
		hierarchy: {
			root: null,
			parent: null,
			children: []
		},
		created: {
			user: MOCK_USER,
			time: '2022-01-11T16:39:35.739+00:00',
		},
	}
]

export const NESTED_PAGES: Partial<Page>[] = [
	{
		id: 'p-level-1',
		properties: {
			title: 'P level 1',
		},
		favorite: false,
		hierarchy: {
			root: 'pp1',
			parent: 'pp1',
			children: []
		},
		created: {
			user: MOCK_USER,
			time: '2022-01-11T16:39:35.739+00:00',
		}
	}
]
