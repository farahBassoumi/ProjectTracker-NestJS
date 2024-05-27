import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('auth');

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<any>(token);
    return decodedToken.sub;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
