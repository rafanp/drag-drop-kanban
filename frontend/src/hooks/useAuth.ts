import React from 'react';
import { AuthContextType } from '../@types/authentication';
import { AuthContext } from '../contexts/authentication/provider';

const useAuth = () => {
  return React.useContext(AuthContext) as AuthContextType;
};

export default useAuth;
