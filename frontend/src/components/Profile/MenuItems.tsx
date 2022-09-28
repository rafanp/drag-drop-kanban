import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import { AuthContextType } from '../../@types/authentication';
import { AuthContext } from '../../contexts/authentication/provider';
import useAuth from '../../hooks/useAuth';

const MenuItems = ({ anchorEl, handleClose, open }: any) => {
  // const { onLogout } = useContext(AuthContext) as AuthContextType;
  const { onLogout } = useAuth();

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose} disabled={true}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleClose} disabled={true}>
        My account
      </MenuItem>
      <MenuItem onClick={() => onLogout()}>Logout</MenuItem>
    </Menu>
  );
};

export default MenuItems;
