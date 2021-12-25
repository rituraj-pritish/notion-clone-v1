import { Flex } from 'atoms';
import styled from 'styled-components';
import { SidebarItemWrapper } from '../SideBar.styles';

export const PageOptions = styled(Flex)`
  opacity: 0;

  ${SidebarItemWrapper}:hover &{
    opacity: 1;
  }
`;