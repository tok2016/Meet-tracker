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

export type SummaryInfo = Omit<Summary, 'userId' | 'text'> & {hasText: boolean};

export type SummaryUpdate = Pick<Summary, 'id' | 'title' | 'text'>;

export type SummariesRaw = {
  summaries: SummaryInfo[],
  total: number
};

export const isSummary = (summary: unknown): summary is Summary => (summary as Summary).text !== undefined;
