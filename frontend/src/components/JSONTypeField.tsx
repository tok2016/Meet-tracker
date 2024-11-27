import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { jsonTypes } from '../utils/utils';

type JSONTypeFieldProps = {
  value: string,
  onSelect: (evt: SelectChangeEvent<string>) => void
};

const JSONTypeField = ({value, onSelect}: JSONTypeFieldProps) => (
  <Select 
    variant='outlined' 
    value={value} 
    onChange={onSelect}
    sx={{
      textAlign: 'center',
      width: '100%',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      border: 0,
      '.MuiOutlinedInput-notchedOutline': { 
        border: 0 
      }
    }}>
      {Object.entries(jsonTypes).map((entry) => (
        <MenuItem key={entry[0]} value={entry[0]}>{entry[1]}</MenuItem>
      ))}
  </Select>
);

export default JSONTypeField;
