import React, { HTMLAttributes } from 'react';

import useSidebar from '@/hooks/useSidebar';

import { SidebarItemWrapper } from './SideBar.styles';

export interface Props extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactChild;
	isActive?: boolean;
}

const SidebarItem = ({ children, ...props }: Props) => {
	const { isCollapsed } = useSidebar();

	return (
		<SidebarItemWrapper {...props} isCollapsed={isCollapsed}>
			{children}
		</SidebarItemWrapper>
	);
};

export default SidebarItem;
