import { UserValidationError } from './UserValidationError';

export interface User {
  readonly id: number,
  readonly username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  registrationDate: string,
  isAdmin: boolean,
  avatar: string,
};

export type UserRaw = Omit<User, 'id' | 'registrationDate' | 'isAdmin'>;

export type UserRawWithError = UserRaw & {error: UserValidationError};

export type UserLogin = Pick<User, 'email' | 'password'>;

export type UserPassword = Pick<User, 'id' | 'password'>;

export type UsersRaw = {
  users: User[],
  total: number
};

export const defaultUserData: UserRaw = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: ''
};

export const defaultUser: User = {
  id: 0,
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  registrationDate: (new Date()).toString(),
  isAdmin: false,
  avatar: ''
}

export const isUser = (user: unknown): user is User => (user as User).username !== undefined;
