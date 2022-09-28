import { Avatar, Typography } from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import MenuItems from './MenuItems';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ProfileButton onClick={handleClick}>
        <Avatar sx={{ bgcolor: '#1A66EA' }} variant="rounded">
          RN
        </Avatar>
        <Typography fontWeight={500}>Rafael Neves</Typography>
      </ProfileButton>

      <MenuItems open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default Profile;

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProfileButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 0;
  background-color: transparent;
  &:hover {
    filter: opacity(70%);
  }
`;
