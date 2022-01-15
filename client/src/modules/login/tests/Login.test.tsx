import { getPage } from 'next-page-tester';

import { screen, waitForElementToBeRemoved } from '@/test/test-utils';

describe('Login page', () => {
	it('Navigates to first page screen on login', async () => {
		const { render } = await getPage({
			route: '/login'
		});
		render();
		
		screen.getByText(/Log in/i).click( );
		await waitForElementToBeRemoved(() => screen.queryByPlaceholderText('Enter email'));
	});
});