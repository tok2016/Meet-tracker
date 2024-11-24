import Token from './Token';
import { User } from './User';
import DefaultState from './DefaultState';

export default interface UserState extends DefaultState {
  user: User,
  auth: Token,
  wasLoggedOut: boolean
};
