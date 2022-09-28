import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Navbar, Main, Container } from './styles';
// import HeaderComponent from './Header';
import Sidebar from './Sidebar';

const PageLayout: React.FunctionComponent = (props) => {
  return (
    <Container>
      <Navbar>
        <Sidebar />
      </Navbar>
      {/* <Header>
        <HeaderComponent />
      </Header> */}
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default PageLayout;
