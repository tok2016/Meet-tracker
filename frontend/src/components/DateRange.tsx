import { OutlinedInput, Stack } from '@mui/material';
import { ChangeEvent } from 'react';

type DateRangeProps = {
  to: string,
  from: string,
  onToChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onFromChange: (evt: ChangeEvent<HTMLInputElement>) => void
};

const DateRange = ({to, from, onToChange, onFromChange}: DateRangeProps) => {
  return (
    <Stack
      display='flex'
      flexDirection='row'
      gap='5px'
      alignItems='center'>
        <OutlinedInput
          type='date'
          value={from}
          onChange={onFromChange} />
        <OutlinedInput
          type='date'
          value={to}
          onChange={onToChange} />
    </Stack>
  );
};

export default DateRange;
