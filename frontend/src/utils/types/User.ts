import { Summary } from './Summary';

export interface User {
  readonly id: number,
  readonly username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  registrationDate: string,
  isAdmin: boolean,
  avatar: string
};

export interface UserWithSummaries extends User {
  summaries: Summary[]
}

export type UserRaw = Omit<User, 'id' | 'registrationDate' | 'isAdmin'>;

export type UserLogin = Pick<User, 'email' | 'password'>;

export const defaultUserData: UserRaw = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: ''
};
