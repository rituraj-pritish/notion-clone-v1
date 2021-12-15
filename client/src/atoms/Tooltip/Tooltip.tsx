import RcTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import React from 'react';
import theme from 'theme';

interface Props extends TooltipProps {
	children: React.ReactElement 
}

const Tooltip = ({ children, ...props }: Props) => {
	return (
		<RcTooltip 
			placement='bottom' 
			destroyTooltipOnHide 
			mouseEnterDelay={0.5}
			mouseLeaveDelay={0}
			overlayStyle={{
				position: 'absolute'
			}}
			overlayInnerStyle={{
				background: 'black',
				color: 'white',
				width: 'fit-content',
				padding: '4px 12px',
				fontSize: '14px',
				borderRadius: theme.borderRadius
			}} 
			{...props}
		>
			{children}
		</RcTooltip>
	);
};

export default Tooltip;
