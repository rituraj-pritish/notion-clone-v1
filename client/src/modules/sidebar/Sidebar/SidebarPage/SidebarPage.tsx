import { useRouter } from 'next/router';
import { BsTriangleFill } from 'react-icons/bs';
import { FiFileText } from 'react-icons/fi';

import { Flex, IconButton, Space } from 'atoms';
import { Left, PageName, PageOptions } from './SidebarPage.styles';
import SidebarItem from '../SidebarItem';
import AddChildPage from './AddChildPage';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import api from 'api';
import { GET_PAGES } from 'graphql/pages/queries';
import { Page } from 'types/page';
import SidebarPageMoreOptions from './SidebarPageMoreOptions';

interface Props extends Page {
	depth?: number
}

const SidebarPage = ({
	id,
	icon,
	name,
	hierarchy,
	depth = 0
}: Props) => {
	const { refetch } = useQuery<Page[]>(
		[id, 'children'],
		() => api(GET_PAGES, { ids: hierarchy.children.join(',') }),
		{ enabled: false }
	);
	const router = useRouter();
	const { pageId } = router.query;

	const [children, setChildren] = useState<Page[] | null>(null);

	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

	const toggleCollapsed = () => setIsCollapsed(state => !state);

	useEffect(() => {
		if(!isCollapsed && !children) {
			if(hierarchy.children.length === 0) setChildren([]);

			refetch()
				.then(res => {
					if(res.data) setChildren(res.data);
				});
		}
	// eslint-disable-next-line
	}, [isCollapsed]);

	const isActive = id === pageId;
	
	return (
		<>
			<SidebarItem 
				isActive={isActive} 
				onClick={() => router.push(`/${id}`)}
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
									size={10}
								/>
							</IconButton>
							<IconButton size='small' tooltip='Change icon'>
								{icon || <FiFileText/>}
							</IconButton>
							<PageName>{name}</PageName>
						</Space>
					</Left>
					{/* <PageOptions>
						<Space size={4}>
							<SidebarPageMoreOptions/>
							<AddChildPage id={id} root={hierarchy?.root}/>
						</Space>
					</PageOptions> */}
				</Flex>
			</SidebarItem>
			{children && !isCollapsed && 
				Array.isArray(children) && children.map(page => 
				<SidebarPage
					key={page.id}
					depth={depth + 1}
					{...page}
				/>
			)}
		</>
	);
};

export default SidebarPage;
