import { LayoutProps } from 'framer-motion'
import React, { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import {
	color,
	ColorProps,
	layout,
	space,
	SpaceProps,
	typography,
	TypographyProps
} from 'styled-system'

type StyledSystemProps = HTMLAttributes<HTMLDivElement> &
	SpaceProps &
	LayoutProps &
	TypographyProps &
	ColorProps

interface Props extends StyledSystemProps {
	children: React.ReactText | React.ReactText[]
	inline?: boolean
	size: 'small' | 'medium'
}

const StyledText = styled.div<Props>`
	color: #8a8882;
	font-weight: 500;
	${({ size }) =>
		size &&
		css`
			font-size: ${(() => {
				if (size === 'medium') return '14.5px'
				if (size === 'small') return '12px'
			})()};
		`};
	${({ inline }) =>
		inline &&
		css`
			display: inline;
		`};
	${space} ${layout} ${typography} ${color}
`

const Text = ({ children, ...props }: Props) => {
	return <StyledText {...props}>{children}</StyledText>
}

export default Text
