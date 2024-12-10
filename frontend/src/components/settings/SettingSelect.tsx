import { MenuItem, Select, Stack, Typography } from '@mui/material';

interface SettingSelectProps<ValueType extends string> {
  label: string,
  value: ValueType,
  values: ValueType[],
  select: (value: ValueType) => void
};

const SettingSelect = <ValueType extends string, >({label, value, values, select}: SettingSelectProps<ValueType>) => (
  <Stack alignSelf='flex-start'>
    <Typography variant='h3' textAlign='left' marginBottom='5px'>
      {label}
    </Typography>

    <Select 
      value={value}
      onChange={(evt) => select(evt.target.value as ValueType)}>
        {values.map((val) => (
          <MenuItem key={val} value={val}>{val}</MenuItem>
        ))}
    </Select>
  </Stack>
);

export default SettingSelect;
