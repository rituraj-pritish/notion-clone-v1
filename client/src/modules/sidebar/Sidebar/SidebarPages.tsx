import api from 'api';
import { GET_WORKSPACE } from 'graphql/workspaces';
import { useQuery } from 'react-query';
import { Page } from 'types/page';
import SidebarPage from './SidebarPage';

const SidebarPages = () => {
	const { data } = useQuery(
		'rootPages',
		() => api<Page[]>(GET_WORKSPACE)
	);

	return (
		<div>
			{data?.map(page => <SidebarPage key={page.id} {...page} />)}
		</div>
	);
};

export default SidebarPages;
