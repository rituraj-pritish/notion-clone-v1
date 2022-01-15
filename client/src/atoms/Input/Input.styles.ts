import styled from 'styled-components';

import theme, { colors } from '@/theme';
import { Props } from './Input';

export const StyledInput = styled.input<Props>`
  border-radius: ${theme.borderRadius};
  border: 1px solid lightgray;
  padding: 8px;
  font-size: 16px;

  &:focus {
    outline: 1px solid ${colors.primary};
  }
`;
