import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setCredentials, logout } from '../store/authSlice';
import { type AuthResponse } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    login: (data: AuthResponse) => dispatch(setCredentials(data)),
    logout: () => dispatch(logout()),
  };
};