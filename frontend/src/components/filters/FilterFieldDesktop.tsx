import { ArrowDownward, ArrowUpward, Clear } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { breakpoints } from '../../theme/BasicTypography';

type FilterFieldProps = {
  name: string, 
  value: string,
  direction?: number, 
  hidden?: boolean,
  selected?: boolean,
  onChoice: () => void,
  onCancel: () => void
};

const FilterFieldDesktop = ({name, value, direction=1, hidden=false, selected=false, onChoice, onCancel}: FilterFieldProps) => {
  const variant = selected ? 'filterSelected' : (value ? 'filterValuable' : 'filter');

  return (
    <Stack
      display='flex'
      flexDirection='column'
      alignItems='center'
      position='relative'>
        <Button
          variant={variant}
          endIcon={selected ? (direction > 0 ? <ArrowUpward /> : <ArrowDownward />) : undefined}
          onClick={onChoice}
          style={{
            display: hidden ? 'none' : 'inherit',
          }}>
            {name}
        </Button>

        <Stack
          className='filter-value'
          display={!value ? 'none' : 'flex'}
          flexDirection='row'
          width='fit-content'
          maxWidth={`${name.length + 1}em`}
          position='absolute'
          sx={{
            cursor: 'pointer',
            [breakpoints.up('lg')]: {
              top: '2.25rem'
            },
            [breakpoints.only('xl')]: {
              top: '3rem'
            }
          }}
          onClick={onCancel}>
            <Typography 
              variant='subtitle1'
              overflow='hidden'
              textOverflow='ellipsis'
              textAlign='left'
              noWrap>
                {value}
            </Typography>
            <Clear />
        </Stack>
    </Stack>
  );
};

export default FilterFieldDesktop;
