import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DragDropContainer from './components/DragDropContainer/DragDropContainer';
import KanbanProvider from './contexts/kanban/provider';

const App = () => {
  return (
    <KanbanProvider>
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
        <DragDropContainer />
      </Container>
    </KanbanProvider>
  );
};

export default App;
