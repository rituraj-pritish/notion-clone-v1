import { getPage } from 'next-page-tester';
import { screen, waitForElementToBeRemoved, waitFor } from '@/test/test-utils';

import { PRIVATE_PAGES } from '@/mocks/mockData/pages.mock';

describe('Login page', () => {
	it('Navigates to first page screen on login', async () => {
		const { render } = await getPage({
			route: '/login'
		});
		render();
		
		screen.getByText(/Log in/i).click();
		await waitForElementToBeRemoved(() => screen.queryByPlaceholderText('Enter email'));
		await waitFor(() => expect(document.title).toEqual(PRIVATE_PAGES[0].name));
	});
});