import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DragDropContainer from '../components/DragDropContainer/DragDropContainer';

const Dashboard: React.FC = (props) => {
  return (
    <Container>
      <DragDropContainer />
    </Container>
  );
};

export default Dashboard;
