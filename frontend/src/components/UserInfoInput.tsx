import { IconButton, Input, Paper, Typography } from '@mui/material';
import { HTMLInputTypeAttribute, KeyboardEvent, useReducer, useState } from 'react';
import { Check, Close, Edit } from '@mui/icons-material';

import IconForInput from './IconForInput';
import { UIColors } from '../utils/Colors';
import CopyButton from './CopyButton';
import { UserIconSx } from '../utils/theme/UserIcon';

type UserInfoInputProps = {
  label: string,
  defaultValue: string,
  type: HTMLInputTypeAttribute,
  readOnly?: boolean,
  apply: (update: string) => void
};

const UserInfoInput = ({label, defaultValue, type, readOnly=false, apply}: UserInfoInputProps) => {
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

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        width: '100%'
      }}>
        <IconForInput type={type} readOnly={readOnly}/>

        <div className='user-input' style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          width: '100%'
        }}>
          <Typography variant='body1' width='100%'>{label}</Typography>
          <Input
            disableUnderline 
            type={type} 
            value={value} 
            readOnly={readOnly || !isEditable} 
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
        </div>
      </div>

      {readOnly 
        ? <CopyButton value={value} onError={() => {}}/> 
        : (isEditable 
          ? <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px'
            }}>
              <IconButton color='secondary' onClick={onApply}>
                <Check sx={UserIconSx} /> 
              </IconButton>

              <IconButton color='secondary' onClick={onCancel}>
                <Close sx={UserIconSx} />
              </IconButton>
            </div>
          : <IconButton color='secondary' onClick={toggleEdit}>
              <Edit sx={UserIconSx} />
            </IconButton>
          )
      }
    </Paper>
  );
};

export default UserInfoInput;
