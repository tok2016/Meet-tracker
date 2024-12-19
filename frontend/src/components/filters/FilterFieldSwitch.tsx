import { Stack, Switch, Typography } from '@mui/material';

type FilterFieldSwitchProps = {
  on: boolean,
  downMedium: boolean,
  hidden?: boolean,
  name: string,
  toggle: () => void
}

const FilterFieldSwitch = ({on, downMedium, hidden=false, name, toggle}: FilterFieldSwitchProps) => (
  <Stack
    display={hidden ? 'none' : 'flex'}
    flexDirection='row'
    gap='7px'
    alignItems='center'>
      <Typography variant={downMedium ? 'body1' : 'h4'} fontWeight={400}>
        {name}
      </Typography>

      <Switch value={on} onChange={toggle} />
  </Stack>
);

export default FilterFieldSwitch;
