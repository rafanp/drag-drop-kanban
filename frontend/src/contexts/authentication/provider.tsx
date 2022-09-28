import { useContext, createContext, useState, useEffect } from 'react';

import { AuthContextType } from '../../@types/authentication';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

interface ILoginProps {
  email: string;
  password: string;
}

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [me, setMe] = useState({});

  const handleLogin = async (data: ILoginProps) => {
    const { email, password } = data;
    const response = await api.post('/users/login', {
      email,
      password,
    });
    console.log('response :', response);
    if (response.status === 200 && response.data) {
      const { _id, email, name, token } = response.data;
      setToken(token);
      setMe({ _id, email, name });
    }
    // const token = await fakeAuth();
    const token = 'qweqweqwe';

    // setToken(token);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ token, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthentication() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthenticationProvider;
