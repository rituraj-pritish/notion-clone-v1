import { graphql } from 'msw';
import { NESTED_PAGES, PRIVATE_PAGES } from '../mockData/pages.mock';

export default [
	// queries
	graphql.query('GetPage', (req, res, ctx) => {
		return res(
			ctx.data({
				getPage: PRIVATE_PAGES[0]
			})
		);
	}),

	graphql.query('GetPages', (req, res, ctx) => {
		return res(
			ctx.data({
				getPages: NESTED_PAGES
			})
		);
	}),

	// mutations
	graphql.mutation('CreatePage', (req, res, ctx) => {
		const variables = req.variables.createPageInput;
		
		return res(
			ctx.data({
				createPage: {
					id: 'new-page',
					...variables
				}
			})
		);
	}),

	graphql.mutation('UpdatePage', (req, res, ctx) => {
		const variables = req.variables.updatePageInput;

		return res(
			ctx.data({
				updatePage: { ...PRIVATE_PAGES[0], ...variables }
			})
		);
	}),

	graphql.mutation('DeletePage', (req, res, ctx) => {
		return res(
			ctx.data({
				deletePage: { ...PRIVATE_PAGES[0], deletedAt: new Date().toISOString() }
			})
		);
	})
];