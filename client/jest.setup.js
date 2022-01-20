import { server } from './src/tests/mocks/server.ts';
import queryClient from './src/core/queryClient';

beforeAll(() => server.listen());
afterEach(() => {
	queryClient.clear();
	server.resetHandlers();
});
afterAll(() => server.close());