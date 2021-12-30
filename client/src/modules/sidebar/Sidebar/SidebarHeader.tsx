import { FiChevronsLeft } from 'react-icons/fi';

import { Button, IconButton } from 'atoms';
import { SidebarHeaderWrapper } from './SideBar.styles';
import useSidebar from 'hooks/useSidebar';
import SidebarItem from './SidebarItem';
import { useMutation } from 'react-query';
import api from 'api';
import { LOGOUT } from 'graphql/users';
import { useRouter } from 'next/router';

const SidebarHeader = () => {
	const { isCollapsed, toggleCollapsed } = useSidebar();
	const router = useRouter();
	const { mutateAsync } = useMutation(() => api(LOGOUT));
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
				<Button onClick={() => mutateAsync()
					.then(() => router.replace('/login'))}
				>
					Logout
				</Button>
			</SidebarHeaderWrapper>
		</SidebarItem>
	);
};

export default SidebarHeader;
