import { BrowserRouter as Router } from 'react-router-dom';
import KanbanProvider from './contexts/kanban/provider';
import AuthenticationProvider from './contexts/authentication/provider';
import AppRoutes from './routes';

const App = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <KanbanProvider>
          <AppRoutes />
        </KanbanProvider>
      </AuthenticationProvider>
    </Router>
  );
};

export default App;
