import KanbanProvider from './contexts/kanban/provider';
import AppRoutes from './routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
const App = () => {
  return (
    <Router>
      <KanbanProvider>
        <AppRoutes />
      </KanbanProvider>
    </Router>
  );
};

export default App;
