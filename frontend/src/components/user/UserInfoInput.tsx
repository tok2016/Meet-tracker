import { IconButton, Input, Paper, Stack, Typography } from '@mui/material';
import { HTMLInputTypeAttribute, KeyboardEvent, useEffect, useReducer, useState } from 'react';
import { Check, Close, Edit } from '@mui/icons-material';

import IconForInput from './IconForInput';
import UIColors from '../../utils/Colors';
import CopyButton from './CopyButton';
import { UserIconSx } from '../../theme/UserIcon';
import userSchema from '../../schemas/userSchema';
import { User, UserRaw } from '../../types/User';
import { isValidationError } from '../../schemas/validationError';

type UserInfoInputProps = {
  label: string,
  defaultValue: string,
  type: HTMLInputTypeAttribute,
  path: keyof User,
  readOnly?: boolean,
  disabled?: boolean,
  apply: (update: string) => void,
  openMenu?: () => void
};

const UserInfoInput = ({
  label, 
  defaultValue, 
  type, 
  path, 
  readOnly=false, 
  disabled=false, 
  apply, 
  openMenu=() => {}
}: UserInfoInputProps) => {
  const [isEditable, toggleEdit] = useReducer((value) => (type === 'password' ? value : !value), false);
  const [value, setValue] = useState<string>(defaultValue);
  const [error, setError] = useState<string | undefined>();

  const validateValue = (update: Partial<UserRaw>) => {
    const path = Object.keys(update)[0];

    try {
      const validated = userSchema.validateSyncAt(path, update);
      setValue(validated);
      setError(undefined);
    } catch(err) {
      if(isValidationError(err)) {
        setValue(err.value);
        setError(err.message);
      }
    }
  };

  const onApply = () => {
    apply(value);
    toggleEdit();
  }

  const onCancel = () => {
    setValue(defaultValue);
    setError(undefined);
    toggleEdit();
  }

  const onKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if(evt.key === 'Enter') {
      onApply();
    } else if(evt.key === 'Esc') {
      onCancel();
    }
  }
  
  const onEditClick = () => {
    toggleEdit();
    openMenu();
  };

  useEffect(() => {
    if(defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue]);

  return (
    <Paper 
      variant='elevationInput'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: readOnly ? UIColors.palette.quaternaryColor : UIColors.palette.backgroundColor,
        marginBottom: '20px'
      } : {})}>

      <Stack
        display='flex'
        flexDirection='row'
        alignItems='center'
        gap='10px'
        width='100%'>
        <IconForInput type={type} readOnly={readOnly}/>

        <Stack
          display='flex'
          flexDirection='column'
          gap='1px'
          width='100%'>
            <Typography variant='body1' width='100%'>{label}</Typography>
            <Input
              disableUnderline 
              type={type} 
              value={value} 
              readOnly={readOnly || !isEditable || type === 'password'}
              disabled={disabled} 
              onChange={(evt) => validateValue({[path]: evt.target.value})}
              onKeyDown={onKeyDown}
              sx={{
                width: '100%'
              }}
              inputProps={{
                style: {
                  padding: '2px 0px'
                }
              }} />
              <Typography 
                variant='subtitle1'
                color={UIColors.palette.errorColor}>
                  {error}
              </Typography>
        </Stack>
      </Stack>

      {readOnly 
        ? <CopyButton value={value} onError={() => {}}/> 
        : (isEditable 
          ? <Stack 
              display='flex'
              flexDirection='row'
              gap='10px'>
                <IconButton 
                  disabled={error !== undefined} 
                  color='secondary' 
                  onClick={onApply}>
                    <Check sx={UserIconSx} /> 
                </IconButton>

                <IconButton color='secondary' onClick={onCancel}>
                  <Close sx={UserIconSx} />
                </IconButton>
            </Stack>
          : <IconButton color='secondary' onClick={onEditClick}>
              <Edit sx={UserIconSx} />
            </IconButton>
          )
      }
    </Paper>
  );
};

export default UserInfoInput;
