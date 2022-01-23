import queryClient from './src/core/queryClient'
import { server } from './src/tests/mocks/server.ts'

beforeAll(() => server.listen())
afterEach(() => {
	queryClient.clear()
	server.resetHandlers()
})
afterAll(() => server.close())
