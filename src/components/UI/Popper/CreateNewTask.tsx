import * as React from 'react';
import Box from '@mui/material/Box';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import BasicCard from '../Card';

export default function PositionedPopper(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const onClickConfirm = async (data: any) => {
    try {
      const result = await props.createNewTask(data);
      setOpen(false);
      return result;
    } catch (err) {
      console.error('Erro ao confirmar', err);
    }
  };

  return (
    <Box sx={{ width: 500 }}>
      <Popper open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <BasicCard
                task={{ titulo: 'qwe' }}
                type="new"
                onCancel={() => setOpen((previousOpen) => !previousOpen)}
                onConfirm={(e: any) => onClickConfirm(e)}
              />
            </Paper>
          </Fade>
        )}
      </Popper>

      <Grid container justifyContent="center">
        <Grid item>
          <IconButton aria-label="right" onClick={handleClick}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
