import { Button, Paper, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import { UIColors } from '../utils/Colors';
import MediaValue from '../utils/types/MediaValue';
import useMediaValue from '../hooks/useMediaValue';
import UploadInput from '../components/UploadInput';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useState } from 'react';
import { postRecordFile } from '../store/summary/summaryThunks';
import { useNavigate } from 'react-router-dom';
import { isSummary } from '../utils/types/Summary';
import { selectSummary } from '../store/summary/summarySlice';

const UPLOAD_WIDTH: MediaValue = {
  xs: 20,
  sm: 35,
  md: 50,
  lg: 60,
  xl: 75
}

const UploadPage = () => {
  const uploadWidth = useMediaValue(UPLOAD_WIDTH);

  const navigate = useNavigate();

  const {status} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | undefined>(undefined);

  const onFileUpload = () => {
    if(file) {
      dispatch(postRecordFile(file))
        .then((response) => {
          if(isSummary(response.payload)) {
            navigate(`/account/summaries/${response.payload.id}`);
          }
        });
    }
  };

  return (
    <Paper 
      variant='elevationDashed'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        width: '30vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        margin: '35vh auto 0'
      } : {})}>
        <CloudUpload sx={{
          color: UIColors.quaternary,
          width: uploadWidth,
          height: uploadWidth
        }}/>

        <UploadInput 
          fileName={file ? file.name : ''} 
          setFile={setFile} 
          disabled={status === 'pending'}/>

        <Button 
          variant='containtedSecondary' 
          disabled={status === 'pending'}
          onClick={onFileUpload}>
            Отправить
        </Button>

        <Typography variant='body2' textAlign='center'>
          Внимание!<br />Поддерживается только формат SVG!
        </Typography>
    </Paper>
  );
};

export default UploadPage;
