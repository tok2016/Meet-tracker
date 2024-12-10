import { Stack, Typography } from '@mui/material';

import TextArea from '../TextArea';
import { ChangeEvent } from 'react';

type SettingTextAreaProps = {
  label: string,
  value: string,
  textAlign: 'left' | 'center' | 'right',
  onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
};

const SettingTextArea = ({label, value, textAlign, onChange}: SettingTextAreaProps) => (
  <Stack alignSelf='flex-start' width='100%'>
    <Typography variant='h3' textAlign={textAlign} marginBottom='5px'>
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
