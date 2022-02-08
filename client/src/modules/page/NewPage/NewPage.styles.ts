import { Input } from '@/atoms'
import styled from 'styled-components'

export const StyledInput = styled(Input)`
  padding: 0;
  
  &::placeholder {
    color: lightgray;
  }
`

export const SubHeader = styled.div`
  padding: 0 140px;
  padding-top: 40px;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
`