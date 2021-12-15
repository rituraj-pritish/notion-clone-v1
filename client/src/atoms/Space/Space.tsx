import { RootWrapper } from './Space.styles';

export type Direction = 'vertical' | 'horizontal'

export interface Props {
  children: React.ReactNode,
  direction?: Direction,
  size?: string | number
}

const Space = ({ 
	children, 
	size = 8, 
	direction = 'horizontal' 
}: Props) => {
	return (
		<RootWrapper size={size} direction={direction}>
			{children}
		</RootWrapper>
	);
};

export default Space;
