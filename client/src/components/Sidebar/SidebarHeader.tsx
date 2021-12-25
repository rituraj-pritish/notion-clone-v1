import { FiChevronsLeft } from 'react-icons/fi';

import { IconButton } from 'atoms';
import { SidebarHeaderWrapper } from './SideBar.styles';
import useSidebar from 'hooks/useSidebar';
import SidebarItem from './SidebarItem';

const SidebarHeader = () => {
	const { isCollapsed, toggleCollapsed } = useSidebar();
	const user = { name: 'Shubham' };
	if(!user) return null;

	return (
		<SidebarItem>
			<SidebarHeaderWrapper>
				<div>
					{user.name}&apos;s Notion
				</div>
				{!isCollapsed && (
					<IconButton
						tooltip='Close Sidebar'
						onClick={toggleCollapsed}
					>
						<FiChevronsLeft/>
					</IconButton>
				)}
			</SidebarHeaderWrapper>
		</SidebarItem>
	);
};

export default SidebarHeader;
