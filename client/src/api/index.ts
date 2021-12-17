import { request, RequestDocument } from 'graphql-request';

const URL = process.env.API_URL;

export default async <T, V>(graphQlRequest: RequestDocument, variables: V): Promise<T> => {
	let token;

	if(typeof window !== 'undefined') {
		token = localStorage.getItem('auth_token') || '';
	}
	
	const requestHeaders = {
		authorization: `Bearer ${token}`
	};
	
	try {
		const data = await request<T>(URL!, graphQlRequest, variables, requestHeaders);
		return Object.values(data)[0];
	} catch (error) {
		return error;
	}
};