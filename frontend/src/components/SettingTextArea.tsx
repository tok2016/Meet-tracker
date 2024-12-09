import { Stack, Typography } from '@mui/material';

import TextArea from './TextArea';
import { ChangeEvent } from 'react';

type SettingTextAreaProps = {
  label: string,
  value: string,
  onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
};

const SettingTextArea = ({label, value, onChange}: SettingTextAreaProps) => (
  <Stack alignSelf='flex-start' width='100%'>
    <Typography variant='h3' textAlign='left'>
      {label}
    </Typography>

    <TextArea 
      className='outlined'
      value={value} 
      variant='body1' 
      hidden={false} 
      readOnly={false} 
      onChange={onChange} 
      onKeyUp={() => {}} 
      onKeyDown={() => {}}>
    </TextArea>
  </Stack>
);

export default SettingTextArea;
