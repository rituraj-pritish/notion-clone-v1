import { FiChevronsLeft } from 'react-icons/fi';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

import { Flex, IconButton } from  '@/atoms';
import { SidebarHeaderWrapper } from '../SideBar.styles';
import useSidebar from  '@/hooks/useSidebar';
import SidebarItem from '../SidebarItem';

const SidebarHeaderTrigger = () => {
	const { isCollapsed, toggleCollapsed } = useSidebar();
	const user = { name: 'Shubham' };
	if(!user) return null;

	return (
		<SidebarItem style={{ marginBottom: '5rem' }}>
			<SidebarHeaderWrapper>
				<Flex
					alignItems='center'
					flexGrow={1}
					style={{ color: 'black', fontWeight: 'bold' }}
				>
					{user.name}&apos;s Notion
					<Flex flexGrow={1} />
					<Flex flexDirection='column'>
						<BiChevronUp size={18}/>
						<BiChevronDown size={18} style={{ marginTop: '-10px' }}/>
					</Flex>
				</Flex>
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

export default SidebarHeaderTrigger;
