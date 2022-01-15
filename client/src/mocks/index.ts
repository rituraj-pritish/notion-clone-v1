import { graphql } from 'msw';

export default [
	graphql.query('Signin', (req, res, ctx) => {
		return res(
			ctx.data({
				signin: {
					name: 'Shubham'
				}
			})
		);
	})
];