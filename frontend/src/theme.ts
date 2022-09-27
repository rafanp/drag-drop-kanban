import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5B324',
      contrastText: 'rgba(255,255,255,0.87)',
      dark: '#efac21',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
