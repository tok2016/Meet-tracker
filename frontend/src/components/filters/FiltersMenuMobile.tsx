import { useReducer } from 'react';
import { Button, Dialog, IconButton, Stack } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';

import useMediaValue from '../../hooks/useMediaValue';
import { AVATAR_WIDTH, SIDEBAR_BUTTON_WIDTH } from '../../theme/MediaValues';
import FilterFieldMobile from './FilterFieldMobile';
import FilterFieldSwitch from './FilterFieldSwitch';
import FiltersTitle from './FiltersTitle';
import { FiltersMenuDeviceProps } from '../../types/FiltersMenuDeviceProps';
import UIColors from '../../utils/Colors';
import useMediaMatch from '../../hooks/useMediaMacth';

const FiltersMenuMobile = ({filter, updateFilter, chooseField, onFromChange, onToChange, onSubmit}: FiltersMenuDeviceProps) => {
  const [isOpened, toggleOpen] = useReducer((value) => !value, false);

  const {small} = useMediaMatch();
  const marginTop = useMediaValue(AVATAR_WIDTH);
  const filterButtonWidth = useMediaValue(SIDEBAR_BUTTON_WIDTH);

  const onFilterSubmit = () => {
    onSubmit();
    toggleOpen();
  };

  return (
    <>
      <IconButton 
        color='secondary'
        sx={(theme) => theme.components?.MuiIconButton 
          ? {
              ...theme.components.MuiIconButton,
              position: 'fixed',
              zIndex: 0,
              right: 0,
              top: `calc(${marginTop}px + 8vh)`,
              padding: '4px',
              backgroundColor: UIColors.palette.backgroundColor,
              borderRadius: '50% 0 0 50%',
              boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);'
            } 
          : {}}
        onClick={toggleOpen}>
          <FilterAlt sx={{width: filterButtonWidth, height: filterButtonWidth}}/>
      </IconButton>

      <Dialog 
        hideBackdrop
        open={isOpened} 
        onClose={toggleOpen}
        maxWidth={small ? 'md' : 'xs'}
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
                downMedium={small}
                name='Название'
                direction={filter.direction}
                selected={filter.sort === 'title'}
                onChange={(evt) => updateFilter({title: evt.target.value})}
                onChoice={() => chooseField('title')} />

              <FilterFieldMobile
                value={filter.name ?? ''}
                hidden={filter.name === undefined}
                downMedium={small}
                name='Имя'
                direction={filter.direction}
                selected={filter.sort === 'first_name'}
                onChange={(evt) => updateFilter({name: evt.target.value})}
                onChoice={() => chooseField('first_name')} />

              <FilterFieldMobile
                value={filter.username}
                name='Логин'
                downMedium={small}
                direction={filter.direction}
                selected={filter.sort === 'username'}
                onChange={(evt) => updateFilter({username: evt.target.value})}
                onChoice={() => chooseField('username')} />

              <FilterFieldMobile
                type='date'
                value={filter.from}
                name='От'
                downMedium={small}
                direction={filter.direction}
                selected={filter.sort === 'date'}
                onChange={onFromChange}
                onChoice={() => chooseField('date')} />

              <FilterFieldMobile
                hideSort
                type='date'
                value={filter.to}
                name='До'
                downMedium={small}
                direction={filter.direction}
                selected={filter.sort === 'date'}
                onChange={onToChange}
                onChoice={() => chooseField('date')} />

              <FilterFieldSwitch
                on={filter.archived ?? false}
                downMedium={small}
                hidden={filter.archived === undefined}
                name='Ахрив'
                toggle={() => updateFilter({archived: !filter.archived})} />

              <FilterFieldSwitch
                on={filter.admin ?? false}
                downMedium={small}
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
