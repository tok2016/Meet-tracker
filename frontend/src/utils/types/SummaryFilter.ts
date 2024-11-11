import Filter from './Filter'

export default interface SummaryFilter extends Filter {
  title: string,
  archived: boolean
};
