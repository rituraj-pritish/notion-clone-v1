import api from 'api';
import { CREATE_PAGE, DELETE_PAGE, UPDATE_PAGE } from 'graphql/pages';
import { Page } from 'types/page';

export const createPage = (data: Partial<Page> & Pick<Page, 'name'>) => {
	return api<Page>(CREATE_PAGE, {
		createPageInput: data
	});
};

export const updatePage = (data: Partial<Page> & Pick<Page, 'id'>) => {
	return api<Page>(UPDATE_PAGE, {
		updatePageInput: data
	});
};

export const deletePage = (id: string) => {
	return api<boolean>(DELETE_PAGE, {
		id
	});
};