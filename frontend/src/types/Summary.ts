import { FileFormat } from './FileFormat';
import { Status } from './Status';
import TopicContent from './TopicContent';

export default interface Summary {
  id: number,
  userId: number,
  title: string,
  creationDate: string,
  text: TopicContent[],
  status: Status,
  audioId: string | number,
  audio: string
}

export type SummaryInfo = Omit<Summary, 'userId' | 'text'> & {hasText: boolean};

export type SummaryUpdate = Pick<Summary, 'id' | 'title' | 'text'>;

export type SummariesRaw = {
  summaries: SummaryInfo[],
  total: number
};

export type RawSummary = Omit<Summary, 'text' | 'status'> & {text: string};

export type SummaryInput = Pick<Summary, 'title' | 'text'>;

export type SummaryFile = Pick<Summary, 'id'> & {format: FileFormat};

export const isSummary = (summary: unknown): summary is Summary => (summary as Summary).text !== undefined;

export const defaultSummary: Summary = {
  id: 0,
  userId: 0,
  title: '',
  text: [],
  creationDate: (new Date()).toString(),
  status: 'idle',
  audioId: '',
  audio: ''
};
