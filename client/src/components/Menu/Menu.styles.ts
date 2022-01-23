import styled from 'styled-components'

export const MenuItemWrapper = styled.div`
	color: black;
	display: flex;
	align-items: center;
	padding: 4px 12px;

	&:hover {
		background: #f3f3f3;
	}

	svg {
		margin-right: 12px;
		font-size: 18px;
		color: black;
		fill: black;

		path {
			color: black;
		}
	}
`
