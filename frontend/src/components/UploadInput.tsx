import { Button, Stack, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';

type UploadProps = {
  fileName: string, 
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  disabled: boolean
};

const UploadInput = ({fileName, setFile, disabled}: UploadProps) => {
  const navigate = useNavigate();
  const {user} = useAppSelector(selectUser);

  const onFileChoice = (evt: ChangeEvent<HTMLInputElement>) => {
    if(!user.username) {
      evt.preventDefault();
      navigate('/login');
    } else {
      setFile(evt.target.files ? evt.target.files[0] : undefined);
    }
  };

  return (
    <Stack
      display='flex'
      flexDirection='column'
      alignItems='center'
      gap='10px'
      marginBottom='20px'>
      <input 
        id='file' 
        type='file' 
        accept='audio/*,video/*' 
        disabled={disabled} 
        onChange={onFileChoice} />
      <Button variant='contained' disabled={disabled}>
        <label htmlFor='file'>Загрузить</label>
      </Button>
      <Typography variant='subtitle1'>{fileName}</Typography>
    </Stack>
  );
};

export default UploadInput;
