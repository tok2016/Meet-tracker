import { Record } from './Record';
import { Status } from './Status';

export interface Summary {
  id: number,
  userId: number,
  title: string,
  date: string,
  text: string,
  status: Status,
  record: Record
}

export type SummaryInfo = Omit<Summary, 'userId'>;
