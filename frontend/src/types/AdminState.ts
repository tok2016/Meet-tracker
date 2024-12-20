import DefaultState from './DefaultState';
import Summary, { SummaryInfo } from './Summary';
import { User } from './User';

export default interface AdminState extends DefaultState {
  users: User[],
  user: User,
  usersTotal: number,
  summaries: SummaryInfo[],
  summary: Summary,
  summariesTotal: number,
  userError: string | undefined,
  summaryError: string | undefined
};
