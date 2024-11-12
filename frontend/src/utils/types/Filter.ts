export type FilterSortType = 'title' | 'username' | 'date' | 'name';

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
