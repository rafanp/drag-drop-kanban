import * as React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

const LoginLayout: React.FunctionComponent = (props) => {
  return (
    <Container>
      <CoolImage />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default LoginLayout;

const Container = styled.div`
  display: grid;
  height: 100vh;

  /* grid-template-columns: 200px 1fr; */
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 100px 1fr; */
  /* grid-template-areas: 'nav header' 'nav main'; */
  grid-template-areas: 'cool main';
`;

const Header = styled.div`
  grid-area: header;
`;
const Navbar = styled.div`
  grid-area: nav;
`;
const CoolImage = styled.div`
  grid-area: cool;
  /* background-image: url(https://images.unsplash.com/photo-1664214220852-1a701cd596aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80); */
  background-image: url(https://images.unsplash.com/photo-1663704413984-ffc91bc84cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  /* background-color: aliceblue; */
`;
const Main = styled.div`
  grid-area: main;
`;

// export { Main, Container, Header, Navbar };
