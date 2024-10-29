import { Button, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

type UploadProps = {
  fileName: string, 
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  disabled: boolean
};

const UploadInput = ({fileName, setFile, disabled}: UploadProps) => {
  const onFileChoice = (evt: ChangeEvent<HTMLInputElement>) => {
    setFile(evt.target.files ? evt.target.files[0] : undefined);
  };

  return (
    <>
      <input 
        id='file' 
        type='file' 
        accept='audio/*,video/*' 
        disabled={disabled} 
        onChange={onFileChoice} />
      <Button variant='contained'>
        <label htmlFor='file'>Загрузить</label>
      </Button>
      <Typography variant='subtitle1'>{fileName}</Typography>
    </>
  );
};

export default UploadInput;
