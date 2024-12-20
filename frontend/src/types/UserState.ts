import Token from './Token';
import { User } from './User';
import DefaultState from './DefaultState';

export default interface UserState extends DefaultState {
  user: User,
  auth: Token,
  wasLoggedOut: boolean,
  passwordError: string | undefined,
  avatarError: string | undefined,
  loginError: string | undefined,
  registerError: string | undefined
};
