import styled, { css } from 'styled-components';
import theme, { colors } from '@/theme';
import { Props, Size } from './IconButton';

interface StyleProps {
  isEmoji: boolean
}

const getSizeStyles = (size: Size, isEmoji: boolean) => {
	if(size === 'small') {
		return css`
      font-size: 18px;
      padding: 3px;
      ${isEmoji && css`
        padding: 2px;
        height: 24px;
        width: 24px;
        font-size: 20px;
      `};
    `;
	}
};

export const StyledButton = styled.button<Props & StyleProps>`
  border: none;
  background: transparent;
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  font-size: 24px;
  max-height: 32px;
  max-width: 32px;
  color: ${theme.iconButton};
  ${({ size, isEmoji }) => getSizeStyles(size!, isEmoji)};

  &:hover {
    background: ${colors.buttonHover};;
  }
`;
