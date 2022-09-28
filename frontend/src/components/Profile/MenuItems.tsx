import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuItems = ({ anchorEl, handleClose, open }: any) => {
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
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  );
};

export default MenuItems;
