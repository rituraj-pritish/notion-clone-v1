import styled from 'styled-components';

import theme from '@/theme';

export const RootWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80px;
	max-width: ${theme.maxWidth};
	padding: 0 16px;
`;
