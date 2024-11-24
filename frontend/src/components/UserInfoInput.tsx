import { IconButton, Input, Paper, Stack, Typography } from '@mui/material';
import { HTMLInputTypeAttribute, KeyboardEvent, useEffect, useReducer, useState } from 'react';
import { Check, Close, Edit } from '@mui/icons-material';

import IconForInput from './IconForInput';
import { UIColors } from '../utils/Colors';
import CopyButton from './CopyButton';
import { UserIconSx } from '../theme/UserIcon';

type UserInfoInputProps = {
  label: string,
  defaultValue: string,
  type: HTMLInputTypeAttribute,
  readOnly?: boolean,
  disabled?: boolean,
  apply: (update: string) => void
};

const UserInfoInput = ({label, defaultValue, type, readOnly=false, disabled=false, apply}: UserInfoInputProps) => {
  const [isEditable, toggleEdit] = useReducer((value) => !value, false);
  const [value, setValue] = useState<string>(defaultValue);

  const onApply = () => {
    apply(value);
    toggleEdit();
  }

  const onCancel = () => {
    setValue(defaultValue);
    toggleEdit();
  }

  const onKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if(evt.key === 'Enter') {
      onApply();
    } else if(evt.key === 'Esc') {
      onCancel();
    }
  }

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
        backgroundColor: readOnly ? UIColors.quaternary : UIColors.background,
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
              readOnly={readOnly || !isEditable}
              disabled={disabled} 
              onChange={(evt) => setValue(evt.target.value)}
              onKeyDown={onKeyDown}
              sx={{
                width: '100%'
              }}
              inputProps={{
                style: {
                  padding: '2px 0px'
                }
              }} />
        </Stack>
      </Stack>

      {readOnly 
        ? <CopyButton value={value} onError={() => {}}/> 
        : (isEditable 
          ? <Stack 
              display='flex'
              flexDirection='row'
              gap='10px'>
                <IconButton color='secondary' onClick={onApply}>
                  <Check sx={UserIconSx} /> 
                </IconButton>

                <IconButton color='secondary' onClick={onCancel}>
                  <Close sx={UserIconSx} />
                </IconButton>
            </Stack>
          : <IconButton color='secondary' onClick={toggleEdit}>
              <Edit sx={UserIconSx} />
            </IconButton>
          )
      }
    </Paper>
  );
};

export default UserInfoInput;
