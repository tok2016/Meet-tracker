import { ChangeEvent, useState } from 'react';

import Filter, { FilterSortType } from '../../types/Filter';
import useMediaMatch from '../../hooks/useMediaMacth';
import FiltersMenuDesktop from './FiltersMenuDesktop';
import FiltersMenuMobile from './FiltersMenuMobile';

type FilterMenuProps = {
  defaultFilter: Filter, 
  hidden?: boolean,
  submit: (filter: Filter) => void
};

const FilterMenu = ({defaultFilter, hidden=true, submit}: FilterMenuProps) => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const {medium} = useMediaMatch();

  const updateFilter = (update: Partial<Filter>) => {
    setFilter((prev) => ({...prev, ...update}));
  };

  const chooseField = (selectedField: FilterSortType) => {
    if(selectedField === filter.sort) {
      updateFilter({direction: -filter.direction});
    } else {
      updateFilter({direction: 1, sort: selectedField});
    }
  };

  const onFromChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const start = new Date(evt.target.value);
    const end = new Date(filter.to);

    const update: Partial<Filter> = start > end
      ? {from: filter.to, to: evt.target.value}
      : {from: evt.target.value};

    updateFilter(update);
  };

  const onToChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const start = new Date(filter.from);
    const end = new Date(evt.target.value);

    const update: Partial<Filter> = start > end
      ? {to: filter.from, from: evt.target.value}
      : {to: evt.target.value};

    updateFilter(update);
  };

  const onFilterSubmit = () => {
    submit(filter);
  };

  if(hidden) {
    return;
  }

  return (
    medium
      ? <FiltersMenuMobile
          filter={filter}
          updateFilter={updateFilter}
          chooseField={chooseField}
          onFromChange={onFromChange}
          onToChange={onToChange}
          onSubmit={onFilterSubmit} />
      : <FiltersMenuDesktop
          filter={filter}
          updateFilter={updateFilter}
          chooseField={chooseField}
          onFromChange={onFromChange}
          onToChange={onToChange}
          onSubmit={onFilterSubmit} />
  );
};

export default FilterMenu;
