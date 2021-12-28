import { useRouter } from 'next/router';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { BsTriangleFill } from 'react-icons/bs';
import { FiFileText } from 'react-icons/fi';

import { Flex, IconButton, Space } from 'atoms';
import { PageOptions } from './SidebarPage.styles';
import SidebarItem from '../SidebarItem';
import AddChildPage from './AddChildPage';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import api from 'api';
import { GET_PAGES } from 'graphql/pages/queries';

interface Hierarchy {
	root: string
	parent: string
	children: string[]
}
interface Props {
	id: string
	name: string
	icon?: string
	hierarchy: Hierarchy
}

const SidebarPage = ({
	id,
	icon,
	name,
	hierarchy
}: Props) => {
	const router = useRouter();
	const { pageId } = router.query;

	const [children, setChildren] = useState<Array | null>(null);

	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

	const toggleCollapsed = () => setIsCollapsed(state => !state);

	const getChildren = async (reqs) => {
		// try {
		// 	const ch = await Promise.all(reqs);
		// 	return ch;
		// } catch (error) {
		// 	console.log('er', error);
		// }
		Promise.all(reqs).then(res => setChildren(res.flat()));
	};

	useEffect(() => {
		if(!isCollapsed) {
			if(hierarchy.children.length === 0) setChildren([]);

			const reqs = hierarchy.children
				.map(id => api(GET_PAGES, {
					ids: hierarchy.children.join(',')
				}));
			
			setChildren(getChildren(reqs));
		}
	}, [isCollapsed]);

	const isActive = id === pageId;
	console.log('ch', children);
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
				>
					<Flex alignItems='center'>
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
							<div>{name}</div>
						</Space>
					</Flex>
					<PageOptions>
						<Space size={4}>
							<IconButton size='small' tooltip='Delete, duplicate and more...'>
								<AiOutlineEllipsis/>
							</IconButton>
							<AddChildPage id={id} root={hierarchy?.root}/>
						</Space>
					</PageOptions>
				</Flex>
			</SidebarItem>
			{children && Array.isArray(children) && children.map(page => <SidebarPage {...page} />)}
		</>
	);
};

export default SidebarPage;
