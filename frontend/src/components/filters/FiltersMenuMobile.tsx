import { useReducer } from 'react';
import { Button, Dialog, IconButton, Stack } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';

import useMediaValue from '../../hooks/useMediaValue';
import { AVATAR_WIDTH } from '../../utils/utils';
import FilterFieldMobile from './FilterFieldMobile';
import FilterFieldSwitch from './FilterFieldSwitch';
import FiltersTitle from './FiltersTitle';
import { FiltersMenuDeviceProps } from '../../types/FiltersMenuDeviceProps';

const FiltersMenuMobile = ({filter, updateFilter, chooseField, onFromChange, onToChange, onSubmit}: FiltersMenuDeviceProps) => {
  const [isOpened, toggleOpen] = useReducer((value) => !value, false);

  const marginTop = useMediaValue(AVATAR_WIDTH);

  const onFilterSubmit = () => {
    onSubmit();
    toggleOpen();
  };

  return (
    <>
      <IconButton 
        color='secondary'
        style={{
          position: 'absolute',
          right: '7vw',
          top: `calc(${marginTop}px + 8vh)`
        }}
        onClick={toggleOpen}>
          <FilterAlt sx={{width: '1.5em', height: '1.5em'}}/>
      </IconButton>

      <Dialog 
        hideBackdrop
        open={isOpened} 
        onClose={toggleOpen}
        maxWidth='md'
        fullWidth
        PaperProps={{
          style: {
            padding: '1em'
          }
        }}>
          <FiltersTitle />

          <Stack 
            display='flex'
            flexDirection='column'
            gap='5px'
            
            marginBottom='10px'>
              <FilterFieldMobile
                value={filter.title ?? ''}
                hidden={filter.title === undefined}
                name='Название'
                direction={filter.direction}
                selected={filter.sort === 'title'}
                onChange={(evt) => updateFilter({title: evt.target.value})}
                onChoice={() => chooseField('title')} />

              <FilterFieldMobile
                value={filter.name ?? ''}
                hidden={filter.name === undefined}
                name='Имя'
                direction={filter.direction}
                selected={filter.sort === 'first_name'}
                onChange={(evt) => updateFilter({name: evt.target.value})}
                onChoice={() => chooseField('first_name')} />

              <FilterFieldMobile
                value={filter.username}
                name='Логин'
                direction={filter.direction}
                selected={filter.sort === 'username'}
                onChange={(evt) => updateFilter({username: evt.target.value})}
                onChoice={() => chooseField('username')} />

              <FilterFieldMobile
                type='date'
                value={filter.from}
                name='От'
                direction={filter.direction}
                selected={filter.sort === 'date'}
                onChange={onFromChange}
                onChoice={() => chooseField('date')} />

              <FilterFieldMobile
                hideSort
                type='date'
                value={filter.to}
                name='До'
                direction={filter.direction}
                selected={filter.sort === 'date'}
                onChange={onToChange}
                onChoice={() => chooseField('date')} />

              <FilterFieldSwitch
                on={filter.archived ?? false}
                hidden={filter.archived === undefined}
                name='Ахрив'
                toggle={() => updateFilter({archived: !filter.archived})} />

              <FilterFieldSwitch
                on={filter.admin ?? false}
                hidden={filter.admin === undefined}
                name='Администратор'
                toggle={() => updateFilter({admin: !filter.admin})} />
          </Stack>
          
          <Button
            variant='containtedSecondary'
            onClick={onFilterSubmit}>
              Подтвердить
          </Button>
      </Dialog>
    </>
  );
};

export default FiltersMenuMobile;
