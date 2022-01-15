import { graphql } from 'msw';
import { PRIVATE_PAGES } from '../mockData/pages.mock';

export default [
	graphql.query('GetPage', (req, res, ctx) => {
		return res(
			ctx.data({
				getPage: PRIVATE_PAGES[0]
			})
		);
	})
];