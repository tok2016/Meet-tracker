import { Stack, Switch, Typography } from '@mui/material';

type FilterFieldSwitchProps = {
  on: boolean,
  hidden?: boolean,
  name: string,
  toggle: () => void
}

const FilterFieldSwitch = ({on, hidden=false, name, toggle}: FilterFieldSwitchProps) => (
  <Stack
    display={hidden ? 'none' : 'flex'}
    flexDirection='row'
    gap='7px'
    alignItems='center'>
      <Typography variant='body1'>
        {name}
      </Typography>

      <Switch value={on} onChange={toggle} />
  </Stack>
);

export default FilterFieldSwitch;
