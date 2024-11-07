import { Record } from './Record';
import { Status } from './Status';
import TopicContent from './TopicContent';

export type SummaryContent = {[topic: string]: TopicContent};

export default interface Summary {
  id: number,
  userId: number,
  title: string,
  date: string,
  text: SummaryContent,
  status: Status,
  record: Record
}

export type SummaryInfo = Omit<Summary, 'userId' | 'text'> & {hasText: boolean};

export type SummaryUpdate = Pick<Summary, 'id' | 'title' | 'text'>;

export type SummariesRaw = {
  summaries: SummaryInfo[],
  total: number
};

export type RawSummaryContent = {[topic: string]: string};

export type RawSummary = Omit<Summary, 'text'> & {text: RawSummaryContent};

export const isSummary = (summary: unknown): summary is Summary => (summary as Summary).text !== undefined;
