import { IconButton, Paper, Typography } from '@mui/material';
import { HTMLInputTypeAttribute, KeyboardEvent, useReducer, useState } from 'react';
import { Check, Close, Edit } from '@mui/icons-material';

import IconForInput from './IconForInput';
import { UIColors } from '../utils/Colors';
import CopyButton from './CopyButton';
import { INPUT_ICON_WIDTH } from '../utils/utils';

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
      variant='elevationInside'
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
        flexDirection: 'row'
      }}>
        <IconForInput type={type} readOnly={readOnly}/>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px'
        }}>
          <Typography variant='body1'>{label}</Typography>
          <input 
            className='user-input' 
            type={type} 
            value={value} 
            readOnly={readOnly || !isEditable} 
            onChange={(evt) => setValue(evt.target.value)}
            onKeyDown={onKeyDown} />
        </div>
      </div>

      {readOnly 
        ? <CopyButton value={value} onError={() => {}}/> 
        : (isEditable 
          ? <div>
              <IconButton color='secondary' onClick={onApply}>
                <Check sx={{width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH}} /> 
              </IconButton>

              <IconButton color='secondary' onClick={onCancel}>
                <Close sx={{width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH}} />
              </IconButton>
            </div>
          : <IconButton color='secondary' onClick={toggleEdit}>
              <Edit sx={{width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH}} />
            </IconButton>
          )
      }
    </Paper>
  );
};

export default UserInfoInput;
