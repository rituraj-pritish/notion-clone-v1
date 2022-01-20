import { getPage, screen, waitFor, fireEvent, waitForElementToBeRemoved, within } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import { PRIVATE_PAGES } from '@/tests/mocks/mockData/pages.mock';
import { server } from '@/tests/mocks/server';
import { graphql } from 'msw';

const clickMenuItem = (text: string, option: string, groupName = 'PRIVATE') => {
	const el = within(screen.getByTestId(`page-group-${groupName}`));

	fireEvent.mouseOver(el.getByText(text));
	fireEvent.click(el.getByTestId('menu-trigger'));
	fireEvent.click(el.getByText(option));
};

describe('Sidebar', () => {
	it('should render and update favorite pages', async () => {
		const { render } = await getPage({
			route: `/${PRIVATE_PAGES[0].id}`
		});
		render();

		await waitFor(() => screen.findByText('PRIVATE'));
		expect(screen.queryByText('FAVORITES')).not.toBeInTheDocument();

		// add to favorites
		clickMenuItem('P Page 1', 'Add to Favorites');
		await waitForElementToBeRemoved(() => screen.queryByText('Add to Favorites'), {
			timeout: 10000
		});
		expect(screen.getByText('FAVORITES')).toBeInTheDocument();
		expect(screen.getAllByText('P Page 1').length).toEqual(2);

		// remove from favorites
		clickMenuItem('P Page 1', 'Remove from Favorites', 'FAVORITES');
		const el = within(screen.getByTestId('page-group-FAVORITES'));
		await waitForElementToBeRemoved(() => el.queryByText('Remove from Favorites'), {
			timeout: 10000
		});
		expect(screen.queryByText('FAVORITES')).not.toBeInTheDocument();
		expect(screen.getAllByText('P Page 1').length).toEqual(1);
	}, 10000);
	
	it('should rename page', async () => {
		const { render } = await getPage({
			route: `/${PRIVATE_PAGES[0].id}`
		});
		render();

		await waitFor(() => screen.findByText('PRIVATE'));
		clickMenuItem('P Page 1', 'Rename');

		await waitFor(() => screen.findByPlaceholderText('P Page 1'));
		userEvent.type(screen.getByPlaceholderText('P Page 1'), 'Renamed Page 1');
		userEvent.keyboard('{Enter}');

		await waitFor(() => screen.findByText('Renamed Page 1'));
		expect(screen.queryByText('P Page 1')).not.toBeInTheDocument();
	});

	it('should update pages on delete', async () => {
		server.use(
			graphql.query('GetWorkspace', (_, res, ctx) => {
				return res.once(
					ctx.data({
						workspace: {
							private: PRIVATE_PAGES.map(item => ({ ...item, favorite: true })),
							favorites: PRIVATE_PAGES.map(item => ({ ...item, favorite: true })),
							shared: []
						}
					})
				);
			})
		);

		const { render } = await getPage({
			route: `/${PRIVATE_PAGES[0].id}`
		});
		render();

		await waitFor(() => screen.findByText('PRIVATE'));
		expect(screen.getAllByText('P Page 1').length).toEqual(2);

		clickMenuItem('P Page 1', 'Delete');
		await waitForElementToBeRemoved(() => screen.queryByText('Delete'), {
			timeout: 5000
		});
		await (() => expect(screen.queryAllByText('P Page 1').length).toEqual(0));
	});

	it('should add new page in private pages', async () => {
		const { render } = await getPage({
			route: `/${PRIVATE_PAGES[0].id}`
		});
		render();	

		fireEvent.click(screen.getByText('New page'));
		await waitFor(() => screen.findByTestId('sidebar-page-Untitled'));
	});
});
