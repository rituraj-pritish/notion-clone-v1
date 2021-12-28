import { BsPlus } from 'react-icons/bs';
import _throttle from 'lodash/throttle';
import { ResizeCallbackData } from 'react-resizable';

import { NewPage, RootWrapper, Handle, Content, Trigger } from './SideBar.styles';
import SidebarHeader from './SidebarHeader';
import useSidebar from 'hooks/useSidebar';
import { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import SidebarPages from './SidebarPages';

const NewPageFooter = () => {
	return (
		<SidebarItem>
			<NewPage>
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
				width={width}
				style={{ transform: isCollapsed && `translate(${isHovering ? 0 : '-100%'} ,-50%)` }}
				onMouseLeave={() => isCollapsed && setIsHovering(false)}
			>
				<SidebarHeader />
				<SidebarPages/>
				<NewPageFooter/>
			</Content>
			<Trigger onMouseEnter={() => setIsHovering(true)} />
		</RootWrapper>
	);
};

export default Sidebar;
