import { Paper, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { UIColors } from '../utils/Colors';
import MediaValue from '../utils/types/MediaValue';
import useMediaValue from '../hooks/useMediaValue';
import UploadInput from '../components/UploadInput';

const UPLOAD_WIDTH: MediaValue = {
  xs: 20,
  sm: 35,
  md: 50,
  lg: 60,
  xl: 75
}

const UploadPage = () => {
  const uploadWidth = useMediaValue(UPLOAD_WIDTH);

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

        <UploadInput />

        <Typography variant='body2' textAlign='center'>
          Внимание! <br /> Поддерживается только формат SVG!
        </Typography>
    </Paper>
  );
};

export default UploadPage;
