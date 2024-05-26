import { UnauthorizedError } from 'errors/UnauthorizedError';
import { User } from 'interfaces/User';

export function user(): User {
  const userString = localStorage.getItem('user');

  if (!userString) {
    throw new UnauthorizedError();
  }

  return JSON.parse(userString);
}
