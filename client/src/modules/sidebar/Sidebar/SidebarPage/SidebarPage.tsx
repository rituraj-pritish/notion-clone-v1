import { useRouter } from 'next/router';
import { BsTriangleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Flex, IconButton, Space } from  '@/atoms';
import { Left, PageName } from './SidebarPage.styles';
import SidebarItem from '../SidebarItem';
import AddChildPage from './AddChildPage';
import api from  '@/api';
import { GET_PAGES } from  '@/graphql/pages/queries';
import { Page } from 'types/page';
import SidebarPageMoreOptions from './SidebarPageMoreOptions';
import ChangeIcon from  '@/shared/ChangeIcon';
import useSidebar from  '@/hooks/useSidebar';

interface Props extends Page {
	depth?: number
	isInsideFavoritesGroup: boolean
}

const SidebarPage = ({
	depth = 0,
	isInsideFavoritesGroup,
	...page
}: Props) => {
	const {
		id,
		icon,
		name,
		hierarchy,
	}: Page = page;

	const { refetch } = useQuery<Page[]>(
		[id, 'children'],
		() => api(GET_PAGES, { ids: hierarchy.children.join(',') }),
		{ enabled: false }
	);
	const router = useRouter();
	const { width } = useSidebar();
	const { pageId } = router.query;

	const [children, setChildren] = useState<Page[] | null>(null);
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

	const toggleCollapsed = () => setIsCollapsed(state => !state);

	useEffect(() => {
		if(!isCollapsed && !children) {
			if(hierarchy.children.length === 0) {
				setChildren([]);
				return;
			}
			refetch()
				.then(res => {
					if(res.data) setChildren(res.data);
				});
		}
	// eslint-disable-next-line
	}, [isCollapsed]);

	const isActive = id === pageId;
	
	const showNestedElements = children && !isCollapsed && Array.isArray(children);

	return (
		<>
			<SidebarItem 
				isActive={isActive} 
				onClick={() => router.push(`/${id}`)}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>
				<Flex
					justifyContent='space-between'
					px={12}
					py={1}
					pl={depth ? (depth * 26) + 12 : 12}
				>
					<Left>
						<Space size={4}>
							<IconButton
								size='small'
								style={{ width: '20px', height: '20px' }}
								onClick={toggleCollapsed}
							>
								<BsTriangleFill 
									style={{ 
										transform: `rotate(${isCollapsed ? 90 : 180}deg)`,
										transition: 'transform 0.15s'
									}}
									size={8}
								/>
							</IconButton>
							<ChangeIcon
								icon={icon}
								pageId={id}
								haveChildren={hierarchy.children?.length > 0}
							/>
							<PageName style={{
								width: isHovering ? `${width - (depth ? (depth * 26) + 116 : 116)}px` : undefined,
								color: isActive ? 'black' : undefined
							}}
							>{name}
							</PageName>
						</Space>
					</Left>
					{isHovering && (
						<Space size={4}>
							<SidebarPageMoreOptions isInsideFavoritesGroup={isInsideFavoritesGroup} {...page}/>
							<AddChildPage
								nestedPages={hierarchy.children}
								id={id}
								root={hierarchy?.root}
							/>
						</Space>
					)}
				</Flex>
			</SidebarItem>
			{showNestedElements && (
				<div>
					{children.length === 0 
						? <Flex pl={depth ? (depth * 26) + 24 : 24}>No pages inside</Flex>
						: children.map(page => 
							<SidebarPage
								isInsideFavoritesGroup={isInsideFavoritesGroup}
								key={page.id}
								depth={depth + 1}
								{...page}
							/>
						)}
				</div>
			)}
		</>
	);
};

export default SidebarPage;
