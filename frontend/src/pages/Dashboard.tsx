import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DragDropContainer from '../components/DragDropContainer/DragDropContainer';
import styled from '@emotion/styled';

const Dashboard: React.FC = (props) => {
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
          DnD Kanban
        </Typography>
      </Box>
      <DragDropContainer />
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  height: 100%;
`;
