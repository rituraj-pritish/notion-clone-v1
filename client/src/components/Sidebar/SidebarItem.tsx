import useSidebar from 'hooks/useSidebar';
import React from 'react';
import { SidebarItemWrapper } from './SideBar.styles';

interface Props {
  children: React.ReactChild
}

const SidebarItem = ({ children }: Props) => {
	const { isCollapsed } = useSidebar();

	return (
		<SidebarItemWrapper isCollapsed={isCollapsed} >
			{children}
		</SidebarItemWrapper>
	);
};

export default SidebarItem;
