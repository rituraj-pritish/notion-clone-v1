import styled, { css } from 'styled-components';

import theme, { colors } from '@/theme';
import { Props } from './Input';

const getStyles = ({ size }: Props) => {
	if(size === 'medium') {
		return css`
      padding: 8px;
      font-size: 16px;
    `;
	}

	if(size === 'small') {
		return css`
      font-size: 14px;
      padding: 4px 10px;
      height: 28px;
    `;
	}
};

export const StyledInput = styled.input<Props>`
  border-radius: ${theme.borderRadius};
  border: 1px solid lightgray;
  ${(props) => getStyles(props)};

  &:focus, &:active {
    outline: none;
  }

  width: ${({ fullWidth }) => fullWidth && '100%'};

  ${({ type }) => type === 'primary' && css`
    &:focus {
      outline: 1px solid ${colors.primary};
    }
  `};
`;
