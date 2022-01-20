import { Page } from '@/types/page';

export const PRIVATE_PAGES: Page[] = [
	{
		id: 'p1',
		name: 'P Page 1',
		favorite: false,
		hierarchy: {
			root: null,
			parent: null,
			children: ['p-level-1']
		},
		createdAt: '2022-01-11T16:39:35.739+00:00',
		updatedAt: '2022-01-11T16:39:35.739+00:00',
		deletedAt: null
	},
	{
		id: 'p2',
		name: 'P Page 2',
		favorite: false,
		hierarchy: {
			root: null,
			parent: null,
			children: []
		},
		createdAt: '2022-01-11T16:39:35.739+00:00',
		updatedAt: '2022-01-11T16:39:35.739+00:00',
		deletedAt: null
	}
];

export const FAVORITE_PAGES: Page[] = [
	{
		id: 'f1',
		name: 'F Page 1',
		favorite: true,
		hierarchy: {
			root: null,
			parent: null,
			children: []
		},
		createdAt: '2022-01-11T16:39:35.739+00:00',
		updatedAt: '2022-01-11T16:39:35.739+00:00',
		deletedAt: null
	}
];

export const NESTED_PAGES = [
	{
		id: 'p-level-1',
		name: 'P level 1',
		favorite: false,
		hierarchy: {
			root: 'pp1',
			parent: 'pp1',
			children: []
		},
		createdAt: '2022-01-11T16:39:35.739+00:00',
		updatedAt: '2022-01-11T16:39:35.739+00:00',
		deletedAt: null
	}
];