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
    <div style={{marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
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
    </div>
  );
};

export default UploadInput;
