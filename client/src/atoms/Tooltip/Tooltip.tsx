import RcTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import React from 'react';
import theme from 'theme';
import { SubText } from './Tooltip.styles';

interface Props extends TooltipProps {
	children: React.ReactElement 
}

const overlayStyle: React.CSSProperties = {
	position: 'absolute'
};
const overlayInnerStyle: React.CSSProperties = {
	background: 'black',
	color: 'white',
	width: 'fit-content',
	padding: '6px 8px',
	fontSize: '12px',
	borderRadius: theme.borderRadius
};

const Tooltip = ({ children, ...props }: Props) => {
	return (
		<RcTooltip 
			placement='bottom' 
			destroyTooltipOnHide 
			mouseEnterDelay={0.5}
			mouseLeaveDelay={0}
			overlayStyle={overlayStyle}
			overlayInnerStyle={overlayInnerStyle} 
			{...props}
		>
			{children}
		</RcTooltip>
	);
};

Tooltip.SubText = SubText;

export default Tooltip;
