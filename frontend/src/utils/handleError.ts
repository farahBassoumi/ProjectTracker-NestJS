import { UnauthorizedError } from 'errors/UnauthorizedError';
import { NavigateFunction } from 'react-router-dom';

export function handleError(error: Error, navigate: NavigateFunction) {
  if (error instanceof UnauthorizedError) {
    navigate('/sign-in');
  } else {
    throw error;
  }
}
