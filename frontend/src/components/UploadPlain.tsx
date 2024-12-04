import { ReactNode } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import useMediaValue from '../hooks/useMediaValue';
import MediaValue from '../types/MediaValue';
import UIColors from '../utils/Colors';
import UploadInput from './UploadInput';
import { Status } from '../types/Status';

type UploadPlainProps = {
  attentionText: string, 
  children?: ReactNode, 
  status: Status,
  file: File | undefined,
  acceptedFormats: string,
  inputId: string,
  hideSubmitButton?: boolean,
  setFile: (file: File | undefined) => void,
  onFileUpload: () => void
};

const UPLOAD_WIDTH: MediaValue = {
  xs: 20,
  sm: 35,
  md: 50,
  lg: 60,
  xl: 75
}

const UploadPlain = ({
  attentionText, 
  children, 
  status, 
  file, 
  acceptedFormats,
  inputId, 
  hideSubmitButton=false, 
  setFile, 
  onFileUpload
}: UploadPlainProps) => {
  const uploadWidth = useMediaValue(UPLOAD_WIDTH);

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
          color: UIColors.palette.disabled,
          width: uploadWidth,
          height: uploadWidth,
          marginBottom: '20px'
        }}/>

        <UploadInput 
          inputId={inputId}
          fileName={file ? file.name : ''} 
          setFile={setFile} 
          disabled={status === 'pending'}
          acceptedFormats={acceptedFormats}/>

        {children}

        <Button 
          variant='containtedSecondary' 
          disabled={status === 'pending'}
          style={{
            display: !hideSubmitButton && file ? 'inherit' : 'none',
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
