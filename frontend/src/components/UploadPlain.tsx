import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import useMediaValue from '../hooks/useMediaValue';
import MediaValue from '../utils/types/MediaValue';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSummary } from '../store/summary/summarySlice';
import { postRecordFileTest } from '../store/summary/summaryThunks';
import { isSummary } from '../utils/types/Summary';
import { UIColors } from '../utils/Colors';
import UploadInput from './UploadInput';




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

  const onFileUpload = () => {
    if(file) {
      dispatch(postRecordFileTest(file))
        .then((response) => {
          if(typeof response.payload === 'string') {
            navigate(`/account/summaries/1}`);
          } else if(isSummary(response.payload)) {
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
