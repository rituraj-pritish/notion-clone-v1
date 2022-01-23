import { GetWorkspaceResult } from '@/api/endpoints/workspace';
import queryKeys from '@/constants/queryKeys';
import queryClient from '@/core/queryClient';
import { Page } from '@/types/page';

export default (
	id: Page['id'],
	hierarchy: Page['hierarchy'],
	updates: Partial<Page>
) => {
	const updateRecord = (array: Page[] | undefined) => {
		if (!array || array.length === 0) return [];
		const idx = array.findIndex(({ id: pId }) => pId === id);

		if (!array[idx]) return array;

		array[idx] = {
			...array[idx],
			...updates
		};

		if (updates.deletedAt) {
			return array.filter(({ id: pId }) => id !== pId);
		}

		return array;
	};

	queryClient.setQueryData<GetWorkspaceResult>(
		queryKeys.ROOT_PAGES,
		(prevData) => {
			const privatePages = updateRecord(prevData?.private);
			let favoritePages = updateRecord(prevData?.favorites);

			if ('favorite' in updates) {
				if (updates.favorite === true) {
					favoritePages.push(privatePages.find(({ id: pId }) => id === pId)!);
				} else {
					favoritePages = favoritePages.filter(({ id: fId }) => fId !== id);
				}
			}

			return {
				private: privatePages,
				favorites: favoritePages,
				shared: updateRecord(prevData?.shared)
			};
		}
	);
	queryClient.setQueryData<Page[] | undefined>(
		[hierarchy.parent, 'children'],
		(prevData) => {
			if (!prevData) return undefined;
			return updateRecord(prevData);
		}
	);
};
