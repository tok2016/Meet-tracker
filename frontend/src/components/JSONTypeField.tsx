import { MenuItem, Select } from '@mui/material';

import { jsonTypes } from '../utils/utils';

const JSONTypeField = ({value}: {value: string}) => (
  <Select variant='outlined' value={value}>
    {Object.entries(jsonTypes).map((entry) => (
      <MenuItem key={entry[0]} value={entry[0]}>{entry[1]}</MenuItem>
    ))}
  </Select>
);

export default JSONTypeField;
