import { graphql } from 'msw';

export default [
	graphql.query('Signin', (req, res, ctx) => {
		return res(
			ctx.data({
				signin: {
					name: 'Shubham'
				}
			}),
			ctx.cookie('auth_token', 'auth_token')
		);
	})
];
