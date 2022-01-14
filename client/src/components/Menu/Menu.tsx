import { IoEllipsisHorizontal } from 'react-icons/io5';
import React from 'react';

import { Flex, IconButton, Popover } from 'atoms';

interface Props {
	trigger?: React.ReactElement,
	tooltip?: string | React.ReactElement,
	children: React.ReactElement[]
}

const Menu = ({ trigger, tooltip, children, ...props }: Props) => {
	return (
		<Popover
			trigger={trigger || (
				<IconButton size='small' tooltip={tooltip}>
					<IoEllipsisHorizontal/>
				</IconButton>
			)}
			{...props}
		>
			<Flex
				flexDirection='column'
				py={2}
				width={260}
			>
				{children}
			</Flex>
		</Popover>
	);
};

export default Menu;
