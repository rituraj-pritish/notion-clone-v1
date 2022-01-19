import { Page } from '@/types/page';

export const PRIVATE_PAGES: Page[] = [
	{
		id: 'pp1',
		name: 'P Page 1',
		favorite: false,
		hierarchy: {
			root: null,
			parent: null,
			children: []
		}
	}
];

export const FAVORITE_PAGES: Page[] = [
	{
		id: 'fp1',
		name: 'F Page 1',
		favorite: true,
		hierarchy: {
			root: null,
			parent: null,
			children: []
		}
	}
];