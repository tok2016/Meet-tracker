import { FilterAlt, Search as SearchIcon } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

import FilterField from './FilterField';
import Search from './Search';
import Filter, { FilterSortType } from '../utils/types/Filter';
import DateRange from './DateRange';

type FilterMenuProps = {
  defaultFilter: Filter, 
  hidden?: boolean,
  submit: (filter: Filter) => void
};

const getSearchWord = (field: FilterSortType, filter: Filter) => {
  switch(field) {
    case 'title': 
      return filter.title ?? '';
    case 'first_name':
      return filter.name ?? '';
    default:
      return filter.username
  }
};

const FilterMenu = ({defaultFilter, hidden=true, submit}: FilterMenuProps) => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  const searchWord = getSearchWord(filter.sort, filter);

  const onSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    switch(filter.sort) {
      case 'title': 
        setFilter((prev) => ({...prev, title: evt.target.value}));
        break;
      case 'first_name':
        setFilter((prev) => ({...prev, name: evt.target.value}));
        break;
      default:
        setFilter((prev) => ({...prev, username: evt.target.value}));
    }
  };

  const chooseField = (selectedField: FilterSortType) => {
    if(selectedField === filter.sort) {
      setFilter((prev) => ({...prev, direction: -prev.direction}));
    } else {
      setFilter((prev) => ({...prev, direction: 1, sort: selectedField}))
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
      display={hidden ? 'none' : 'flex'}
      flexDirection='row'
      justifyContent='space-between'
      marginBottom='15px'>
        <Stack
          display='flex'
          flexDirection='row'
          alignItems='center'>
            <Stack display='flex' flexDirection='row' gap='5px'>
              <FilterAlt />
              <Typography variant='h3'>Сортировка: </Typography>
            </Stack>

            <FilterField 
              name='Название'
              hidden={typeof filter.title === 'undefined'}
              selected={filter.sort === 'title'}
              value={filter.title ?? ''}
              direction={filter.direction}
              onChoice={() => chooseField('title')}
              onCancel={() => setFilter((prev) => ({...prev, title: ''}))} />

            <FilterField 
              name='Имя'
              hidden={typeof filter.name === 'undefined'}
              selected={filter.sort === 'first_name'}
              value={filter.name ?? ''}
              direction={filter.direction}
              onChoice={() => chooseField('first_name')}
              onCancel={() => setFilter((prev) => ({...prev, name: ''}))} />

            <FilterField 
              name='Дата'
              selected={filter.sort === 'date'}
              value={filter.from ? `${filter.from} - ${filter.to}` : ''}
              direction={filter.direction}
              onChoice={() => chooseField('date')}
              onCancel={() => setFilter((prev) => ({...prev, from: '', to: ''}))} />

            <FilterField 
              name='Логин'
              selected={filter.sort === 'username'}
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
        </Stack>
        
        <Stack
          display='flex'
          flexDirection='row'
          gap='10px'>
            {filter.sort === 'date' 
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
    </Stack>
  );
};

export default FilterMenu;
