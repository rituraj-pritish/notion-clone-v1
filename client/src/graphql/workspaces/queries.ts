import { gql } from 'graphql-request';

import { PAGE_FRAGMENT } from '../pages';

export const GET_WORKSPACE = gql`
	${PAGE_FRAGMENT}
	query GetWorkspace {
		getWorkspace {
			private {
				...pageFragment
			}
			favorites {
				...pageFragment
			}
		}
	}
`;
