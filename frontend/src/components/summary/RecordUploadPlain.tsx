import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

import { selectSummary } from '../../store/summary/summarySlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { postRecordFile } from '../../store/summary/summaryThunks';
import { isSummary } from '../../types/Summary';
import UploadPlain from '../UploadPlain';

const RecordUploadPlain = () => {
  const navigate = useNavigate();

  const {status, error} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | undefined>(undefined);
  const [title, setTitle] = useState<string>('');

  const onFileUpload = () => {
    if(file) {
      dispatch(postRecordFile({title, file}))
        .then((response) => {
          if(isSummary(response.payload)) {
            navigate(`/account/summary/${response.payload.id}`);
          }
        });
    }
  };

  return (
    <UploadPlain
      file={file}
      attentionText='Загрузите или перетащите видео или аудио файл сюда'
      status={status}
      inputId='record'
      acceptedFormats='audio/*,video/*'
      error={error}
      setFile={setFile}
      onFileUpload={onFileUpload}>
        <TextField
          variant='outlined'
          autoComplete='off'
          value={title}
          disabled={status === 'pending'}
          label='Название резюме'
          style={{
            display: file ? 'inherit' : 'none',
            marginBottom: '10px'
          }}
          onChange={(evt) => setTitle(evt.target.value)} />
    </UploadPlain>
  );
};

export default RecordUploadPlain;
