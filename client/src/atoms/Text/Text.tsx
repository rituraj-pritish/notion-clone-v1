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
	children: string
	inline?: boolean
}

const StyledText = styled.div<Props>`
	color: #8a8882;
	font-weight: 500;
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
