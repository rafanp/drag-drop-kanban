import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const NavigationItems = ({ options }: any) => {
  return (
    <List component="div" disablePadding>
      {options.map((option: any, index: number) => {
        return (
          <ListItemButton
            selected={option.active}
            key={`${option.title}-${index}`}
          >
            <ListItemIcon sx={{ minWidth: 24 }}>{option.icon}</ListItemIcon>
            <ListItemText primary={option.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default NavigationItems;
