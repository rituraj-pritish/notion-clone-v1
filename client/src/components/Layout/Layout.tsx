import React from 'react';

import { Navbar, Sidebar } from 'components';
import { RootWrapper } from './Layout.styles';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<RootWrapper>
			<Sidebar/>
			<div>
				<Navbar/>
				{children}
			</div>
		</RootWrapper>
	);
};

export default Layout;
