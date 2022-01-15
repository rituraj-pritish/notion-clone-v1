import { IoEllipsisHorizontal } from 'react-icons/io5';
import React from 'react';

import { Flex, IconButton, Popover } from  '@/atoms';
import { PopoverProps, PopoverRenderComponent } from 'atoms/Popover/Popover';

interface Props extends Omit<PopoverProps, 'trigger' | 'ref' | 'children'> {
	trigger?: React.ReactElement
	tooltip?: string | React.ReactElement
	ref?: React.Ref<React.ElementRef<typeof Popover>>
	children: React.ReactElement[] | PopoverRenderComponent
}

const Menu = ({ trigger, tooltip, children, ...props }: Props) => {
	const render = (params?: [boolean, VoidFunction]) => {
		if(typeof children === 'function' && params) {
			return (
				<Flex
					flexDirection='column'
					py={2}
					width={260}
				>
					{children(...params)}
				</Flex>
			);
		}

		return (
			<Flex
				flexDirection='column'
				py={2}
				width={260}
			>
				{children}
			</Flex>
		);
	};
	return (
		<Popover
			trigger={trigger || (
				<IconButton size='small' tooltip={tooltip}>
					<IoEllipsisHorizontal/>
				</IconButton>
			)}
			{...props}
		>
			{typeof children === 'function' ? (...params) => render(params) : render()}
		</Popover>
	);
};

export default Menu;
