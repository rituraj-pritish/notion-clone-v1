import styled, { css } from 'styled-components'

import theme, { colors } from '@/theme'

import { Props, Size } from './IconButton'

interface StyleProps {
	isEmoji: boolean
}

const getSizeStyles = (size: Size, isEmoji: boolean) => {
	if (size === 'small') {
		return css`
			font-size: 18px;
			height: 20px;
			width: 20px;
			padding: 2px;
			${isEmoji &&
			css`
				font-size: 18px;
			`};
		`
	}

	if (size === 'medium') {
		return css`
			font-size: 17px;
			height: 28px;
			width: 28px;
			padding: 3px;
			${isEmoji &&
			css`
				font-size: 20px;
			`}
		`
	}
}

export const StyledButton = styled.button<Props & StyleProps>`
	border: none;
	background: transparent;
	border-radius: ${theme.borderRadius};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${theme.iconButton};
	${({ size, isEmoji }) => getSizeStyles(size!, isEmoji)};
	box-shadow: ${({ bordered }) => bordered && 'inset 0 0 0 1px #cacaca'};

	&:hover {
		background: ${colors.buttonHover};
	}
`
