import { Flex, Tooltip } from 'atoms';
import { useState } from 'react';
import { Page } from 'types/page';
import SidebarPage from '../Sidebar/SidebarPage';
import { GroupName } from './SidebarPageGroup.styles';

interface Props {
  name: string
  pages: Page[]
}

const { SubText } = Tooltip;

const SidebarPageGroup = ({ name, pages }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  
	const toggleCollapsed = () => setIsCollapsed(state => !state);

	if(!pages || pages.length === 0) return null;

	return (
		<Flex flexDirection='column' mb={4}>
			<Tooltip 
				overlay={(
					<>
						<div>Click to {isCollapsed ? 'show' : 'hide'} section</div>
						<SubText>Only you can access these pages.</SubText>
					</>
				)}
				placement='topLeft'
			>
				<GroupName onClick={toggleCollapsed}>{name}</GroupName>
			</Tooltip>
			{!isCollapsed && (
				<div>
					{pages.map(page => (
						<SidebarPage key={page.id} {...page} />
					))}
				</div>
			)}
		</Flex>
	);
};

export default SidebarPageGroup;