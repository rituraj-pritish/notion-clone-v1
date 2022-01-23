import { LayoutProps } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import {
	layout,
	space,
	SpaceProps,
	typography,
	TypographyProps
} from 'styled-system'

type StyledSystemProps = SpaceProps & LayoutProps & TypographyProps

interface Props extends StyledSystemProps {
	children: string
}

const StyledText = styled.span<Props>`
	color: #8a8882;
	font-weight: 500;
	${space} ${layout} ${typography}
`

const Text = ({ children, ...props }: Props) => {
	return <StyledText {...props}>{children}</StyledText>
}

export default Text
