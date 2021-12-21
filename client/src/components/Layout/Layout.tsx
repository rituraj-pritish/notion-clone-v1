import useAuthentication from 'hooks/useAuthentication';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuthentication();
	console.log('ias', isAuthenticated);
	return (
		<div>
			{children}
		</div>
	);
};

export default Layout;
