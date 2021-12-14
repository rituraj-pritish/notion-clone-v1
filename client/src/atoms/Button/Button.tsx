import { StyledButton } from './Button.styles';

export type Variant = 'primary' | 'secondary'
export type Size = 'small' | 'medium' | 'large'

export interface Props {
  variant?: Variant,
  size?: Size,
  children: React.ReactNode
}

const Button = ({
	variant = 'secondary',
	size = 'small',
	children 
}: Props) => {
	return (
		<StyledButton
			variant={variant}
			size={size}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
