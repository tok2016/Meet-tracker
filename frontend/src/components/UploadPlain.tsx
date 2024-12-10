import { ReactNode } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import useMediaValue from '../hooks/useMediaValue';
import MediaValue from '../types/MediaValue';
import UIColors from '../utils/Colors';
import UploadInput from './UploadInput';
import { Status } from '../types/Status';
import { breakpoints } from '../theme/BasicTypography';

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
  xs: 30,
  sm: 35,
  md: 50,
  lg: 60,
  xl: 75
};

const UPLOAD_ITEMS_MARGIN_BOTTOM: MediaValue = {
  xs: 10,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 20
};

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
  const itemsMarginBottom = useMediaValue(UPLOAD_ITEMS_MARGIN_BOTTOM);

  return (
    <Paper 
      variant='elevationDashed'
      sx={(theme) => (theme.components?.MuiPaper ? {
        ...theme.components.MuiPaper?.defaultProps?.sx,
        [breakpoints.up('lg')]: {
          width: '25vw',
          margin: '0 auto'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      } : {})}>
        <CloudUpload sx={{
          color: UIColors.palette.disabledColor,
          width: uploadWidth,
          height: uploadWidth,
          marginBottom: `${itemsMarginBottom}px`
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
            marginBottom: `${itemsMarginBottom}px`
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
