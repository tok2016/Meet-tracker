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
  record: Record,
  audioId: string | number
}

export type SummaryInfo = Omit<Summary, 'userId' | 'text'> & {hasText: boolean};

export type SummaryUpdate = Pick<Summary, 'id' | 'title' | 'text'>;

export type SummariesRaw = {
  summaries: SummaryInfo[],
  total: number
};

export type RawSummaryContent = {[topic: string]: string};

export type RawSummary = Omit<Summary, 'text'> & {text: RawSummaryContent};

export type SmallSummary = Pick<RawSummary, 'date' | 'audioId' | 'text' | 'id'>;

export const isSummary = (summary: unknown): summary is Summary => (summary as Summary).text !== undefined;

export const defaultRecord: Record = {
  id: 0,
  file: '',
  userId: 0,
  isArchived: false
};

export const defaultSummary: Summary = {
  id: 0,
  userId: 0,
  title: '',
  text: {},
  date: (new Date()).toString(),
  record: defaultRecord,
  status: 'idle',
  audioId: 0
};
