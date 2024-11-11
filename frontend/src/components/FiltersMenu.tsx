import { FilterAlt, Search as SearchIcon } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

import FilterField from './FilterField';
import Search from './Search';
import Filter, { FilterSortType } from '../utils/types/Filter';
import DateRange from './DateRange';

const getSearchWord = (field: FilterSortType, filter: Filter) => {
  switch(field) {
    case 'title': 
      return filter.title ?? '';
    case 'name':
      return filter.title ?? '';
    default:
      return filter.username
  }
};

const FilterMenu = ({defaultFilter, submit}: {defaultFilter: Filter, submit: (filter: Filter) => void}) => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [field, setField] = useState<FilterSortType>('title');

  const searchWord = getSearchWord(field, filter);

  const onSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(field === 'username') {
      setFilter((prev) => ({...prev, username: evt.target.value}));
    } else {
      setFilter((prev) => ({...prev, title: evt.target.value}));
    }
  };

  const chooseField = (selectedField: FilterSortType) => {
    if(selectedField === field) {
      setFilter((prev) => ({...prev, direction: -prev.direction}));
    } else {
      setField(selectedField);
    }
  };

  const onFromChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const start = new Date(evt.target.value);
    const end = new Date(filter.to);

    if(start > end) {
      setFilter((prev) => ({
        ...prev,
        from: prev.to,
        to: evt.target.value
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        from: evt.target.value
      }))
    }
  };

  const onToChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const start = new Date(filter.from);
    const end = new Date(evt.target.value);

    if(start > end) {
      setFilter((prev) => ({
        ...prev,
        to: prev.from,
        from: evt.target.value
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        to: evt.target.value
      }))
    }
  };

  const onFilterSubmit = () => {
    submit(filter);
  };

  return (
    <Stack 
      display='flex'
      flexDirection='row'
      alignItems='center'>
        <div>
          <FilterAlt />
          <Typography variant='h3' component='span'>Сортировка: </Typography>
        </div>

        <FilterField 
          name='Название'
          hidden={typeof filter.title === 'undefined'}
          selected={field === 'title'}
          value={filter.title ?? ''}
          direction={filter.direction}
          onChoice={() => chooseField('title')}
          onCancel={() => setFilter((prev) => ({...prev, title: ''}))} />

        <FilterField 
          name='Имя'
          hidden={typeof filter.name === 'undefined'}
          selected={field === 'name'}
          value={filter.name ?? ''}
          direction={filter.direction}
          onChoice={() => chooseField('name')}
          onCancel={() => setFilter((prev) => ({...prev, name: ''}))} />

        <FilterField 
          name='Дата'
          selected={field === 'date'}
          value={filter.from ? `${filter.from} - ${filter.to}` : ''}
          direction={filter.direction}
          onChoice={() => chooseField('date')}
          onCancel={() => setFilter((prev) => ({...prev, from: '', to: ''}))} />

        <FilterField 
          name='Логин'
          selected={field === 'username'}
          value={filter.username}
          direction={filter.direction}
          onChoice={() => chooseField('username')}
          onCancel={() => setFilter((prev) => ({...prev, username: ''}))} />

        <Button 
          variant={filter.archived ? 'filterValuable' : 'filter'}
          style={{
            display: typeof filter.archived === 'undefined' ? 'none' : 'inherit'
          }}
          onClick={() => setFilter((prev) => ({...prev, archived: !prev.archived}))}>
            Архив
        </Button>

        <Button
          variant={filter.admin ? 'filterValuable' : 'filter'}
          style={{
            display: typeof filter.admin === 'undefined' ? 'none' : 'inherit'
          }}
          onClick={() => setFilter((prev) => ({...prev, admin: !prev.admin}))}>
            Администратор
        </Button>
        
        {field === 'date' 
          ? <DateRange
              to={filter.to}
              from={filter.from}
              onToChange={onToChange}
              onFromChange={onFromChange} />
          : <Search 
              word={searchWord}
              onChange={onSearchChange}
              onSubmit={onFilterSubmit} />}

        <IconButton
          color='secondary'
          onClick={onFilterSubmit}>
          <SearchIcon />
        </IconButton>
    </Stack>
  );
};

export default FilterMenu;
