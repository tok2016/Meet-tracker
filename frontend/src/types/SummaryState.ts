import DefaultState from './DefaultState';
import { Status } from './Status';
import Summary, { SummaryInfo } from './Summary';

export default interface SummaryState extends DefaultState {
  summary: Summary,
  summaries: SummaryInfo[],
  total: number,
  recordError: string | undefined,
  listStatus: Status,
  listError: string | undefined,
  fileStatus: Status,
  audioStatus: Status
};
