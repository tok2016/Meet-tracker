import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import useMediaValue from '../hooks/useMediaValue';
import MediaValue from '../types/MediaValue';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { postRecordFile } from '../store/summary/summaryThunks';
import { UIColors } from '../utils/Colors';
import UploadInput from './UploadInput';
import { isSummary } from '../types/Summary';




const UPLOAD_WIDTH: MediaValue = {
  xs: 20,
  sm: 35,
  md: 50,
  lg: 60,
  xl: 75
}

const UploadPlain = ({attentionText}: {attentionText: string}) => {
  const uploadWidth = useMediaValue(UPLOAD_WIDTH);

  const navigate = useNavigate();

  const {status} = useAppSelector(selectSummary);
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
    <Paper 
      variant='elevationDashed'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        width: '25vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto'
      } : {})}>
        <CloudUpload sx={{
          color: UIColors.disabled,
          width: uploadWidth,
          height: uploadWidth,
          marginBottom: '20px'
        }}/>

        <UploadInput 
          fileName={file ? file.name : ''} 
          setFile={setFile} 
          disabled={status === 'pending'}/>

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

        <Button 
          variant='containtedSecondary' 
          disabled={status === 'pending'}
          style={{
            display: file ? 'inherit' : 'none',
            marginBottom: '20px'
          }}
          onClick={onFileUpload}>
            Отправить
        </Button>

        <Typography variant='body2' textAlign='center' whiteSpace='preserve-breaks'>
          {attentionText}
        </Typography>
    </Paper>
  );
};

export default UploadPlain;
