import { Action, PayloadAction, SerializedError } from '@reduxjs/toolkit';

export type ActionWithError = PayloadAction<unknown, string, {
  arg: void;
  requestId: string;
  requestStatus: "rejected";
  aborted: boolean;
  condition: boolean;
} & ({
  rejectedWithValue: true;
} | ({
  rejectedWithValue: false;
} & {})), SerializedError>;

export const isActionWithError = (action: Action): action is ActionWithError => (action as ActionWithError).error !== undefined;
