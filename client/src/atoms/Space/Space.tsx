import React, { HTMLAttributes } from 'react';
import { RootWrapper } from './Space.styles';

export type Direction = 'vertical' | 'horizontal'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  direction?: Direction,
  size?: string | number,
	align?: 'start' | 'center' | 'end'
}

const Space = ({ 
	children, 
	size = 8, 
	direction = 'horizontal',
	align = 'center',
	...props
}: Props) => {
	return (
		<RootWrapper
			size={size}
			direction={direction}
			align={align}
			{...props}
		>
			{children}
		</RootWrapper>
	);
};

export default Space;
