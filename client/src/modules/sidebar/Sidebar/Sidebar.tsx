import { BsPlus } from 'react-icons/bs';
import _throttle from 'lodash/throttle';
import { ResizeCallbackData } from 'react-resizable';
import { useMutation, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';

import { NewPage, RootWrapper, Handle, Content, Trigger } from './SideBar.styles';
import SidebarHeader from './SidebarHeader';
import useSidebar from  '@/hooks/useSidebar';
import SidebarItem from './SidebarItem';
import SidebarPages from './SidebarPages';
import { CREATE_PAGE } from  '@/graphql/pages';
import api from  '@/api';
import { Page } from 'types/page';

const NewPageFooter = () => {
	const queryClient = useQueryClient();
	
	const { mutateAsync } = useMutation(
		() => api<Page>(CREATE_PAGE, {
			createPageInput: {
				name: 'Untitled',
				hierarchy: {
					root: null,
					parent: null
				}
			}
		}),
		{
			onSuccess: newPage => {
				queryClient.setQueryData<Page[]>(
					'rootPages', 
					prevPages => prevPages!.concat(newPage)
				);
			}
		}
	);

	return (
		<SidebarItem>
			<NewPage onClick={mutateAsync}>
				<BsPlus/>
					New page
			</NewPage>
		</SidebarItem>
	);
};

const Sidebar = () => {
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const { isCollapsed, setWidth, width } = useSidebar();

	useEffect(() => {
		if(isCollapsed) setIsHovering(true);
	}, [isCollapsed]);

	const fun = (_, { size }: ResizeCallbackData) => {
		setWidth(size.width);
	};

	return (
		<RootWrapper
			axis='x'
			width={isCollapsed ? 0 : width}
			height={100}
			handle={<Handle/>}
			minConstraints={[200, 0]}
			maxConstraints={[400, 0]}
			isCollapsed={isCollapsed}
			onResize={_throttle(fun, 300)}
		>
			<Content
				isCollapsed={isCollapsed}
				isHovering={isHovering}
				width={width}
				onMouseLeave={() => isCollapsed && setIsHovering(false)}
			>
				<SidebarHeader />
				<SidebarPages/>
				<NewPageFooter/>
			</Content>
			{!isHovering && (<Trigger onMouseEnter={() => setIsHovering(true)} />)}
		</RootWrapper>
	);
};

export default Sidebar;
