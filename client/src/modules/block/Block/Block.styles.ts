import styled from 'styled-components'

interface MenuWrapperProps {
	isHovering: boolean
}

export const MenuWrapper = styled.div<MenuWrapperProps>`
	opacity: ${({ isHovering }) => (isHovering ? 1 : 0)};
`

export const RootWrapper = styled.div`
	display: flex;
	align-items: center;
`
