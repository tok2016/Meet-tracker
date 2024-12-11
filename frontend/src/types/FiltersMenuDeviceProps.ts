import { ChangeEvent } from 'react';

import Filter, { FilterSortType } from './Filter';

export type FiltersMenuDeviceProps = {
  filter: Filter, 
  updateFilter: (filter: Partial<Filter>) => void,
  chooseField: (selectedField: FilterSortType) => void,
  onFromChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onToChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void
};
