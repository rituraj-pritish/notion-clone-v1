import { useQuery } from 'react-query'

import { getWorkspace } from '@/api/endpoints/workspace'
import queryKeys from '@/constants/queryKeys'

import SidebarPageGroup from '../SidebarPageGroup'
import { SidebarPagesWrapper } from './SideBar.styles'

const SidebarPages = () => {
	const { data } = useQuery(queryKeys.ROOT_PAGES, () => getWorkspace())
	return (
		<SidebarPagesWrapper>
			<SidebarPageGroup name='FAVORITES' pages={data?.favorites || []} />
			<SidebarPageGroup name='PRIVATE' pages={data?.private || []} />
		</SidebarPagesWrapper>
	)
}

export default SidebarPages
