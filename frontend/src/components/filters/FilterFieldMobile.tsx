import { ChangeEvent } from 'react';
import { IconButton, Stack, SxProps, TextField, Theme, Typography } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

type FilterFieldMobileProps = {
  name: string, 
  value: string,
  downMedium: boolean,
  type?: 'text' | 'number' | 'date',
  hidden?: boolean,
  hideSort?: boolean,
  selected?: boolean,
  direction?: number,
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onChoice: () => void
};

const FILTER_SORT_ICON_WIDTH = '1.5em';

const FilterSortIconSx: SxProps<Theme> = {
  width: FILTER_SORT_ICON_WIDTH,
  height: FILTER_SORT_ICON_WIDTH
};

const FilterFieldMobile = ({
  name, 
  value, 
  downMedium, 
  hidden=false, 
  type='text', 
  hideSort=false, 
  selected=false, 
  direction=1, 
  onChange, 
  onChoice
}: FilterFieldMobileProps) => (
  <Stack
    display={hidden ? 'none' : 'flex'}
    flexDirection='row'
    flex={type === 'date' ? `2em 1 ${FILTER_SORT_ICON_WIDTH}` : `1 ${FILTER_SORT_ICON_WIDTH}`}
    gap='7px'
    alignItems='center'>
      <Typography display={type === 'date' ? 'inline' : 'none'} variant={downMedium ? 'body1' : 'h4'} fontWeight={400}>
        {name}:
      </Typography>

      <TextField
        fullWidth
        type={type}
        variant='outlined'
        value={value}
        label={type === 'date' ? '' : name}
        onChange={onChange} />

      <IconButton 
        color={selected ? 'primary' : 'secondary'}
        onClick={onChoice}
        sx={{
          display: hideSort ? 'none' : 'block'
        }}>
          {direction > 0 ? <ArrowUpward sx={FilterSortIconSx} /> : <ArrowDownward sx={FilterSortIconSx} />}
      </IconButton>
  </Stack>
);

export default FilterFieldMobile;
