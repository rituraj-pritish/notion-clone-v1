import { FiChevronsLeft } from 'react-icons/fi';

import { IconButton } from 'atoms';
import useAuthentication from 'hooks/useAuthentication';
import { SidebarHeaderWrapper } from './SideBar.styles';
import useSidebar from 'hooks/useSidebar';
import SidebarItem from './SidebarItem';

const SidebarHeader = () => {
	const { user } = useAuthentication();
	const { isCollapsed, toggleCollapsed } = useSidebar();

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
