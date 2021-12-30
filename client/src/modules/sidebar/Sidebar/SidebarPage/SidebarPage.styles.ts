import { Flex } from 'atoms';
import styled from 'styled-components';
import { SidebarItemWrapper } from '../SideBar.styles';

export const PageName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const PageOptions = styled(Flex)`
  margin-left: 8px;
  opacity: 0;

  ${SidebarItemWrapper}:hover &{
    opacity: 1;
  }
`;