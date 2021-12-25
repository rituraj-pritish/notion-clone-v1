import { useState } from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';

import { Button, IconButton } from 'atoms';
import useSidebarCollapsed from 'hooks/useSidebar';
import { RootWrapper } from './Navbar.styles';
import AUTH_TOKEN from 'enums/authToken';

const Navbar = () => {
	const { isCollapsed, toggleCollapsed } = useSidebarCollapsed();
	const [isHovering, setIsHovering] = useState<boolean>(false);

	return (
		<RootWrapper>
			<div
				style={{ width: 'fit-content', padding: '0 8px' }}
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
			>	
				{isCollapsed && (
					<IconButton onClick={toggleCollapsed}>
						{isHovering ? <FiChevronsRight/> : <AiOutlineMenu/>}
					</IconButton>
				)}
			</div>
		</RootWrapper>
	);
};

export default Navbar;
