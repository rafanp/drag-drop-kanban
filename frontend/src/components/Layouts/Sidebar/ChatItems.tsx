import { useState } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FaHashtag } from 'react-icons/fa';

const ChatItems = ({ title, options }: any) => {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={title} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {options.map((option: string, index: number) => {
            return (
              <ListItemButton sx={{ pl: 4 }} key={`${option}-${index}`}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <FaHashtag />
                </ListItemIcon>
                <ListItemText primary={option} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default ChatItems;
