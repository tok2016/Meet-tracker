export type FilterSortType = 'title' | 'username' | 'first_name' | 'date';

export default interface Filter {
  sort: FilterSortType,
  direction: number,
  username: string,
  from: string,
  to: string,
  title?: string,
  name?: string,
  archived?: boolean,
  admin?: boolean
}

export const defaultFilter: Filter = {
  sort: 'title',
  direction: 0,
  username: '',
  from: '',
  to: '',
  title: '',
  name: '',
  archived: false,
  admin: false
};
