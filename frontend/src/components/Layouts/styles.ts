import styled from '@emotion/styled';

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.div`
  display: grid;
  height: 100vh;

  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px 1fr;
  grid-template-areas: 'nav header' 'nav main';
`;

const Header = styled.div`
  grid-area: header;
`;
const Navbar = styled.div`
  grid-area: nav;
`;
const Main = styled.div`
  grid-area: main;
`;

export { FlexContainer, Main, Container, Header, Navbar };
