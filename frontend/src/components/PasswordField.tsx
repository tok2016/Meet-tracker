import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, useReducer } from 'react';

type PasswordFieldProps = {
  value: string, 
  label?: string,
  errorMessage: string | undefined,
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
};

const PasswordField = ({value, label='Пароль', errorMessage, onChange}: PasswordFieldProps) => {
  const [isVisible, toggleVisibility] = useReducer((value) => !value, false);

  return (
    <TextField 
      value={value}
      type={isVisible ? 'text' : 'password'}
      label={label}
      required
      helperText={errorMessage}
      onChange={onChange}
      slotProps={{
      input: {
        endAdornment: <IconButton color='secondary' onClick={toggleVisibility}>
                        {isVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
      }
    }}/>        
  );
};

export default PasswordField;
