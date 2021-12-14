import { darken } from 'polished';
import styled, { css } from 'styled-components';

import theme, { colors } from 'theme';
import { Props, Size, Variant } from './Button';

const getVariantStyles = (variant: Variant) => {
	if(variant === 'primary') return css`
		background: ${colors.primary};
		color: ${colors.white};
		border-color: ${darken(0.1, colors.primary)};

		&:hover {
			background: ${darken(0.05, colors.primary)};
		}
	`;

	return css`
		background: transparent;
		color: ${colors.text};

		&:hover {
			background: #f3f3f3;
		}
	`;
};

const getSizeStyles = (size: Size) => {
	if(size === 'small') {
		return css`
			font-size: 14px;
			padding: 4px 8px;
		`;
	}

	return css``;
};

export const StyledButton = styled.button<Props>`
	border: 1px solid transparent;
	border-radius: ${theme.borderRadius};
	padding: 8px 16px;
	font-size: 16px;
	cursor: pointer;
  ${({ variant }) => getVariantStyles(variant!)};
  ${({ size }) => getSizeStyles(size!)};
`;
