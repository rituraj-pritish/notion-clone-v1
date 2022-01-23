import React, { HTMLAttributes } from 'react';

import { MenuItemWrapper } from './Menu.styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
	icon: React.ReactElement;
	children: string | React.ReactChild[];
}

const MenuItem = React.forwardRef(
	({ icon, children, ...props }: Props, ref: React.Ref<HTMLDivElement>) => {
		return (
			<MenuItemWrapper {...props} ref={ref}>
				{icon}
				{children}
			</MenuItemWrapper>
		);
	}
);

export default MenuItem;
