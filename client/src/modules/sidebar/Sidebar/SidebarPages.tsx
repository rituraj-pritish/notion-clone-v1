import { useQuery } from 'react-query';

import { getWorkspace } from '@/api/endpoints/workspace';
import queryKeys from '@/constants/queryKeys';

import SidebarPageGroup from '../SidebarPageGroup';

const SidebarPages = () => {
	const { data } = useQuery(queryKeys.ROOT_PAGES, () => getWorkspace());
	return (
		<div>
			<SidebarPageGroup name='FAVORITES' pages={data?.favorites || []} />
			<SidebarPageGroup name='PRIVATE' pages={data?.private || []} />
		</div>
	);
};

export default SidebarPages;
