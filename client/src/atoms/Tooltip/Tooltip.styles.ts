import styled from 'styled-components';

import theme from '@/theme';

export const RootOverlay = styled.div`
	background: black;
	color: white;
	width: fit-content;
	padding: 6px 8px;
	font-size: 12px;
	border-radius: ${theme.borderRadius};
`;

export const SubText = styled.div`
	font-size: 12px;
	color: #adadad;
	font-weight: 400;
	margin-top: 4px;
`;
