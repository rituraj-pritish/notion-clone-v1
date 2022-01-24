import userEvent from '@testing-library/user-event'

import {
	FAVORITE_PAGES,
	PRIVATE_PAGES
} from '@/tests/mocks/mockData/pages.mock'
import { render, screen, waitFor } from '@/tests/test-utils'

import SidebarPageGroup from '../index'

jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: '',
			asPath: ''
		}
	}
}))

describe('SidebarPageGroup', () => {
	it('should toggle collapse on name click', async () => {
		render(<SidebarPageGroup name='PRIVATE' pages={PRIVATE_PAGES} />)
		expect(screen.getByText('P Page 1')).toBeInTheDocument()

		userEvent.click(screen.getByText('PRIVATE'))
		await waitFor(() =>
			expect(screen.queryByText('P Page 1')).not.toBeVisible()
		)

		userEvent.click(screen.getByText('PRIVATE'))
		await waitFor(() => expect(screen.queryByText('P Page 1')).toBeVisible())
	})

	it('should render null if pages length is 0 and render pages if greater than 0', () => {
		const { rerender } = render(
			<SidebarPageGroup name='FAVORITES' pages={[]} />
		)
		expect(screen.queryByText('FAVORITES')).not.toBeInTheDocument()

		rerender(<SidebarPageGroup name='FAVORITES' pages={FAVORITE_PAGES} />)
		expect(screen.getByText('FAVORITES')).toBeInTheDocument()
		expect(screen.getByText('F Page 1')).toBeInTheDocument()
	})
})
