import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, SxProps, TextField, Theme } from '@mui/material';
import { ChangeEvent, useReducer } from 'react';
import MediaValue from '../../types/MediaValue';
import useMediaValue from '../../hooks/useMediaValue';

type PasswordFieldProps = {
  value: string, 
  label?: string,
  errorMessage: string | undefined,
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
};

const PASSWORD_VISIBILITY_ICON: MediaValue = {
  xs: '1em',
  sm: '1em',
  md: '1.5em',
  lg: '1em',
  xl: '1.5em'
};

const PasswordField = ({value, label='Пароль', errorMessage, onChange}: PasswordFieldProps) => {
  const [isVisible, toggleVisibility] = useReducer((value) => !value, false);
  const visibilityIconWidth = useMediaValue(PASSWORD_VISIBILITY_ICON);

  const iconSx: SxProps<Theme> = {width: visibilityIconWidth, height: visibilityIconWidth};

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
                        {isVisible ? <VisibilityOff sx={iconSx} /> : <Visibility sx={iconSx} />}
                      </IconButton>
      }
    }}/>        
  );
};

export default PasswordField;
