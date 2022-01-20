import { Flex, Tooltip } from  '@/atoms';
import { useState } from 'react';
import { Page } from 'types/page';
import SidebarPage from '../Sidebar/SidebarPage';
import { GroupName } from './SidebarPageGroup.styles';

interface Props {
  name: 'PRIVATE' | 'FAVORITES' | 'SHARED'
  pages: Page[]
}

const { SubText } = Tooltip;

const SidebarPageGroup = ({ name, pages = [] }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  
	const toggleCollapsed = () => setIsCollapsed(state => !state);

	if(pages.length === 0) return null;

	return (
		<Flex
			flexDirection='column'
			mb={isCollapsed ? 2 : 4}
			data-testid={`page-group-${name}`}
		>
			<Tooltip 
				overlay={(
					<>
						<div>Click to {isCollapsed ? 'show' : 'hide'} section</div>
						<SubText>Only you can access these pages.</SubText>
					</>
				)}
				placement='top-start'
			>
				<GroupName onClick={toggleCollapsed}>{name}</GroupName>
			</Tooltip>
			{!isCollapsed && (
				<div>
					{pages.map(page => (
						<SidebarPage
							key={page.id}
							{...page}
							isInsideFavoritesGroup={name === 'FAVORITES'}
						/>
					))}
				</div>
			)}
		</Flex>
	);
};

export default SidebarPageGroup;
