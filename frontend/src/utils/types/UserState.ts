import { SerializedError } from '@reduxjs/toolkit';

import { Status } from './Status';
import Token from './Token';
import { UserWithSummaries } from './User';

export default interface UserState {
  user: UserWithSummaries,
  auth: Token,
  status: Status,
  error: SerializedError | undefined
};
