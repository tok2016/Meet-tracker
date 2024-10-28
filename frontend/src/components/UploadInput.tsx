import { Button, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const UploadInput = () => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const onFileUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    setFile(evt.target.files ? evt.target.files[0] : undefined);
  };

  return (
    <>
      <input id='file' type='file' accept='audio/*,video/*' onChange={onFileUpload} />
      <Button variant='contained'>
        <label htmlFor='file'>Загрузить</label>
      </Button>
      <Typography variant='subtitle1'>{file?.name}</Typography>
    </>
  );
};

export default UploadInput;
