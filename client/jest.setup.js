import { server } from './src/mocks/server.ts';

import { QueryCache } from 'react-query';
const queryCache = new QueryCache();

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	queryCache.clear();
});
afterAll(() => server.close());