import { GraphQLClient, RequestDocument } from 'graphql-request';

const URL = process.env.API_URL;

export default async <T, V>(
	graphQlRequest: RequestDocument, 
	variables?: V,
	token?: string
): Promise<T> => {
	const graphQLClient = new GraphQLClient(URL!, {
		credentials: 'include',
	});

	const requestHeaders = {};

	if(token) requestHeaders.authorization = token;

	try {
		const data = await graphQLClient.request<T>(
			graphQlRequest, variables, requestHeaders
		);
		return Object.values(data)[0];
	} catch (error) {
		return error;
	}
};