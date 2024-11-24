import { SerializedError } from '@reduxjs/toolkit';
import { Status } from './Status';

export default interface DefaultState {
  status: Status,
  error: SerializedError | undefined
};
