export class UnauthorizedError extends Error {
  constructor(message = '', ...args: any) {
    super(message, ...args);
  }
}
