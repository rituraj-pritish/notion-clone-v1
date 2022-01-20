import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react/headless';

import { RootOverlay, SubText } from './Tooltip.styles';

interface Props extends Omit<TippyProps, 'children'> {
	children: React.ReactElement;
	overlay: string | React.ReactElement<any>;
}

const Tooltip = ({ children, overlay, className, ...props }: Props) => {
	return (
		<div className={className}>
			<Tippy
				render={(attrs) => <RootOverlay {...attrs}>{overlay}</RootOverlay>}
				delay={[500, 200]}
				{...props}
			>
				{children}
			</Tippy>
		</div>
	);
};

Tooltip.SubText = SubText;

export default Tooltip;
