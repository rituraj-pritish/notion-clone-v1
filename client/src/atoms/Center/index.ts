import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import { layout, space, SpaceProps, LayoutProps } from 'styled-system'

type Props = LayoutProps & SpaceProps & HTMLAttributes<HTMLDivElement>

const Center = styled.div<Props>`
	display: flex;
	align-items: center;
	justify-content: center;

	${space} ${layout}
`

export default Center
