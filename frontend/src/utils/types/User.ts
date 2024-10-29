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

export type UserLogin = Pick<User, 'email' | 'password'>;

export const defaultUserData: UserRaw = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: ''
};

export const isUser = (user: User): user is User => (user as User).username !== undefined;
