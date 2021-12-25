import api from 'api';
import { GET_WORKSPACE } from 'graphql/workspaces';
import { useQuery } from 'react-query';
import SidebarPage from './SidebarPage';

const SidebarPages = () => {
	const { data } = useQuery(
		'rootPages',
		() => api(GET_WORKSPACE)
	);

	return (
		<div>
			{data?.pages.map(page => <SidebarPage {...page} />)}
		</div>
	);
};

export default SidebarPages;
