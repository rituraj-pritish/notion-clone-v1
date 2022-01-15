import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react/headless';

import { RootOverlay, SubText } from './Tooltip.styles';

interface Props extends Omit<TippyProps, 'children'> {
	children: React.ReactElement,
	overlay: React.ReactElement
}

const Tooltip = ({ children, overlay, ...props }: Props) => {
	return (
		<Tippy
			render={(attrs) => (
				<RootOverlay {...attrs}>
					{overlay}
				</RootOverlay>
			)}
			delay={[500, 200]}
			{...props}
		>
			{children}
		</Tippy>
	);
};

Tooltip.SubText = SubText;

export default Tooltip;
