import { FilterAlt, Search as SearchIcon } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

import FilterFieldDesktop from './FilterFieldDesktop';
import DateRange from './DateRange';
import Search from './Search';
import Filter, { FilterSortType } from '../../types/Filter';
import { FiltersMenuDeviceProps } from '../../types/FiltersMenuDeviceProps';

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

const FiltersMenuDesktop = ({filter, updateFilter, chooseField, onFromChange, onToChange, onSubmit}: FiltersMenuDeviceProps) => {
  const searchWord = getSearchWord(filter.sort, filter);

  const onSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    switch(filter.sort) {
      case 'title': 
        updateFilter({title: evt.target.value});
        break;
      case 'first_name':
        updateFilter({name: evt.target.value});
        break;
      default:
        updateFilter({username: evt.target.value});
    }
  };

  return (
    <Stack 
      display='flex'
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

            <FilterFieldDesktop 
              name='Название'
              hidden={typeof filter.title === 'undefined'}
              selected={filter.sort === 'title'}
              value={filter.title ?? ''}
              direction={filter.direction}
              onChoice={() => chooseField('title')}
              onCancel={() => updateFilter({title: ''})} />

            <FilterFieldDesktop 
              name='Имя'
              hidden={typeof filter.name === 'undefined'}
              selected={filter.sort === 'first_name'}
              value={filter.name ?? ''}
              direction={filter.direction}
              onChoice={() => chooseField('first_name')}
              onCancel={() => updateFilter({name: ''})} />

            <FilterFieldDesktop 
              name='Дата'
              selected={filter.sort === 'date'}
              value={filter.from ? `${filter.from} - ${filter.to}` : ''}
              direction={filter.direction}
              onChoice={() => chooseField('date')}
              onCancel={() => updateFilter({from: '', to: ''})} />

            <FilterFieldDesktop 
              name='Логин'
              selected={filter.sort === 'username'}
              value={filter.username}
              direction={filter.direction}
              onChoice={() => chooseField('username')}
              onCancel={() => updateFilter({username: ''})} />

            <Button 
              variant={filter.archived ? 'filterValuable' : 'filter'}
              style={{
                display: typeof filter.archived === 'undefined' ? 'none' : 'inherit'
              }}
              onClick={() => updateFilter({archived: !filter.archived})}>
                Архив
            </Button>

            <Button
              variant={filter.admin ? 'filterValuable' : 'filter'}
              style={{
                display: typeof filter.admin === 'undefined' ? 'none' : 'inherit'
              }}
              onClick={() => updateFilter({admin: !filter.admin})}>
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
                  onSubmit={onSubmit} />}

            <IconButton
              color='secondary'
              onClick={onSubmit}>
              <SearchIcon />
            </IconButton>
        </Stack>
    </Stack>
  );
};

export default FiltersMenuDesktop;
