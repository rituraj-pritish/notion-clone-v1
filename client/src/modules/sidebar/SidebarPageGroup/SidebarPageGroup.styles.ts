import styled from 'styled-components'

import theme from '@/theme'

export const GroupName = styled.div`
	color: #aaa9a4;
	border-radius: ${theme.borderRadius};
	padding: 2px 4px;
	font-size: 11.5px;
	font-weight: 500;
	margin-left: 10px;
	margin-bottom: 4px;
	width: fit-content;
	cursor: pointer;

	&:hover {
		color: #a19f9a;
		background: #e8e7e3;
	}
`
