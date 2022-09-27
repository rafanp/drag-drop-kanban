import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
// import { Container, Header, Navbar, Main } from './styles';
// import HeaderComponent from './Header';
// import Sidebar from './Sidebar';

const PageLayout: React.FunctionComponent = (props) => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Let's Code Kanban
        </Typography>
      </Box>
      {/* <Header>
        <HeaderComponent />
      </Header>
      <Navbar>
        <Sidebar />
      </Navbar>
      <Main> */}
      <Outlet />
      {/* </Main> */}
    </Container>
  );
};

export default PageLayout;
