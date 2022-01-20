import styled from 'styled-components';
import {
	flexbox,
	FlexboxProps,
	layout,
	LayoutProps,
	space,
	SpaceProps
} from 'styled-system';

const Flex = styled.div<FlexboxProps & SpaceProps & LayoutProps>`
	display: flex;
	${flexbox} ${space} ${layout}
`;

export default Flex;
