import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';
import ChatItems from './ChatItems';
import NavigationItems from './NavigationItems';
import { menuData } from './constants';
import Profile from '../../Profile';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <AvatarContainer>
        <Profile />
      </AvatarContainer>

      <Divider />

      <MenuItemsContainer>
        <NavigationItems options={menuData} />
        <ChatItems
          title="General"
          options={['Starred', 'Development', 'Meets']}
        />
        <ChatItems title="Off-Topic" options={['Food', 'Hobby', 'Sports']} />
      </MenuItemsContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  margin-top: 16px;
`;

const AvatarContainer = styled.div`
  display: flex;
  padding: 16px;
  margin-bottom: 8px;
`;
