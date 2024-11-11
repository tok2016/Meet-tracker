import { ArrowDownward, ArrowUpward, Clear } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

type FilterFieldProps = {
  name: string, 
  value: string,
  direction?: number, 
  hidden?: boolean,
  selected?: boolean,
  onChoice: () => void,
  onCancel: () => void
};

const FilterField = ({name, value, direction=1, hidden=false, selected=false, onChoice, onCancel}: FilterFieldProps) => {
  const variant = selected ? 'filterSelected' : (value ? 'filterValuable' : 'filter');

  return (
    <Stack
      display='flex'
      flexDirection='column'>
      <Button
        variant={variant}
        endIcon={direction > 0 ? <ArrowUpward /> : <ArrowDownward />}
        onClick={onChoice}
        style={{
          display: hidden ? 'none' : 'inherit',
        }}>
        {name}
      </Button>
      
      <Button
        variant='filterValue'
        endIcon={<Clear />}
        onClick={onCancel}
        style={{
          display: value ? 'inherit' : 'none',
          overflowX: 'hidden'
        }}>
          {value}
      </Button>
    </Stack>
  );
};

export default FilterField;
