import { UserRaw } from './User';

export type UserValidationError = {[key in keyof UserRaw]: string | undefined};
