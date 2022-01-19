import { getPage, screen, waitFor, fireEvent } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import { PRIVATE_PAGES } from '@/tests/mocks/mockData/pages.mock';

describe('Rename page', () => {
	it('should rename page', async () => {
		const { render } = await getPage({
			route: `/${PRIVATE_PAGES[0].id}`
		});
		render();

		await waitFor(() => screen.findByText('PRIVATE'));
		fireEvent.mouseOver(
			screen.getByText('P Page 1')
		);
		fireEvent.click(screen.getByTestId('menu-trigger'));
		fireEvent.click(screen.getByText('Rename'));

		await waitFor(() => screen.findByPlaceholderText('P Page 1'));

		userEvent.type(screen.getByPlaceholderText('P Page 1'), 'Renamed Page 1');
		userEvent.keyboard('{Enter}');

		await waitFor(() => screen.findByText('Renamed Page 1'));
		expect(screen.queryByText('P Page 1')).not.toBeInTheDocument();
	});
});
