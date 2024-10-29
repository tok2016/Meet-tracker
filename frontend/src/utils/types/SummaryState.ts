import DefaultState from './DefaultState';
import { Summary, SummaryInfo } from './Summary';

export default interface SummaryState extends DefaultState {
  summary: Summary,
  summaries: SummaryInfo[],
  total: number
};
