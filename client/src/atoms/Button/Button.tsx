import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

import { Tooltip } from '@/atoms';
import { Icon, StyledButton } from './Button.styles';

export type Variant = 'primary' | 'secondary' | 'tertiary'
export type Size = 'small' | 'medium' | 'large'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  variant: Variant,
  size: Size,
	leftIcon?: IconType | string,
	rightIcon?: IconType | string,
	tooltip?: string | React.ReactElement,
	ghost?: boolean,
	bold?: boolean 
}

const ICON_SIZE = 16;

const Button = React.forwardRef(({
	variant = 'secondary',
	size = 'small',
	children,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	tooltip,
	ghost,
	bold,
	...otherProps
}: Props, ref: React.Ref<HTMLButtonElement>): JSX.Element => {

	const button = (
		<StyledButton
			variant={variant}
			size={size}
			ghost={ghost}
			bold={bold}
			ref={ref}
			{...otherProps}
		>
			{LeftIcon && 
		<Icon left isEmoji={typeof LeftIcon === 'string'}>
			{typeof LeftIcon === 'string' ? LeftIcon : <LeftIcon size={ICON_SIZE}/>}
		</Icon>
			}
			{children}
			{RightIcon && 
		<Icon isEmoji={typeof RightIcon === 'string'}>
			{typeof RightIcon === 'string' ? RightIcon : <RightIcon size={ICON_SIZE}/>}
		</Icon>
			}
		</StyledButton>
	);

	if(tooltip) return (
		<Tooltip overlay={tooltip}>
			{button}
		</Tooltip>
	);

	return button;
});

export default Button;
