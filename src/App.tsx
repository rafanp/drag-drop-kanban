import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './components/ProTip';
import DragDropContainer from './components/DragDropContainer';
import KanbanProvider from './contexts/kanban/provider';

const App = () => {
  return (
    <KanbanProvider>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App example with TypeScript
          </Typography>
          <ProTip />
        </Box>
        <DragDropContainer />
      </Container>
    </KanbanProvider>
  );
};

export default App;
