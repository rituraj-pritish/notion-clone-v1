import styled from 'styled-components'

export const MenuWrapper = styled.div`
	opacity: 0;
`

export const RootWrapper = styled.div`
	display: flex;
	align-items: center;

	&:hover ${MenuWrapper} {
		opacity: 1;
	}
`
