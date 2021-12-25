import { Tooltip } from 'atoms';
import React, { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './IconButton.styles';

export type Size = 'small' | 'medium'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  size?: Size,
	tooltip?: string | React.ReactElement
}

const IconButton = ({
	children,
	size = 'medium',
	tooltip,
	onClick,
	...otherProps
}: Props): JSX.Element => {
	const iconButton = (
		<StyledButton 
			size={size} 
			isEmoji={typeof children === 'string'}
			onClick={e => {
				e.stopPropagation();
				if(onClick) onClick(e);
			}}
			{...otherProps}
		>
			{children}
		</StyledButton>
	);

	if(tooltip) return (
		<Tooltip overlay={tooltip}>
			{iconButton}
		</Tooltip>
	);

	return iconButton;
};

export default IconButton;