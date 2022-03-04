import styled, { css } from 'styled-components'

interface OptionProps {
  isActive?: boolean
}

export const Option = styled.div<OptionProps>`
  padding: 2px;
  cursor: pointer;

  ${({ isActive }) => isActive && css`
    color: rgb(46, 170, 220);
  `};  

  &:hover {
    background: #dedede;
  }
`
