import { getPage, screen, waitForElementToBeRemoved } from '@/tests/test-utils'

jest.mock('jwt-decode', () => () => ({
	name: 'Shubham',
	workspace: 'workspace'
}))

describe('Login page', () => {
	it('Navigates to first page screen on login', async () => {
		const { render } = await getPage({
			route: '/login',
			req: (req) => req
		})
		render()

		screen.getByText(/Log in/i).click()
		await waitForElementToBeRemoved(() =>
			screen.queryByPlaceholderText('Enter email')
		)
	})
})
