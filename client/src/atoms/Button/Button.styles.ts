import { darken } from 'polished'
import styled, { css } from 'styled-components'

import theme, { colors } from '@/theme'

import { Props, Size, Variant } from './Button'

const getVariantStyles = (variant: Variant) => {
	if (variant === 'primary')
		return css`
			background: ${colors.primary};
			color: ${colors.white};
			border-color: ${darken(0.1, colors.primary)};

			&:hover {
				background: ${darken(0.05, colors.primary)};
			}
		`

	if (variant === 'tertiary')
		return css`
			color: #878682;

			&:hover {
				background: ${colors.buttonHover};
			}
		`

	return css`
		background: transparent;
		color: ${colors.text};
		border-color: #dfdfde;

		&:hover {
			background: ${colors.buttonHover};
		}
	`
}

const getSizeStyles = (size: Size) => {
	if (size === 'small') {
		return css`
			font-size: 14px;
			padding: 4px 8px;
		`
	}

	return css``
}

export const StyledButton = styled.button<Props>`
	border: 1px solid transparent;
	border-radius: ${theme.borderRadius};
	padding: 8px 16px;
	font-size: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-weight: 400;
	font-weight: ${({ bold }) => bold && 500};
	${({ variant }) => getVariantStyles(variant!)};
	${({ ghost }) =>
		ghost &&
		css`
			background: transparent;
			border-color: transparent;
		`};
	${({ size }) => getSizeStyles(size!)};
`

interface IconProps {
	left?: boolean
	isEmoji: boolean
}

export const Icon = styled.span<IconProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: ${({ left }) => left && '6px'};
	margin-left: ${({ left }) => !left && '6px'};

	${({ isEmoji }) =>
		isEmoji &&
		css`
			font-size: 20px;
			max-height: 20px;
		`};
`
