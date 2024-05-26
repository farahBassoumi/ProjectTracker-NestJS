export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string; // Note: Not excluding password field for simplicity
  createdAt: Date;
}
