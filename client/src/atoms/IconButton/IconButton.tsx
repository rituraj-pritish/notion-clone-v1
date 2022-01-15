import React, { ButtonHTMLAttributes } from 'react';

import { Tooltip } from '@/atoms';
import { StyledButton } from './IconButton.styles';

export type Size = 'small' | 'medium'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  size?: Size,
	tooltip?: string | React.ReactElement
}

const IconButton = React.forwardRef(({
	children,
	size = 'medium',
	tooltip,
	onClick,
	...otherProps
}: Props, ref: React.Ref<HTMLButtonElement>): JSX.Element => {
	const iconButton = (
		<StyledButton 
			size={size} 
			isEmoji={typeof children === 'string'}
			onClick={e => {
				e.stopPropagation();
				if(onClick) onClick(e);
			}}
			ref={ref}
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
});

export default IconButton;
