import styled from 'styled-components';
import theme from 'theme';

export const Title = styled.div`
  border-bottom: 0.5px solid ${theme.divider};
  padding: 8px;
`;

export const Content = styled.div`
  padding: 8px;
`;

export const RootWrapper = styled.div`
  border-radius: 2px;
  box-shadow: ${theme.boxShadow};
`;