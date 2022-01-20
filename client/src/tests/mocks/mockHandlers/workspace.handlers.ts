import { graphql } from 'msw';

import { PRIVATE_PAGES } from '../mockData/pages.mock';

export default [
	graphql.query('GetWorkspace', (req, res, ctx) => {
		return res(
			ctx.data({
				workspace: {
					private: PRIVATE_PAGES,
					favorites: [],
					shared: []
				}
			})
		);
	})
];
