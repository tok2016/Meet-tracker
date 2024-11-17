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

export type UsersRaw = {
  users: User[],
  total: number
};

export type UserQuery = Pick<User, 'id' | 'username'>;

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

export const isUser = (user: User): user is User => (user as User).username !== undefined;
